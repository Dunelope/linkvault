import bcrypt from 'bcryptjs'
import { PrismaClient } from '@prisma/client'
import { signToken } from '../utils/jwt.js'

const prisma = new PrismaClient()

export const registerUser = async ({ email, password }) => {
  if (!email || !password) {
    throw new Error('Email et mot de passe requis')
  }

  const existing = await prisma.user.findUnique({ where: { email } })
  if (existing) {
    throw new Error('Cet email est déjà utilisé')
  }

  const hashed = await bcrypt.hash(password, 10)

  const user = await prisma.user.create({
    data: { email, password: hashed }
  })

  const token = signToken({ id: user.id, email: user.email })

  return { token, user: { id: user.id, email: user.email } }
}

export const loginUser = async ({ email, password }) => {
  if (!email || !password) {
    throw new Error('Email et mot de passe requis')
  }

  const user = await prisma.user.findUnique({ where: { email } })
  if (!user) {
    throw new Error('Identifiants invalides')
  }

  const valid = await bcrypt.compare(password, user.password)
  if (!valid) {
    throw new Error('Identifiants invalides')
  }

  const token = signToken({ id: user.id, email: user.email })

  return { token, user: { id: user.id, email: user.email } }
}