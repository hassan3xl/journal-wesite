"use client";

import { useState } from "react";
import { submitArticleAction } from "@/lib/actions/articleActions";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Info } from "lucide-react";

export function SubmitForm({
  journals,
  userId,
}: {
  journals: any[];
  userId: string;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [journalId, setJournalId] = useState<string>("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!journalId) {
      setError("Please select a target journal.");
      return;
    }

    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);

    try {
      const res = await submitArticleAction({
        title: formData.get("title") as string,
        abstract: formData.get("abstract") as string,
        content: formData.get("content") as string,
        journalId,
        authorId: userId,
      });

      if (res.error) {
        setError(res.error);
      } else if (res.success) {
        router.push("/");
      }
    } catch {
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="shadow-lg border-t-4 border-t-indigo-500">
      <CardHeader>
        <CardTitle className="text-xl">Article Manuscript Submission</CardTitle>
        <CardDescription>
          Fill out the metadata and full text to submit to editorial review.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit} className="space-y-6">
        <CardContent className="space-y-4">
          {error && (
            <div className="p-3 bg-red-100 text-red-600 rounded-md text-sm">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="journal">Target Journal</Label>
            <Select
              onValueChange={(val: string | null) => setJournalId(val || "")}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a journal..." />
              </SelectTrigger>
              <SelectContent>
                {journals.map((j) => (
                  <SelectItem key={j.id} value={j.id}>
                    {j.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">Article Title</Label>
            <Input
              id="title"
              name="title"
              required
              placeholder="A Novel Approach to..."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="abstract">Abstract</Label>
            <Textarea
              id="abstract"
              name="abstract"
              required
              placeholder="Provide a brief summary of the research..."
              className="resize-none h-32"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">
              Full Academic Paper (Markdown / Text)
            </Label>
            <Textarea
              id="content"
              name="content"
              required
              placeholder="Paste your full paper content here..."
              className="resize-none h-64 font-mono text-sm"
            />
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground bg-gray-50 dark:bg-gray-900 p-3 rounded-md border">
            <Info className="w-4 h-4" />
            <span>
              Upon submission, your article status will be set to 'SUBMITTED'
              and pending editorial review.
            </span>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-4 border-t p-6 bg-slate-50 dark:bg-slate-950/50">
          <Button variant="outline" type="button" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button type="submit" disabled={loading} className="px-8">
            {loading ? "Submitting..." : "Submit Manuscript"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
