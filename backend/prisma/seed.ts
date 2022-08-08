import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
    const SALT_ROUNDS = 8;
    const defaultPassword = 'P@$$admin'
    const adminPasswordHash = await bcrypt.hash(defaultPassword, SALT_ROUNDS)

    const userAdmin = await prisma.user.upsert({
        where: { email: 'alice@prisma.io' },
        update: {},
        create: {
            email: 'ronnie.pereira@example.com',
            name: 'Ronnie Pereira',
            password: adminPasswordHash,
            isAdmin: true,
        },
    })


    console.log("Admin acess data:", {
        userAdmin: userAdmin.email,
        password: defaultPassword
    })
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })