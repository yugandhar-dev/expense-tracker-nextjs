"use server"

import { db } from "@/lib/db"
import { Transaction } from "@/types/Transaction"
import { auth } from "@clerk/nextjs/server"

const getTransactions = async (): Promise<{
  transactions?: Transaction[]
  error?: string
}> => {
  const { userId } = await auth()

  if (!userId) {
    return { error: "User not found" }
  }

  try {
    const transactions = await db.transaction.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    return { transactions }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error: unknown) {
    return { error: "Balance not found" }
  }
}

export default getTransactions
