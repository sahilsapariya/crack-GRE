"use client";
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { postData } from "@/actions/api";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export default function Register() {
  const router = useRouter();

  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await postData("/api/v1/auth/register", formData);

    if (res.success) {
      toast.success(res.message);
      router.push("/login");
    } else {
      toast.error(res.error);
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="max-w-md mx-5 w-full mx-sm-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
        <h2 className="font-bold text-center text-xl text-neutral-800 dark:text-neutral-200">
          Welcome to Crack GRE 🚀
        </h2>
        <p className="text-neutral-600 w-full text-sm max-w-sm mt-2 dark:text-neutral-300">
          Register yourself to get started with your GRE preparation journey
        </p>

        <form className="my-8" onSubmit={handleRegister}>
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
            <LabelInputContainer>
              <Label htmlFor="firstName">First name</Label>
              <Input
                id="firstName"
                placeholder="Tyler"
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                required
              />
            </LabelInputContainer>
            <LabelInputContainer>
              <Label htmlFor="lastName">Last name</Label>
              <Input
                id="lastName"
                placeholder="Durden"
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                required
              />
            </LabelInputContainer>
          </div>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              placeholder="projectmayhem@fc.com"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              placeholder="••••••••"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </LabelInputContainer>
          <button
            className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
            type="submit"
          >
            Sign up &rarr;
            <BottomGradient />
          </button>
          <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
          <Label>Already have an account? </Label>{" "}
          <Link href={"/login"} className="ml-2 text-blue-500 text-sm">
            Login now
          </Link>
        </form>
      </div>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
