import { SignUp} from '@clerk/nextjs'

export default function Login() {
  return ( <center>
   <SignUp routing='hash' forceRedirectUrl='/quiz_page'/> </center>
  );
}