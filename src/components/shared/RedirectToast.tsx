"use client"

import { useEffect } from "react"
import { toast } from 'sonner'

import { deleteCookieByKey, getCookieByKey } from '@/app/actions'

const RedirectToast = () => {
    useEffect(() => {
        const showCookieToast = async () => {
            const message = await getCookieByKey("toast")

            if (message) {
                toast.success(message)
                deleteCookieByKey("toast")
            }
        }

        showCookieToast()
    }, [])

    return null;
}

export { RedirectToast }