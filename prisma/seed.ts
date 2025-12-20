import { hash } from "@node-rs/argon2";
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

type InitialTicket = {
    title: string;
    content: string;
    status: 'DONE' | 'OPEN' | 'IN_PROGRESS'
    deadline: string
    bounty: number
}

const users = [
    {
        username: 'johndoe',
        email: 'john@example.com',
    },
    {
        username: 'arief-kurniawan',
        email: 'ariefgisdev@gmail.com',
    },
    {
        username: 'admin',
        email: 'admin@example.com',
    }
]

export const initialData: InitialTicket[] = [
    {
        title: 'Tiket Rahmatraja',
        content: 'Siap menggetarkan bandung',
        status: "DONE",
        deadline: new Date().toISOString().split("T")[0],
        bounty: 399
    },
    {
        title: 'Tiket Atma Asta',
        content: 'Bandung in harmony',
        status: "OPEN",
        deadline: new Date().toISOString().split("T")[0],
        bounty: 499
    },
    {
        title: 'Reckastra',
        content: 'Bandung in Code',
        status: "IN_PROGRESS",
        deadline: new Date().toISOString().split("T")[0],
        bounty: 299
    }
]

const comments = [
    { content: "First Comment on DB" },
    { content: "Second Comment on DB" },
    { content: "Third Comment on DB" },
]

// make async function to store initialData into supabase server
const seed = async () => {
    await prisma.comment.deleteMany();
    await prisma.user.deleteMany();
    await prisma.ticket.deleteMany();
    
    const passwordHash = await hash("superscret")

    const dbUser = await prisma.user.createManyAndReturn({
        data: users.map(user => ({
            ...user,
            passwordHash: passwordHash
        }))
    })
    
    const dbTickets = await prisma.ticket.createManyAndReturn({
        data: initialData.map(ticket => ({
            ...ticket,
            userId: dbUser[0].id
        }))
    })

    await prisma.comment.createMany({
        data: comments.map((comment) => ({
            ...comment,
            userId: dbUser[1].id,
            ticketId: dbTickets[0].id
        }))
    })
}

// executed the seed function
seed()