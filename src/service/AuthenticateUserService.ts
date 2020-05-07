import { getRepository } from 'typeorm'
import { compare } from 'bcryptjs'
import { sign, verify } from 'jsonwebtoken'
// import { hash } from 'bcryptjs'

import User from '../models/User'

interface Request {
    email: string;
    password: string;
}

interface Response {
    user: User;
    token: string
}

class AuthenticateUserService {
    public async execute({ email, password }: Request): Promise<Response> {
        const usersRepository = getRepository(User)

        const user = await usersRepository.findOne({ where: {email} })

        if (!user) {
            throw new Error('Incorrect email/password combination')
        }

        // user.password = Senha criptografada
        // password = Senha que o usuário usou para tentar logar

        const passwordMatched = await compare(password, user.password)

        if (!passwordMatched) {
            throw new Error('Incorrect email/password combination')
        }

        // Usuário autenticado

        const token = sign({}, 'c9bc61bf9fd56a3caa6d308311d9d71b', {
            subject: user.id,
            expiresIn: '1d',
        })

        return { user, token }
    }
}

export default AuthenticateUserService
