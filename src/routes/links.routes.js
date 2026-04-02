import { Router } from 'express'
import { getLinks, createLink, deleteLink } from '../controllers/links.controller.js'
import { authMiddleware } from '../middlewares/auth.middleware.js'

const router = Router()

router.use(authMiddleware)

router.get('/', getLinks)
router.post('/', createLink)
router.delete('/:id', deleteLink)

export { router as linksRoutes }