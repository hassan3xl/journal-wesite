"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchArticles } from "../api/queries";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Link from "next/link";

export default function ArticlesClient() {
  const {
    data: articles,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["articles"],
    queryFn: fetchArticles,
  });

  if (isPending)
    return (
      <div className="p-8 text-center text-gray-500">Loading articles...</div>
    );
  if (isError)
    return (
      <div className="p-8 text-center text-red-500">Error loading articles</div>
    );

  return (
    <div className="grid grid-cols-1 gap-4">
      {articles.length === 0 ? (
        <p className="col-span-full text-center text-gray-500">
          No articles available.
        </p>
      ) : (
        articles.map((article: any) => (
          <Link key={article.id} href={`/articles/${article.id}`}>
            <Card className="rounded-lg border border-gray-200 dark:border-gray-800 hover:border-blue-500 dark:hover:border-blue-500 transition-colors bg-white dark:bg-gray-900 shadow-none">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-bold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 transition-colors">
                  {article.title}
                </CardTitle>
                <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 tracking-wider">
                  {article.journal?.title || "General Research"}
                </p>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 leading-relaxed">
                  {article.abstract}
                </p>
                <div className="mt-4 flex items-center gap-2">
                  <span className="text-xs text-gray-500">
                    By {article.author?.name || "Academic Contributor"}
                  </span>
                  <span className="text-gray-300">•</span>
                  <span className="text-xs text-gray-500">
                    {new Date(article.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))
      )}
    </div>
  );
}
