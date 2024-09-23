import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-pink-100 to-blue-100">
      <div className="flex flex-col items-center justify-center p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-blue-400">
          Welcome to Baby Reveal
        </h1>
        <p className="text-lg text-gray-600 mb-4">
          Sign in to reveal the exciting news!
        </p>
        <SignIn signUpUrl="/sign-up" routing="hash" />
      </div>
    </div>
  );
}
