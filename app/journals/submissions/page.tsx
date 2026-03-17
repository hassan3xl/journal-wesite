import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, FileText, Info, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function SubmissionsPage() {
  const session = await auth();

  if (!session) {
    redirect("/login?callbackUrl=/submissions");
  }

  return (
    <div className="space-y-12 py-4">
      {/* Header */}
      <div className="space-y-4">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100">
          Make a <span className="text-blue-600">Submission</span>
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Welcome,{" "}
          <span className="font-semibold text-gray-900 dark:text-white">
            {session.user?.name}
          </span>
          . Please review the guidelines below before uploading your manuscript.
        </p>
      </div>

      {/* Guidelines Card */}
      <div className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-3xl p-8 md:p-10 shadow-xl border border-gray-100 dark:border-gray-800 space-y-8">
        <div className="flex items-center gap-3 pb-6 border-b border-gray-100 dark:border-gray-800">
          <Info className="w-8 h-8 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Submission Guidelines
          </h2>
        </div>

        <div className="grid gap-8">
          <section className="space-y-3">
            <h3 className="flex items-center gap-2 font-bold text-lg text-gray-800 dark:text-gray-200">
              <FileText className="w-5 h-5 text-blue-500" />
              Manuscript Selection
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              All submissions must be original works not previously published or
              under consideration elsewhere. We accept research articles,
              reviews, and short communications in the field of English
              education and linguistics.
            </p>
          </section>

          <section className="space-y-3">
            <h3 className="flex items-center gap-2 font-bold text-lg text-gray-800 dark:text-gray-200">
              <ShieldCheck className="w-5 h-5 text-blue-500" />
              Peer Review Process
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              We employ a double-blind peer review process. Ensure that your
              manuscript does not contain any information that identifies the
              authors to maintain anonymity during the review phase.
            </p>
          </section>

          <section className="space-y-4">
            <h3 className="font-bold text-lg text-gray-800 dark:text-gray-200">
              Requirement Checklist
            </h3>
            <ul className="space-y-3">
              {[
                "Microsoft Word (.doc or .docx) format",
                "Single-spaced text, 12pt font (Times New Roman preferred)",
                "All illustrations, figures, and tables are placed within the text",
                "References follow APA 7th Edition guidelines",
                "The submission file is anonymous (Author names removed)",
              ].map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-gray-600 dark:text-gray-400"
                >
                  <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Action */}
        <div className="pt-8 border-t border-gray-100 dark:border-gray-800 flex flex-col sm:flex-row gap-4">
          <Button className="h-14 px-8 text-lg font-bold bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-lg shadow-blue-500/20">
            Start New Submission
          </Button>
          <Link href="/">
            <Button
              variant="outline"
              className="h-14 px-8 text-lg font-bold rounded-xl"
            >
              Cancel
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
