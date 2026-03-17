import { auth } from "@/auth";
import Link from "next/link";
import { logoutAction } from "@/lib/actions/authActions";
import { Button } from "@/components/ui/button";

export default async function Navbar() {
  const session = await auth();

  return (
    <nav className="border-b bg-white dark:bg-gray-950 px-8 py-4 flex justify-between items-center shadow-sm">
      <Link
        href="/"
        className="text-xl font-bold tracking-tight text-blue-600 dark:text-blue-400"
      >
        UnivJournal
      </Link>

      <div className="flex items-center gap-4">
        {session?.user ? (
          <>
            <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {session.user.name} ({session.user.role})
            </div>

            {session.user.role === "ADMIN" && (
              <Link href="/admin">
                <Button variant="outline" size="sm">
                  Admin
                </Button>
              </Link>
            )}
            {session.user.role === "AUTHOR" && (
              <Link href="/submit">
                <Button variant="outline" size="sm">
                  Submit Article
                </Button>
              </Link>
            )}

            <form action={logoutAction}>
              <Button variant="ghost" size="sm" type="submit">
                Logout
              </Button>
            </form>
          </>
        ) : (
          <Link href="/login">
            <Button size="sm">Login</Button>
          </Link>
        )}
      </div>
    </nav>
  );
}
