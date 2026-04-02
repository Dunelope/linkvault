import { fetchLinks, addLink, removeLink } from '../services/links.service.js'
import { successResponse, errorResponse } from '../utils/response.js'

export const getLinks = async (req, res) => {
  try {
    const links = await fetchLinks(req.user.id, req.query)
    return successResponse(res, links)
  } catch (err) {
    return errorResponse(res, err.message)
  }
}

export const createLink = async (req, res) => {
  try {
    const link = await addLink(req.user.id, req.body)
    return successResponse(res, link, 201)
  } catch (err) {
    return errorResponse(res, err.message)
  }
}

export const deleteLink = async (req, res) => {
  try {
    await removeLink(req.user.id, req.params.id)
    return successResponse(res, { message: 'Lien supprimé' })
  } catch (err) {
    return errorResponse(res, err.message)
  }
}