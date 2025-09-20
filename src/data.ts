type InitialTicket = {
    id: string;
    title: string;
    content: string;
    status: 'DONE' | 'OPEN' | 'IN_PROGRESS'
}

export const initialData: InitialTicket[] = [
    {
        id: '1',
        title: 'Tiket Rahmatraja',
        content: 'Siap menggetarkan bandung',
        status: "DONE"
    },
    {
        id: '2',
        title: 'Tiket Atma Asta',
        content: 'Bandung in harmony',
        status: "OPEN"
    },
    {
        id: '3',
        title: 'Reckastra',
        content: 'Bandung in Code',
        status: "IN_PROGRESS"
    }
]