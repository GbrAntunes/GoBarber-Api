import { Router } from 'express'

import AuthenticateUserService from '../service/AuthenticateUserService'

const sessionsRouter = Router()

sessionsRouter.post('/', async (request, response) => {
    try {
        const { email, password } = request.body

        const authenticateUserService = new AuthenticateUserService()

        // Resposta da autenticação
        const { user, token } = await authenticateUserService.execute({
            email,
            password
        })

        delete user.password

        return response.json({ user, token })
    } catch (err) {
        return response.status(400).json({ error:  err.message })
    }
})

export default sessionsRouter;
