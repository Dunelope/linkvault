import { PrismaClient } from '@prisma/client'
import { scrapeMetadata } from './scraper.service.js'

const prisma = new PrismaClient()

export const fetchLinks = async (userId, query) => {
  const { search, tag } = query

  return await prisma.link.findMany({
    where: {
      userId,
      ...(search && {
        OR: [
          { title: { contains: search, mode: 'insensitive' } },
          { description: { contains: search, mode: 'insensitive' } }
        ]
      }),
      ...(tag && {
        tags: { some: { name: { equals: tag, mode: 'insensitive' } } }
      })
    },
    include: { tags: true },
    orderBy: { createdAt: 'desc' }
  })
}

export const addLink = async (userId, { url, tags = [] }) => {
  if (!url) throw new Error('URL requise')

  const metadata = await scrapeMetadata(url)

  return await prisma.link.create({
    data: {
      url,
      title: metadata.title,
      description: metadata.description,
      image: metadata.image,
      userId,
      tags: {
        connectOrCreate: tags.map((name) => ({
          where: { name },
          create: { name }
        }))
      }
    },
    include: { tags: true }
  })
}

export const removeLink = async (userId, linkId) => {
  const link = await prisma.link.findUnique({ where: { id: linkId } })

  if (!link) throw new Error('Lien introuvable')
  if (link.userId !== userId) throw new Error('Non autorisé')

  await prisma.link.delete({ where: { id: linkId } })
}