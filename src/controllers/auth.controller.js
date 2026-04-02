import { registerUser, loginUser } from '../services/auth.service.js'
import { successResponse, errorResponse } from '../utils/response.js'

export const register = async (req, res) => {
  try {
    const data = await registerUser(req.body)
    return successResponse(res, data, 201)
  } catch (err) {
    return errorResponse(res, err.message)
  }
}

export const login = async (req, res) => {
  try {
    const data = await loginUser(req.body)
    return successResponse(res, data)
  } catch (err) {
    return errorResponse(res, err.message, 401)
  }
}