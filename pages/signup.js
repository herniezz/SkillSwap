import { SignUp} from '@clerk/nextjs'

export default function Login() {
  return (
   <SignUp routing='hash' forceRedirectUrl='/quiz_page'/>
  );
}