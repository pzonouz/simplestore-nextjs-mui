import { Suspense } from "react";
import { SignInForm } from "./SignInForm";

const page = () => {
  return (
    <Suspense fallback={null}>
      <SignInForm />
    </Suspense>
  );
};

export default page;
