"use server";

import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function registerUserAction(data: any) {
  const { name, email, password, role } = data;

  if (!name || !email || !password) {
    return { error: "Missing required fields" };
  }

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return { error: "User already exists with this email" };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: role || "AUTHOR",
      },
    });

    return { success: true, userId: user.id };
  } catch (err: any) {
    return { error: "An unexpected error occurred." };
  }
}
