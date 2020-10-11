import { compare } from 'bcryptjs';
import { getRepository } from 'typeorm';
import { sign } from 'jsonwebtoken';
import authConfig from '../config/Auth';
import User from '../models/User';
import AppError from '../errors/AppError';

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
            throw new AppError('Email invalid');
        }
        if (!password) {
            throw new AppError('Password invalid');
        }

        const userRepository = getRepository(User);

        const user = await userRepository.findOne({
            where: { email },
        });

        if (!user) {
            throw new AppError('Email/Password incorrect', 401);
        }
        console.log(user);
        const passwordMatched = await compare(password, user.password);

        if (!passwordMatched) {
            throw new AppError('Email/Password incorrect', 401);
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
