import { auth } from "@/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default async function AdminPage() {
  const session = await auth();

  if (!session || session.user.role !== "ADMIN") {
    redirect("/");
  }

  const journals = await prisma.journal.findMany({
    include: { creator: true, _count: { select: { articles: true } } },
  });

  const users = await prisma.user.findMany();

  return (
    <main className="p-8 max-w-7xl mx-auto space-y-8 min-h-screen">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Manage journals, users, and overall platform settings.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Total Journals
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{journals.length}</div>
          </CardContent>
        </Card>
        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{users.length}</div>
          </CardContent>
        </Card>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Journals Directory</h2>
        <div className="space-y-4">
          {journals.map((j) => (
            <Card
              key={j.id}
              className="shadow-sm hover:shadow transition-shadow"
            >
              <CardContent className="p-6 flex justify-between items-center sm:flex-row flex-col">
                <div className="space-y-1">
                  <h3 className="font-semibold text-lg">{j.title}</h3>
                  <p className="text-sm text-gray-500 line-clamp-2 max-w-[600px]">
                    {j.description}
                  </p>
                  <p className="text-xs font-mono text-gray-400 mt-2">
                    ISSN: {j.pissn || "N/A"} | E-ISSN: {j.eissn || "N/A"}
                  </p>
                </div>
                <div className="flex flex-col items-center gap-2 mt-4 sm:mt-0 sm:ml-4 border-t sm:border-t-0 sm:border-l pt-4 sm:pt-0 sm:pl-6">
                  <Badge variant="secondary">
                    {j._count.articles} Articles
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    Managed by: {j.creator.name}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
          {journals.length === 0 && (
            <p className="text-gray-500">No journals found in the database.</p>
          )}
        </div>
      </div>
    </main>
  );
}
