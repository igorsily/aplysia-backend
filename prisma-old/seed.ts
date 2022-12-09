import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';

const prisma = new PrismaClient()
async function main() {

    const obj = {
        name: 'Igor Sily',
        email: 'igor.sily@intelliway.com.br',
        password: await hash('12345678', 8),
        profileId: '1',
    }

    await prisma.module.createMany({
        data: [
            {
                name: 'COLETA',
            },
            {
                name: 'GERENCIAMENTO',
            },
            {
                name: 'USUARIOS',
            },
            {
                name: 'WIKI',
            },
            {
                name: 'UPLOAD',
            },
        ]
    });

    await prisma.profile.createMany({
        data: [
            {
                name: 'MASTER',
            },
            {
                name: 'OPERADOR',
            },
            {
                name: 'COLETOR',
            },
            {
                name: 'ANALISTA',
            },
        ]
    });

    const modules = await prisma.module.findMany();
    const profiles = await prisma.profile.findMany();

    const profileId = profiles.filter(p => p.name === 'MASTER');

    const moduleProfile = modules.map(m => {
        return {
            moduleId: m.id,
            profileId: profileId[0].id,
            permission: '1111'
        }
    });

    await prisma.moduleProfile.createMany({
        data: moduleProfile
    })

    // await prisma.user.create({
    //     data: {
    //         name: 'Igor Sily',
    //         email: 'igor.sily@intelliway.com.br',
    //         password: await hash('12345678', 8),
    //         profileId: profiles[0].id,
    //     }
    // });

    await prisma.user.create({
        data: obj
    });

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