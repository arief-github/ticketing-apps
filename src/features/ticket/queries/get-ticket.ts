import { initialData } from "@/data";
import { TicketTypes } from "../types";

export const getTicket = async (ticketId: string): Promise<TicketTypes | null> => {
    const ticket = initialData.find((ticket) => ticket.id === ticketId)

    return new Promise((resolve) => {
        resolve(ticket || null)
    })
}