import { auth } from "@/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { SubmitForm } from "./SubmitForm";

export default async function SubmitPage() {
  const session = await auth();

  // Allow AUTHOR or ADMIN to submit
  if (!session || !["AUTHOR", "ADMIN"].includes(session.user.role)) {
    redirect("/");
  }

  const journals = await prisma.journal.findMany({
    select: { id: true, title: true },
  });

  return (
    <main className="p-8 max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Submit an Article</h1>
        <p className="text-muted-foreground mt-2">
          Share your research with the world through our peer-reviewed journals.
        </p>
      </div>

      <SubmitForm journals={journals} userId={session.user.id} />
    </main>
  );
}
