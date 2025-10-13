import {
    CircleCheck,
    FileText,
    Pencil,
} from 'lucide-react'

type TicketStatus = "OPEN" | "IN_PROGRESS" | "DONE"

type TicketIconsType = { [key in TicketStatus]: React.ReactNode }

export const TICKET_ICONS: TicketIconsType = {
    OPEN: <FileText />,
    IN_PROGRESS: <Pencil />,
    DONE: <CircleCheck />
}