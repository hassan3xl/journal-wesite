import { auth } from "@/auth";
import Link from "next/link";
import { CheckCircle2, FileText, Info, ShieldCheck, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function SubmissionsPage() {
  const session = await auth();

  return (
    <div className="space-y-8 py-4">
      {/* Header */}
      <div className="space-y-3">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
          Manuscript <span className="text-blue-600">Submissions</span>
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Follow the guidelines below to submit your research for peer review.
        </p>
      </div>

      {!session ? (
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-lg p-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-800 rounded-full flex items-center justify-center shrink-0">
              <Lock className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                Authentication Required
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                You must be logged in to start a new submission.
              </p>
            </div>
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <Link
              href="/login?callbackUrl=/submissions"
              className="flex-1 md:flex-none"
            >
              <Button variant="default" className="w-full">
                Login
              </Button>
            </Link>
            <Link href="/register" className="flex-1 md:flex-none">
              <Button
                variant="outline"
                className="w-full bg-white dark:bg-transparent"
              >
                Create Account
              </Button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800 rounded-lg p-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-800 rounded-full flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                Ready to Submit
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Welcome back, {session.user?.name}. You can start your
                submission below.
              </p>
            </div>
          </div>
          <Button className="bg-green-600 hover:bg-green-700">
            Start Submission
          </Button>
        </div>
      )}

      {/* Guidelines Card */}
      <div className="bg-white dark:bg-gray-900 rounded-lg p-8 shadow-sm border border-gray-200 dark:border-gray-800 space-y-8">
        <div className="flex items-center gap-3 pb-4 border-b border-gray-100 dark:border-gray-800">
          <Info className="w-6 h-6 text-blue-600" />
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Submission Guidelines
          </h2>
        </div>

        <div className="grid gap-8">
          <section className="space-y-3">
            <h3 className="flex items-center gap-2 font-bold text-gray-800 dark:text-gray-200">
              <FileText className="w-5 h-5 text-blue-600" />
              Manuscript Preparation
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              All submissions must be original works not previously published or
              under consideration elsewhere. We accept research articles,
              reviews, and short communications in the field of English
              education and linguistics.
            </p>
          </section>

          <section className="space-y-3">
            <h3 className="flex items-center gap-2 font-bold text-gray-800 dark:text-gray-200">
              <ShieldCheck className="w-5 h-5 text-blue-600" />
              Double-Blind Peer Review
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              To ensure anonymity during the review phase, please ensure that
              your manuscript does not contain any information that identifies
              the authors. Place author names and affiliations on a separate
              title page.
            </p>
          </section>

          <section className="space-y-4">
            <h3 className="font-bold text-gray-800 dark:text-gray-200">
              Format & Requirements
            </h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "Microsoft Word (.doc or .docx) format",
                "12pt Times New Roman, single-spaced",
                "APA 7th Edition citation style",
                "Maximum 8,000 words including references",
                "Abstract (250 words max) and 5 Keywords",
                "Anonymous manuscript file for review",
              ].map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-400"
                >
                  <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
