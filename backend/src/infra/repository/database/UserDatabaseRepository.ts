import { Prisma, PrismaClient } from "@prisma/client";

import UserRepository from "../../../domain/repository/UserRepository";
import { User, UserCreate, UserSession } from "../../../types/UserTypes";


export default class UserDatabaseRepository implements UserRepository {
    prismaClient = new PrismaClient();

    async create(user: UserCreate): Promise<void> {
        try {
            await this.prismaClient.user.create(
                {
                    data: {
                        name: user.name,
                        password: user.password,
                        email: user.email,
                        isAdmin: user.isAdmin
                    }
                }
            )
            await this.prismaClient.$disconnect()
        }
        catch (e) {
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                if (e.code === 'P2002') throw new Error("There is a unique constraint violation, the register can't be created")
            }
        }
    }

    async findByEmail(email: string): Promise<User | null> {
        const userData = await this.prismaClient.user.findUnique({
            where: {
                email,
            },
        })
        await this.prismaClient.$disconnect()
        if (!userData) return null
        const user: User = {
            id: userData.id,
            name: userData.name,
            email: userData.email,
            password: userData.password,
            isAdmin: userData.isAdmin
        }
        return user
    }

    async list(): Promise<UserSession[]> {
        const usersData = await this.prismaClient.user.findMany()
        await this.prismaClient.$disconnect()
        const users = []
        for (const user of usersData) {
            users.push({
                id: user.id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin
            })
        }

        return users
    }

    async remove(id: string): Promise<void> {
        await this.prismaClient.user.delete({
            where: {
                id: id.toString()
            }
        })
        await this.prismaClient.$disconnect()
    }
}