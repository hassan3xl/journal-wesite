"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchArticles } from "../api/queries";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {articles.length === 0 ? (
        <p className="col-span-full text-center text-gray-500">
          No articles available.
        </p>
      ) : (
        articles.map((article: any) => (
          <Card key={article.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>{article.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-2">
                {article.journal?.title}
              </p>
              <p className="line-clamp-3 text-gray-800">{article.abstract}</p>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
}
