import { Tickets } from "lucide-react"
import Link from "next/link"

import { homePath, ticketsPath } from "@/paths"

import { ThemeSwitcher } from "../theme/theme-switcher"
import { buttonVariants } from "../ui/button"

const Navigation = () => {
    return (
        <nav className="
          supports-backdrop-blur:bg-background/60
          fixed left-0 right-0 top-0 z-20
          border-b bg-background/95 backdrop-blur
          w-full flex py-2.5 px-5 justify-between
        ">
            <Link href={homePath()} className={buttonVariants({ variant: 'ghost' })}>
                <Tickets />
                <h1 className="ml-2 text-lg font-semibold">TicketsHome</h1>
            </Link>
            <div className="flex items-center gap-x-1.5">
                <ThemeSwitcher />
                <Link href={ticketsPath()} className={buttonVariants({ variant: 'default' })}>Tickets</Link>
            </div>
        </nav>
    )
}

export default Navigation