"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function submitArticleAction(data: {
  title: string;
  abstract: string;
  content: string;
  journalId: string;
  authorId: string;
}) {
  const session = await auth();

  if (!session || !["AUTHOR", "ADMIN"].includes(session.user.role)) {
    throw new Error("Unauthorized");
  }

  // Prevent user from submitting on behalf of another
  if (session.user.id !== data.authorId && session.user.role !== "ADMIN") {
    throw new Error("Cannot submit an article for another author.");
  }

  try {
    const newArticle = await prisma.article.create({
      data: {
        title: data.title,
        abstract: data.abstract,
        content: data.content,
        status: "SUBMITTED",
        authorId: data.authorId,
        journalId: data.journalId,
      },
    });

    revalidatePath("/");
    revalidatePath("/admin");

    return { success: true, articleId: newArticle.id };
  } catch (error) {
    console.error("Failed to submit article", error);
    return {
      success: false,
      error: "Database error while saving your article.",
    };
  }
}
