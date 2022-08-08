import bcrypt from 'bcrypt';
import fs from "fs"
import path from "path"
import jwt, { Secret } from 'jsonwebtoken';
import UserRepository from '../domain/repository/UserRepository';
import { UserCreate, UserLogin, UserSession } from '../types/UserTypes';

export default class UserService {
    private SECRET_KEY: Secret = fs.readFileSync(path.join(__dirname, '..', '..', 'credentials', 'private.pem'));
    private SALT_ROUNDS = 8;

    constructor(readonly userRepository: UserRepository) { }

    async create(token: any, newUser: UserCreate): Promise<void> {
        try {
            const userAdmin = await this.userRepository.findByEmail(token.email);
            if (!userAdmin || !userAdmin.isAdmin) throw new Error("User not found or without permission")

            newUser.password = await bcrypt.hash(newUser.password, this.SALT_ROUNDS)
            await this.userRepository.create(newUser);
        } catch (error) {
            throw error;
        }
    }

    async login(user: UserLogin): Promise<LoginOutpout> {
        try {
            const foundUser = await this.userRepository.findByEmail(user.email);
            if (!foundUser) {
                throw new Error('Email of user is not correct');
            }
            const isMatch = bcrypt.compareSync(user.password, foundUser.password);
            if (!isMatch) throw new Error('Password is not correct');

            const token = jwt.sign({ id: foundUser.id?.toString(), email: foundUser.email }, this.SECRET_KEY, {
                expiresIn: '2 hours',
            });

            return {
                user: {
                    id: foundUser.id,
                    name: foundUser.name,
                    email: foundUser.email,
                    isAdmin: foundUser.isAdmin
                },
                accessToken: token
            };

        } catch (error) {
            throw error;
        }
    }

    async list(): Promise<UserSession[]> {
        try {
            const usersList: UserSession[] = await this.userRepository.list();
            return usersList
        } catch (error) {
            throw error;
        }
    }

    async remove(token: any, userId: string): Promise<void> {
        try {
            const userAdmin = await this.userRepository.findByEmail(token.email);
            if (!userAdmin || !userAdmin.isAdmin) throw new Error("User not found or without permission")

            await this.userRepository.remove(userId);
        } catch (error) {
            throw error;
        }
    }
}

type LoginOutpout = {
    user: UserSession,
    accessToken: string
}