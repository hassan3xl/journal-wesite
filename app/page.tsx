import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import prisma from "@/lib/prisma";
import ArticlesClient from "../lib/clients/ArticlesClient";
import Image from "next/image";

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
    <div className="space-y-12 py-4">
      <div className="relative rounded-lg overflow-hidden shadow-sm border border-gray-200 dark:border-gray-800">
        <Image
          src="/banner.png"
          alt="Journal Cover"
          width={1200}
          height={400}
          className="w-full h-auto object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-8">
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            Journal of the Nigerian Association of Teachers of English
          </h2>
        </div>
      </div>

      <div className="flex flex-col items-center text-center space-y-4">
        <p className="max-w-[700px] text-lg text-gray-600 dark:text-gray-400 text-balance sm:text-xl font-semibold">
          ISSN: 3026-8656 (PRINT) | 3026-8699 (ONLINE)
        </p>
        <div className="max-w-[900px] p-8 rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm">
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed italic">
            "The Journal of the Nigerian Association of Teachers of English
            (JNATE) is a peer-reviewed academic journal published bi-annually by
            the Nigerian Association of Teachers of English (NATE). It serves as
            a platform for the dissemination of research, scholarly articles,
            and best practices in the field of English language education,
            literature, and applied linguistics."
          </p>
        </div>
      </div>

      <div className="space-y-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 border-b pb-2">
          Recent Articles
        </h3>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <ArticlesClient />
        </HydrationBoundary>
      </div>
    </div>
  );
}
