import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  // Clean existing data
  await prisma.comment.deleteMany({})
  await prisma.report.deleteMany({})
  await prisma.contactMessage.deleteMany({})
  await prisma.newsletterSubscriber.deleteMany({})
  await prisma.news.deleteMany({})
  await prisma.announcement.deleteMany({})
  await prisma.job.deleteMany({})
  await prisma.opportunity.deleteMany({})
  await prisma.educationPost.deleteMany({})
  await prisma.healthPost.deleteMany({})
  await prisma.businessPost.deleteMany({})
  await prisma.event.deleteMany({})
  await prisma.destination.deleteMany({})
  await prisma.category.deleteMany({})
  await prisma.user.deleteMany({})

  console.log('✓ Cleaned existing data')

  // Create users with hashed passwords
  const hashedPassword = await bcrypt.hash('password123', 10)

  const superAdmin = await prisma.user.create({
    data: {
      email: 'admin@rwandanoticeboard.rw',
      name: 'Super Admin',
      password: hashedPassword,
      role: 'SUPER_ADMIN',
      bio: 'System administrator',
    },
  })

  const admin = await prisma.user.create({
    data: {
      email: 'editor@rwandanoticeboard.rw',
      name: 'Admin Editor',
      password: hashedPassword,
      role: 'ADMIN',
      bio: 'Content administrator',
    },
  })

  const author = await prisma.user.create({
    data: {
      email: 'author@rwandanoticeboard.rw',
      name: 'Jean Habimana',
      password: hashedPassword,
      role: 'AUTHOR',
      bio: 'News author and journalist',
    },
  })

  const moderator = await prisma.user.create({
    data: {
      email: 'moderator@rwandanoticeboard.rw',
      name: 'Marie Umuhire',
      password: hashedPassword,
      role: 'MODERATOR',
      bio: 'Content moderator',
    },
  })

  const regularUser = await prisma.user.create({
    data: {
      email: 'user@rwandanoticeboard.rw',
      name: 'Pierre Nkurunziza',
      password: hashedPassword,
      role: 'USER',
      bio: 'Regular user',
    },
  })

  console.log('✓ Created users')

  // Create categories
  const newsCategory = await prisma.category.create({
    data: {
      name: 'General News',
      slug: 'general-news',
      description: 'Latest news from Rwanda and around the world',
      language: 'en',
    },
  })

  const announcementCategory = await prisma.category.create({
    data: {
      name: 'Government Announcements',
      slug: 'government-announcements',
      description: 'Official announcements from government',
      language: 'en',
    },
  })

  const jobCategory = await prisma.category.create({
    data: {
      name: 'Tech Jobs',
      slug: 'tech-jobs',
      description: 'Technology and IT job opportunities',
      language: 'en',
    },
  })

  const educationCategory = await prisma.category.create({
    data: {
      name: 'Higher Education',
      slug: 'higher-education',
      description: 'University and college opportunities',
      language: 'en',
    },
  })

  const healthCategory = await prisma.category.create({
    data: {
      name: 'Public Health',
      slug: 'public-health',
      description: 'Health information and updates',
      language: 'en',
    },
  })

  const businessCategory = await prisma.category.create({
    data: {
      name: 'Business & Economy',
      slug: 'business-economy',
      description: 'Business news and economic updates',
      language: 'en',
    },
  })

  const eventsCategory = await prisma.category.create({
    data: {
      name: 'Cultural Events',
      slug: 'cultural-events',
      description: 'Events and celebrations',
      language: 'en',
    },
  })

  const tourismCategory = await prisma.category.create({
    data: {
      name: 'Tourism',
      slug: 'tourism',
      description: 'Tourism information and destinations',
      language: 'en',
    },
  })

  console.log('✓ Created categories')

  // Create news
  await prisma.news.create({
    data: {
      title: 'Rwanda Launches Digital Transformation Initiative',
      slug: 'rwanda-digital-transformation',
      content:
        'The Government of Rwanda has launched a comprehensive digital transformation initiative to boost the country\'s tech ecosystem. This initiative aims to connect rural communities with digital services and promote digital literacy across the nation.',
      excerpt: 'Rwanda launches major digital transformation program',
      description: 'Government announces digital initiative',
      status: 'PUBLISHED',
      verificationStatus: 'VERIFIED',
      featured: true,
      authorId: author.id,
      categoryId: newsCategory.id,
      publishedAt: new Date(),
    },
  })

  await prisma.news.create({
    data: {
      title: 'Rwanda Tech Hub Reports Record Investment',
      slug: 'rwanda-tech-hub-investment',
      content:
        'The Rwanda tech hub ecosystem has seen record levels of investment from international venture capital firms. This growth reflects the increasing recognition of Rwanda as an emerging tech hub in East Africa.',
      excerpt: 'Tech hub receives record investment',
      description: 'Investment in Rwanda tech ecosystem',
      status: 'PUBLISHED',
      verificationStatus: 'VERIFIED',
      featured: false,
      authorId: author.id,
      categoryId: newsCategory.id,
      publishedAt: new Date(),
    },
  })

  console.log('✓ Created news articles')

  // Create announcements
  await prisma.announcement.create({
    data: {
      title: 'National Census 2024 Data Collection Phase',
      slug: 'census-2024-data-collection',
      content:
        'The Rwanda Statistics Authority is conducting the 2024 National Census. All residents are encouraged to participate in this important national exercise.',
      excerpt: 'Census 2024 data collection begins',
      description: 'National census announcement',
      status: 'PUBLISHED',
      verificationStatus: 'VERIFIED',
      urgent: true,
      authorId: admin.id,
      categoryId: announcementCategory.id,
      publishedAt: new Date(),
    },
  })

  console.log('✓ Created announcements')

  // Create jobs
  await prisma.job.create({
    data: {
      title: 'Senior Software Engineer',
      slug: 'senior-software-engineer',
      description:
        'We are seeking experienced software engineers to join our growing team in Kigali. Must have 5+ years of experience with modern web technologies.',
      requirements:
        'Experience with React, Node.js, TypeScript, PostgreSQL. Strong problem-solving skills. Experience with cloud platforms.',
      salary: '$80,000 - $120,000 USD',
      location: 'Kigali, Rwanda',
      company: 'TechCorp Rwanda',
      jobType: 'Full-time',
      status: 'PUBLISHED',
      verificationStatus: 'VERIFIED',
      deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      authorId: author.id,
      categoryId: jobCategory.id,
      publishedAt: new Date(),
    },
  })

  console.log('✓ Created jobs')

  // Create opportunities
  await prisma.opportunity.create({
    data: {
      title: 'Youth Business Grant Program 2024',
      slug: 'youth-business-grant-2024',
      description:
        'The government is offering grants up to RWF 5,000,000 for young entrepreneurs starting businesses. This is part of the national economic development strategy.',
      details: 'Eligible applicants must be between 18-35 years old and have a viable business plan.',
      status: 'PUBLISHED',
      verificationStatus: 'VERIFIED',
      deadline: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
      authorId: admin.id,
      categoryId: businessCategory.id,
      publishedAt: new Date(),
    },
  })

  console.log('✓ Created opportunities')

  // Create education posts
  await prisma.educationPost.create({
    data: {
      title: 'University of Rwanda Admissions Open',
      slug: 'university-rwanda-admissions',
      content:
        'The University of Rwanda is now accepting applications for the 2024/2025 academic year. Various undergraduate and postgraduate programs are available.',
      excerpt: 'University of Rwanda opens admissions',
      description: 'Higher education opportunity',
      institution: 'University of Rwanda',
      level: 'Undergraduate & Postgraduate',
      status: 'PUBLISHED',
      verificationStatus: 'VERIFIED',
      authorId: author.id,
      categoryId: educationCategory.id,
      publishedAt: new Date(),
    },
  })

  console.log('✓ Created education posts')

  // Create health posts
  await prisma.healthPost.create({
    data: {
      title: 'Vaccination Campaign Targets Rural Areas',
      slug: 'vaccination-campaign-rural',
      content:
        'The Ministry of Health is launching a nationwide vaccination campaign with focus on underserved rural communities. Mobile health clinics will visit remote areas.',
      excerpt: 'Vaccination campaign reaches rural Rwanda',
      description: 'Health initiative announcement',
      status: 'PUBLISHED',
      verificationStatus: 'VERIFIED',
      authorId: author.id,
      categoryId: healthCategory.id,
      publishedAt: new Date(),
    },
  })

  console.log('✓ Created health posts')

  // Create business posts
  await prisma.businessPost.create({
    data: {
      title: 'Rwanda Export Market Opportunities',
      slug: 'rwanda-export-opportunities',
      content:
        'New export opportunities are emerging in African markets for Rwandan agricultural and manufactured goods. Trade agreements with neighboring countries have opened new pathways.',
      excerpt: 'Export opportunities expand for Rwandan businesses',
      description: 'Business market update',
      status: 'PUBLISHED',
      verificationStatus: 'VERIFIED',
      authorId: author.id,
      categoryId: businessCategory.id,
      publishedAt: new Date(),
    },
  })

  console.log('✓ Created business posts')

  // Create events
  await prisma.event.create({
    data: {
      title: 'Rwanda Innovation & Tech Summit 2024',
      slug: 'rwanda-innovation-summit-2024',
      description:
        'Annual summit bringing together tech innovators, entrepreneurs, and investors. Featured speakers include international tech leaders.',
      location: 'Kigali Convention Centre',
      eventDate: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000),
      eventEndDate: new Date(Date.now() + 47 * 24 * 60 * 60 * 1000),
      status: 'PUBLISHED',
      verificationStatus: 'VERIFIED',
      authorId: author.id,
      categoryId: eventsCategory.id,
      publishedAt: new Date(),
    },
  })

  console.log('✓ Created events')

  // Create destinations
  await prisma.destination.create({
    data: {
      name: 'Volcanoes National Park',
      slug: 'volcanoes-national-park',
      description:
        'Home to mountain gorillas and stunning volcanic landscapes. One of Rwanda\'s most visited tourism destinations.',
      location: 'Northern Rwanda, Musanze District',
      status: 'PUBLISHED',
      verificationStatus: 'VERIFIED',
      authorId: author.id,
      publishedAt: new Date(),
    },
  })

  await prisma.destination.create({
    data: {
      name: 'Lake Kivu',
      slug: 'lake-kivu',
      description:
        'One of Africa\'s largest freshwater lakes, offering water sports, beaches, and island getaways.',
      location: 'Western Rwanda',
      status: 'PUBLISHED',
      verificationStatus: 'VERIFIED',
      authorId: author.id,
      publishedAt: new Date(),
    },
  })

  console.log('✓ Created destinations')

  // Create newsletter subscribers
  await prisma.newsletterSubscriber.create({
    data: {
      email: 'subscriber@example.com',
      userId: regularUser.id,
    },
  })

  console.log('✓ Created newsletter subscribers')

  console.log('✅ Database seed completed successfully!')
  console.log('\n📝 Development Credentials:')
  console.log('   Super Admin: admin@rwandanoticeboard.rw / password123')
  console.log('   Admin: editor@rwandanoticeboard.rw / password123')
  console.log('   Author: author@rwandanoticeboard.rw / password123')
  console.log('   User: user@rwandanoticeboard.rw / password123')
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
