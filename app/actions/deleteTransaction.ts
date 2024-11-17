"use server"

import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs/server"
import { revalidatePath } from "next/cache"

const deleteTransaction = async (
  transactionId: string
): Promise<{
  message?: string
  error?: string
}> => {
  const { userId } = await auth()

  if (!userId) {
    return { error: "User not found" }
  }

  try {
    await db.transaction.delete({
      where: {
        id: transactionId,
        userId,
      },
    })

    revalidatePath("/")
    return { message: "Transaction deleted" }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error: unknown) {
    return { error: "Balance not found" }
  }
}

export default deleteTransaction
