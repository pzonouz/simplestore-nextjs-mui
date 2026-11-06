import { Suspense } from "react";
import { SignInForm } from "./SinginForm";

const page = () => {
  return (
    <Suspense fallback={null}>
      <SignInForm />
    </Suspense>
  );
};

export default page;
