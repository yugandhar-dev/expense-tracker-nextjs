"use server"

import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs/server"
import { revalidatePath } from "next/cache"

interface TransactionData {
  text: string
  amount: number
}

interface TransactionResult {
  data?: TransactionData
  error?: string
}

const addTransaction = async (
  formData: FormData
): Promise<TransactionResult> => {
  const textValue = formData.get("text")
  const amountValue = formData.get("amount")

  // Check for input values
  if (!textValue || textValue === "" || !amountValue) {
    return { error: "Text or amount is missing" }
  }

  const text: string = textValue.toString()
  const amount: number = parseFloat(amountValue.toString())

  // Check for logged in user
  const { userId } = await auth()
  console.log(userId)

  if (!userId) {
    return { error: "User not found" }
  }

  try {
    const transactionData: TransactionData = await db.transaction.create({
      data: {
        text,
        amount,
        userId,
      },
    })
    revalidatePath("/")
    return { data: transactionData }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error: unknown) {
    return { error: "Transaction not added" }
  }
}

export default addTransaction
