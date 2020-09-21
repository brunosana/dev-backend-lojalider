import { compare } from 'bcryptjs';
import { getRepository } from 'typeorm';
import { sign } from 'jsonwebtoken';
import authConfig from '../config/Auth';
import User from '../models/User';

interface Request {
    email: string;
    password: string;
}

interface Response {
    user: User;
    token: string;
}

class AuthenticateUserService {
    public async execute({ email, password }: Request): Promise<Response> {
        if (!email) {
            throw new Error('Email invalid');
        }
        if (!password) {
            throw new Error('Password invalid');
        }

        const userRepository = getRepository(User);

        const user = await userRepository.findOne({
            where: { email },
        });

        if (!user) {
            throw new Error('Email/Password incorrect');
        }

        const passwordMatched = compare(password, user.password);

        if (!passwordMatched) {
            throw new Error('Email/Password incorrect');
        }

        const { secret, expiresIn } = authConfig.jwt;

        const token = sign({}, secret, {
            subject: user.id,
            expiresIn,
        });

        return { user, token };
    }
}

export default AuthenticateUserService;
