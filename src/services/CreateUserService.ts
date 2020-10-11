import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import User from '../models/User';
import AppError from '../errors/AppError';

interface Request {
    email: string;
    password: string;
    name?: string;
}

class CreateUserService {
    public async execute({
        email,
        password,
        name = '',
    }: Request): Promise<User> {
        if (!email) {
            throw new AppError('Email must be valid');
        }

        if (!password) {
            throw new AppError('Password must be valid');
        }

        const userRepository = getRepository(User);

        const checkEmailExists = await userRepository.findOne({
            where: { email },
        });

        if (checkEmailExists) {
            throw new AppError('Email already in use');
        }

        const hashedPassword = await hash(password, 8);

        const user = userRepository.create({
            email,
            password: hashedPassword,
            name,
        });

        await userRepository.save(user);

        return user;
    }
}

export default CreateUserService;
