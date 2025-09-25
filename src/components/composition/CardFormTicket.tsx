import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

type CardFormTicketProps = {
    title: string;
    description: string;
    className?: string;
    content: React.ReactNode
}

export const CardFormTicket = ({ title, description, content, className }: CardFormTicketProps) => {
    return (
        <Card className={className}>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent>
                {content}
            </CardContent>
        </Card>
    )
}