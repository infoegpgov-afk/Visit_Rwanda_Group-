import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const session = await auth()

    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Check if user has permission to upload (ADMIN, AUTHOR, or higher)
    const allowedRoles = ['SUPER_ADMIN', 'ADMIN', 'EDITOR', 'AUTHOR']
    if (!allowedRoles.includes(session.user.role as string)) {
      return NextResponse.json(
        { error: 'Forbidden' },
        { status: 403 }
      )
    }

    const formData = await request.formData()
    const file = formData.get('file') as File
    const imageUrl = formData.get('imageUrl') as string

    if (!file && !imageUrl) {
      return NextResponse.json(
        { error: 'No file or URL provided' },
        { status: 400 }
      )
    }

    let mediaUrl: string
    let mediaType: string
    let mediaSize: number | null = null

    // If development or Vercel Blob not configured, use imageUrl
    if (imageUrl) {
      // Validate URL format
      try {
        new URL(imageUrl)
        mediaUrl = imageUrl
        mediaType = 'image'
        mediaSize = null
      } catch {
        return NextResponse.json(
          { error: 'Invalid image URL' },
          { status: 400 }
        )
      }
    } else if (file) {
      // Try to use Vercel Blob if configured
      if (process.env.BLOB_READ_WRITE_TOKEN) {
        try {
          const { put } = await import('@vercel/blob')
          const filename = `${Date.now()}-${file.name}`
          const blob = await put(filename, file, {
            access: 'public',
            token: process.env.BLOB_READ_WRITE_TOKEN,
          })
          mediaUrl = blob.url
          mediaType = file.type.startsWith('image/') ? 'image' : 'file'
          mediaSize = file.size
        } catch (error) {
          console.error('Vercel Blob error:', error)
          return NextResponse.json(
            { error: 'File upload failed' },
            { status: 500 }
          )
        }
      } else {
        return NextResponse.json(
          { error: 'File upload not configured. Use image URL instead.' },
          { status: 400 }
        )
      }
    }

    // Store media metadata in database
    const media = await prisma.media.create({
      data: {
        url: mediaUrl,
        type: mediaType,
        size: mediaSize,
        mimetype: file?.type || 'image/url',
      },
    })

    return NextResponse.json({
      success: true,
      url: mediaUrl,
      id: media.id,
      media,
    })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { error: 'Upload failed' },
      { status: 500 }
    )
  }
}
