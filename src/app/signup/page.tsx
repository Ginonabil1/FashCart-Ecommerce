"use client";

import { useAppContext } from "@/context/AppContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, UserPlus } from "lucide-react";
import { toast } from "react-toastify";

const signUpSchema = z
  .object({
    fullName: z.string().min(2, "Full name must be at least 2 characters."),
    email: z.email("Please enter a valid email address."),
    password: z.string().min(6, "Password must be at least 6 characters."),
    confirmPassword: z.string().min(6, "Please confirm your password."),
    phone: z.string().optional(),
    city: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

type SignUpFormValues = z.infer<typeof signUpSchema>;

const SignupPage = () => {
  const router = useRouter();
  const { signUp } = useAppContext();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
      city: "",
    },
  });

  const onSubmit = async (data: SignUpFormValues) => {
    await new Promise((resolve) => setTimeout(resolve, 250));

    const result = signUp({
      id: crypto.randomUUID(),
      fullName: data.fullName,
      email: data.email,
      password: data.password,
      phone: data.phone || "",
      city: data.city || "",
      address: "",
    });

    if (!result.success) {
      toast.error(result.message);
      return;
    }

    toast.success(result.message);
    router.push("/");
  };

  return (
    <div className="mx-auto mt-12 grid max-w-5xl gap-10 lg:grid-cols-[1.1fr_0.9fr]">
      <section className="rounded-[2rem] bg-gradient-to-br from-[#171717] via-[#2f2a24] to-[#bf5b33] p-8 text-white shadow-xl sm:p-10">
        <div className="mb-8 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm">
          <UserPlus className="h-4 w-4" />
          New member registration
        </div>
        <h1 className="max-w-md text-4xl font-semibold leading-tight">
          Create an account and keep your shopping details in one place.
        </h1>
        <p className="mt-4 max-w-lg text-sm text-white/80">
          Save checkout details, keep your cart flowing, and make the store feel
          more like a complete ecommerce product.
        </p>
      </section>

      <section className="rounded-[2rem] border border-gray-200 bg-white p-8 shadow-lg sm:p-10">
        <div className="mb-8">
          <p className="text-sm font-medium uppercase tracking-[0.25em] text-gray-400">
            Join FashCart
          </p>
          <h2 className="mt-2 text-3xl font-semibold text-gray-900">Sign up</h2>
          <p className="mt-2 text-sm text-gray-500">
            Create a lightweight local account for this demo storefront.
          </p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-2">
            <label htmlFor="fullName" className="text-sm font-medium text-gray-700">
              Full name
            </label>
            <input
              id="fullName"
              type="text"
              placeholder="Jane Carter"
              className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-gray-900"
              {...register("fullName")}
            />
            {errors.fullName && (
              <p className="text-xs text-red-500">{errors.fullName.message}</p>
            )}
          </div>

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

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="phone" className="text-sm font-medium text-gray-700">
                Phone
              </label>
              <input
                id="phone"
                type="text"
                placeholder="123456789"
                className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-gray-900"
                {...register("phone")}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="city" className="text-sm font-medium text-gray-700">
                City
              </label>
              <input
                id="city"
                type="text"
                placeholder="Cairo"
                className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-gray-900"
                {...register("city")}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Create a password"
              className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-gray-900"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-xs text-red-500">{errors.password.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label
              htmlFor="confirmPassword"
              className="text-sm font-medium text-gray-700"
            >
              Confirm password
            </label>
            <input
              id="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-gray-900"
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && (
              <p className="text-xs text-red-500">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gray-900 px-4 py-3 text-sm font-medium text-white transition hover:bg-black disabled:cursor-not-allowed disabled:bg-gray-400"
          >
            {isSubmitting ? "Creating account..." : "Create account"}
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-gray-900 underline">
            Sign in
          </Link>
        </p>
      </section>
    </div>
  );
};

export default SignupPage;
