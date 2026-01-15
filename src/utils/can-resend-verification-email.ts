import { differenceInSeconds } from "date-fns"; // Import utility to calculate the difference between dates in seconds

import { prisma } from "@/lib/prisma"; // Import the database client instance

export const canResendVerificationEmail = async (userId: string) => {
    // Look up the most recent verification token for the specified user in the database
    const databaseCode = await prisma.emailVerificationToken.findFirst({
        where: {
            userId
        }
    })

    // If no token exists for this user, they are permitted to receive a new verification email
    if(!databaseCode) {
        return true
    }

    // Calculate the number of seconds that have passed since the token was created
    const diff = differenceInSeconds(
        new Date(),
        new Date(databaseCode.createdAt)
    )

    // Return true if more than 60 seconds have elapsed, enforcing a 1-minute rate limit
    return diff > 60
}