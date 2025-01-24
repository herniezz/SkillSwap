import { SignIn } from '@clerk/nextjs';

export default function SignInPage() {
  return (
      <SignIn redirectUrl="https://herniezz.github.io/SkillSwap/" />
  );
}
