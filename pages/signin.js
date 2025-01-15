import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return <center> <SignIn routing='hash' /></center>
}