import { checkUser } from "@/lib/checkUser"
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs"

const Header = () => {
  const user = checkUser()
  console.log({ user })
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h2>Expense Tracker</h2>
        <div>
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </nav>
  )
}

export default Header
