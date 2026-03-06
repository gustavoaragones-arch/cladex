"use client";
import { Container } from "@components/Container";
import { GridPattern } from "@components/GridPattern";
import Logo from "@components/Logo";
import Link from "next/link";
import {
  AiOutlineGithub,
  AiOutlineGoogle,
  AiOutlineTwitter,
} from "react-icons/ai";
import { SigninForm } from "@components/auth/SigninForm";

export default function SignInPage() {
  const socialButtons = [
    {
      name: "Twitter",
      icon: <AiOutlineTwitter className="text-blue-500 h-5 w-5" />,
      onClick: () => {},
    },
    {
      name: "GitHub",
      icon: <AiOutlineGithub />,
      onClick: () => {},
    },
    {
      name: "Google",
      icon: <AiOutlineGoogle className="text-red-500 h-5 w-5" />,
      onClick: () => {},
    },
  ];
  const pattern = {
    y: -6,
    squares: [
      [-1, 2],
      [1, 3],
      ...Array.from({ length: 10 }, () => [
        Math.floor(Math.random() * 20) - 10,
        Math.floor(Math.random() * 20) - 10,
      ]),
    ],
  };
  return (
    <Container title="Sign in to Cladex">
      <div className="min-h-[60rem] flex justify-center items-start">
        <div className="absolute inset-0 rounded-2xl transition duration-300 [mask-image:linear-gradient(white,transparent)] group-hover:opacity-50">
          <GridPattern
            width={120}
            height={120}
            x="50%"
            className="absolute inset-x-0 inset-y-[-30%] h-[160%]  w-full skew-y-[-5deg] fill-tertiary/[0.05] stroke-gray-100  dark:fill-primary dark:stroke-gray-100"
            {...pattern}
          />
        </div>
        <div className="px-10 py-20 rounded-xl bg-white shadow-lg w-[30rem] mt-10 md:mt-14 mx-4 relative z-10">
          <Logo textClassName="text-zinc-700" />
          <h1 className="my-8 text-xl text-zinc-700 text-center">
            Sign in to Cladex
          </h1>
          <p className="text-sm text-zinc-500 text-center -mt-6 mb-4">Enter your email to continue.</p>
          <SigninForm />

          <div className="flex flex-row space-x-1 items-center mt-4">
            <div className="h-px w-1/2 bg-gray-200" />
            <span className="text-xs text-gray-500">or</span>
            <div className="h-px w-1/2 bg-gray-200" />
          </div>

          <div className="mt-4 flex mx-auto justify-center flex-col ">
            {socialButtons.map((button, index) => (
              <button
                type="button"
                onClick={button.onClick}
                className="flex flex-row space-x-2 w-full mx-auto bg-gray-50 justify-center items-center py-4 my-2 rounded-2xl hover:bg-gray-100"
                key={`social-${index}`}
              >
                {button.icon}
                <span>Sign in with {button.name}</span>
              </button>
            ))}
          </div>
          <Link
            href="/signup"
            className="text-gray-600 block mt-4 text-xs text-center"
          >
            Don&apos;t have an account? Get started
          </Link>
          <p className="text-xs text-gray-500 text-center mt-6 max-w-xs mx-auto">
            Cladex provides structured transaction workflow tools. We are not a real estate broker, attorney, escrow provider, or financial advisor.
          </p>
        </div>
      </div>
    </Container>
  );
}
