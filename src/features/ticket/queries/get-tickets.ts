import { initialData } from "@/data";
import { TicketTypes } from "../types";

// simulation of fetching API, i'm inserting setTimeout
export const getTickets = async (): Promise<TicketTypes[]> => {
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // throw new Error("Failed to fetch tickets");

    return new Promise((resolve) => {
        resolve(initialData)
    })
}