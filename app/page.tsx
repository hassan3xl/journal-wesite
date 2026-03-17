import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import prisma from "@/lib/prisma";
import ArticlesClient from "../lib/clients/ArticlesClient";

export default async function Home() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["articles"],
    queryFn: async () => {
      const articles = await prisma.article.findMany({
        include: { author: true, journal: true },
        orderBy: { createdAt: "desc" },
      });

      // Simulate API serialization (Dates to strings)
      return JSON.parse(JSON.stringify(articles));
    },
  });

  return (
    <main className="min-h-screen p-8 sm:p-12 md:p-16 bg-gradient-to-br from-white to-gray-50 dark:from-gray-950 dark:to-gray-900">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="flex flex-col items-center text-center space-y-4 pt-10">
          <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80 mb-2">
            Beta Release 1.0
          </div>
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 tracking-tight sm:text-6xl text-balance">
            University Journal Repository
          </h1>
          <p className="max-w-[700px] text-lg text-gray-600 dark:text-gray-400 text-balance sm:text-xl">
            A premium digital platform for publishing, peer-reviewing, and
            discovering cutting-edge academic research.
          </p>
        </div>

        <HydrationBoundary state={dehydrate(queryClient)}>
          <ArticlesClient />
        </HydrationBoundary>
      </div>
    </main>
  );
}
