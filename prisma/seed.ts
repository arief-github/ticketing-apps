import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

type InitialTicket = {
    title: string;
    content: string;
    status: 'DONE' | 'OPEN' | 'IN_PROGRESS'
}

export const initialData: InitialTicket[] = [
    {
        title: 'Tiket Rahmatraja',
        content: 'Siap menggetarkan bandung',
        status: "DONE"
    },
    {
        title: 'Tiket Atma Asta',
        content: 'Bandung in harmony',
        status: "OPEN"
    },
    {
        title: 'Reckastra',
        content: 'Bandung in Code',
        status: "IN_PROGRESS"
    }
]

// make async function to store initialData into supabase server
const seed = async () => {
    await prisma.ticket.createMany({
        data: initialData
    })
}

// executed the seed function
seed()