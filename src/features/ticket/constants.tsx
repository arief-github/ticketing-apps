import {
    CircleCheck,
    FileText,
    Pencil,
} from 'lucide-react'

import { TicketStatus } from './types'

type TicketIconsType = { [key in TicketStatus]: React.ReactNode }

export const TICKET_ICONS: TicketIconsType = {
    OPEN: <FileText />,
    IN_PROGRESS: <Pencil />,
    DONE: <CircleCheck />
}