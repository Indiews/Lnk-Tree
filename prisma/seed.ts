import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    // Insert Demo Links
    await prisma.link.createMany({
        data: [
            { name: 'Maintained by Indiews', order: 2, link: 'https://indiews.com/', slug: 'indiews' },
            { name: 'Check Our Github', order: 1, link: 'https://github.com/Indiews/Lnk-Tree', slug: 'github' }
        ],
    })

    // Insert Default User (Password: password, hashed by install.php previously as $2y$10$d5MUILFt5de21Y1iEPNpiORYHNCr8Kt6KbAZDbncpZKWxwKxkR.9.)
    await prisma.user.create({
        data: {
            name: "Default",
            surname: "User",
            permission: "admin",
            email: "lnktree@indiews.com",
            password: "$2y$10$d5MUILFt5de21Y1iEPNpiORYHNCr8Kt6KbAZDbncpZKWxwKxkR.9.",
            token: "new-user"
        }
    })

    // Insert Default Website Settings
    await prisma.website.create({
        data: {
            webname: 'Lnk Tree',
            lang: 'en',
            description: 'Meet Lnk Tree. Your custom and open Link Tree alternative.',
            logo: 'https://cdn.indiews.com/lnk-tree/branding/001.png',
            bkcolor: '#000000',
            btbkcolor: '#adadad',
            btbocolor: '#ffffff',
            codehead: ''
        }
    })

    console.log("Database seeded successfully!")
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
