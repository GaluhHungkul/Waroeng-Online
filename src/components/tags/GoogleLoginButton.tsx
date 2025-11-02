"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";

const GoogleLoginButton = () => {
  return (
    <button
      onClick={() => signIn("google", { callbackUrl: "/" })}
      className="w-full items-center gap-3 border border-gray-300  shadow-sm hover:shadow-md transition bg-white flex h-[47px] relative justify-center rounded-md md:w-4/5 md:mx-auto px-3 py-1.5 text-sm/6 font-semibold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2  "
    >
      <Image
        src="/assets/img/google.png"
        alt="Google logo"
        width={20}
        height={20}
      />
      <span className="text-sm text-gray-700 font-medium md:text-lg">Continue with Google</span>
    </button>
  );
}

export default GoogleLoginButton 