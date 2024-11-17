import { currentUser } from "@clerk/nextjs/server"
import { db } from "@/lib/db"

export const checkUser = async () => {
  const user = await currentUser()

  // Check for current logged in clerk user
  if (!user) {
    return null
  }

  // Check if the user is already in the database
  const loggedInUser = await db.user.findUnique({
    where: {
      clerkUserId: user.id,
    },
  })

  // If the user is in database, return the user
  if (loggedInUser) {
    return loggedInUser
  }

  // If the user is not in database, create the user
  const newUser = await db.user.create({
    data: {
      clerkUserId: user.id,
      name: `${user.firstName} ${user.lastName}`,
      imageUrl: user.imageUrl,
      email: user.emailAddresses[0].emailAddress,
    },
  })

  return newUser
}
