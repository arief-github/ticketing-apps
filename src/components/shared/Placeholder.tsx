import { MessageSquareWarning } from "lucide-react"
import React from "react"

type PlaceholderProps = {
    label: string
    icon?: React.ReactElement<React.ComponentPropsWithoutRef<"svg">>
    button?: React.ReactElement<React.ComponentPropsWithoutRef<"button">>
}

const Placeholder = ({ label, icon = <MessageSquareWarning />, button }: PlaceholderProps) => {
    return (
        <div className="flex-1 self-center flex flex-col items-center justify-center gap-y-2">
            {React.cloneElement(icon, {
                className: 'w-16 h-16'
            })}
            <h2 className="text-lg text-center">{label}</h2>
            {button && React.cloneElement(button, {
                className: 'h-10'
            })}
        </div>
    )
}

export default Placeholder