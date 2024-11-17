"use server"

import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs/server"

const getIncomeExpense = async (): Promise<{
  income?: number
  expense?: number
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
    })

    const amounts = transactions.map((transaction) => transaction.amount)

    const income = amounts
      .filter((amount) => amount > 0)
      .reduce((sum, amount) => sum + amount, 0)
    const expense = amounts
      .filter((amount) => amount < 0)
      .reduce((sum, amount) => sum + amount, 0)

    return { income, expense: Math.abs(expense) }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error: unknown) {
    return { error: "Balance not found" }
  }
}

export default getIncomeExpense
