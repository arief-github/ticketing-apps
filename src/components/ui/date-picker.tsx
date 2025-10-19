"use client"

import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import React, { useImperativeHandle, useState } from "react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

type DatePickerProps = {
    id: string;
    name: string;
    defaultValue?: string | undefined;
    imperativeHandleRef?: React.RefObject<{ reset: () => void } | null>
}

const DatePicker = ({ id, name, defaultValue, imperativeHandleRef }: DatePickerProps) => {
    const [date, setDate] = useState<Date | undefined>(defaultValue ? new Date(defaultValue) : new Date())

    const formattedStringDate = date ? format(date, "yyyy-MM-dd") : "";

    useImperativeHandle(imperativeHandleRef, () => ({
        reset: () => setDate(new Date())
    }))

    return (
        <Popover>
            <PopoverTrigger className="w-full" id={id} asChild>
                <Button
                    variant="outline"
                    data-empty={!date}
                    className="data-[empty=true]:text-muted-foreground justify-start text-left font-normal"
                >
                    <CalendarIcon />
                    {formattedStringDate}
                    <input type="hidden" name={name} value={formattedStringDate} />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={date} onSelect={setDate} />
            </PopoverContent>
        </Popover>
    )
}

export default DatePicker;