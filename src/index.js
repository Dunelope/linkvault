import express from 'express'
import dotenv from 'dotenv'
import { authRoutes } from './routes/auth.routes.js'
import { linksRoutes } from './routes/links.routes.js'
import { errorMiddleware } from './middlewares/error.middleware.js'
import { rateLimitMiddleware } from './middlewares/rateLimit.middleware.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(rateLimitMiddleware)

app.use('/api/auth', authRoutes)
app.use('/api/links', linksRoutes)

app.use(errorMiddleware)

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})