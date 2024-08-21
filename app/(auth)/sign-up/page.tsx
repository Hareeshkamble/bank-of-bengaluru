import AuthForm from "@/components/ui/AuthForm";
import { getLoggedInUser } from "@/lib/actions/user.actions";

export default async function SignUp() {
  const loggedInUser = await getLoggedInUser();
// console.log(loggedInUser);

  return (
    <section
    className="flex-center size-full max-sm:px-6">
      <AuthForm type="sign-up" />
    </section>
  )
}

