"use client";

import { useAppContext } from "@/context/AppContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { toast } from "react-toastify";

const signInSchema = z.object({
  email: z.email("Please enter a valid email address."),
  password: z.string().min(6, "Password must be at least 6 characters."),
  rememberMe: z.boolean().optional(),
});

type SignInFormValues = z.infer<typeof signInSchema>;

const LoginPage = () => {
  const router = useRouter();
  const { signIn } = useAppContext();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: true,
    },
  });

  const onSubmit = async (data: SignInFormValues) => {
    await new Promise((resolve) => setTimeout(resolve, 250));

    const result = signIn(data.email, data.password);

    if (!result.success) {
      toast.error(result.message);
      return;
    }

    toast.success(result.message);
    router.push("/");
  };

  return (
    <div className="mx-auto mt-12 grid max-w-5xl gap-10 lg:grid-cols-[1.1fr_0.9fr]">
      <section className="rounded-[2rem] bg-gradient-to-br from-stone-900 via-gray-800 to-amber-700 p-8 text-white shadow-xl sm:p-10">
        <div className="mb-8 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm">
          <ShieldCheck className="h-4 w-4" />
          Secure member access
        </div>
        <h1 className="max-w-md text-4xl font-semibold leading-tight">
          Sign in to track orders, save favorites, and check out faster.
        </h1>
        <p className="mt-4 max-w-lg text-sm text-white/80">
          Keep your cart, shipping details, and product preferences in one
          place with your VibeCart account.
        </p>
      </section>

      <section className="rounded-[2rem] border border-gray-200 bg-white p-8 shadow-lg sm:p-10">
        <div className="mb-8">
          <p className="text-sm font-medium uppercase tracking-[0.25em] text-gray-400">
            Welcome back
          </p>
          <h2 className="mt-2 text-3xl font-semibold text-gray-900">Sign in</h2>
          <p className="mt-2 text-sm text-gray-500">
            Use your email and password to access your account.
          </p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-gray-700">
              Email address
            </label>
            <input
              id="email"
              type="email"
              placeholder="jane@example.com"
              className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-gray-900"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-xs text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-gray-900"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-xs text-red-500">{errors.password.message}</p>
            )}
          </div>

          <label className="flex items-center gap-3 text-sm text-gray-600">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300"
              {...register("rememberMe")}
            />
            Keep me signed in on this device
          </label>

          <button
            type="submit"
            disabled={isSubmitting}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gray-900 px-4 py-3 text-sm font-medium text-white transition hover:bg-black disabled:cursor-not-allowed disabled:bg-gray-400"
          >
            {isSubmitting ? "Signing in..." : "Sign in"}
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Don&apos;t have an account yet?{" "}
          <Link href="/signup" className="font-medium text-gray-900 underline">
            Create one
          </Link>
        </p>
      </section>
    </div>
  );
};

export default LoginPage;
