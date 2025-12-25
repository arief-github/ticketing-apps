import { getAuth } from "@/features/auth/actions/get-auth"
import { isOwner } from "@/features/auth/utils/is-owner"
import { prisma } from "@/lib/prisma"

export const getTicket = async (ticketId: string) => {
    const { user } = await getAuth();
    const ticket =  await prisma.ticket.findUnique({
        where: {
            id: ticketId
        },
        include: {
            user: {
                select: {
                    username: true
                }
            }
        }
    })
    const isTicketOwner = isOwner({ user, entity: ticket });
  
    if(!ticket) {
        return null
    }
    return {
        ...ticket,
        isOwner: isTicketOwner
    }
}