import { Suspense } from "react";
import { SignUpForm } from "./SignupForm";

const page = () => {
  return (
    <Suspense fallback={null}>
      <SignUpForm />
    </Suspense>
  );
};

export default page;
