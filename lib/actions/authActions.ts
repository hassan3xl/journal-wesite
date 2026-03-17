"use server";

import { signIn, signOut } from "@/auth";

import { AuthError } from "next-auth";

export async function loginAction(formData: FormData) {
  try {
    await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirectTo: "/",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      if (error.type === "CredentialsSignin") {
        return { error: "Invalid credentials." };
      }
      return { error: "Failed to authenticate." };
    }
    // Re-throw the redirect error (or any other Next.js internal error)
    throw error;
  }
}

export async function logoutAction() {
  await signOut({ redirectTo: "/" });
}
