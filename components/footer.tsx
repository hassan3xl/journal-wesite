import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full py-12 px-6 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
      <div className="max-w-[1500px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Journal Website
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
            Advancing knowledge through peer-reviewed research and scholarly
            excellence in English language education and literature.
          </p>
        </div>

        <div>
          <h4 className="font-semibold mb-4 text-gray-900 dark:text-gray-100 uppercase text-xs tracking-wider">
            Quick Links
          </h4>
          <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <li>
              <Link href="/" className="hover:text-blue-600 transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="hover:text-blue-600 transition-colors"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="hover:text-blue-600 transition-colors"
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                href="/privacy"
                className="hover:text-blue-600 transition-colors"
              >
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-4 text-gray-900 dark:text-gray-100 uppercase text-xs tracking-wider">
            Contact Information
          </h4>
          <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <li>Email: editor@journal.edu</li>
            <li>Phone: +1 (234) 567-890</li>
            <li>Address: Faculty of Arts, University Campus</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-4 text-gray-900 dark:text-gray-100 uppercase text-xs tracking-wider">
            Connect
          </h4>
          <div className="flex gap-4">
            <span className="text-xs font-medium text-gray-500 hover:text-blue-600 cursor-pointer transition-colors">
              Twitter
            </span>
            <span className="text-xs font-medium text-gray-500 hover:text-blue-600 cursor-pointer transition-colors">
              LinkedIn
            </span>
            <span className="text-xs font-medium text-gray-500 hover:text-blue-600 cursor-pointer transition-colors">
              Facebook
            </span>
          </div>
        </div>
      </div>
      <div className="max-w-[1500px] mx-auto mt-12 pt-8 border-t border-gray-100 dark:border-gray-900 text-center text-xs text-gray-400">
        &copy; {new Date().getFullYear()} University Journal. All rights
        reserved.
      </div>
    </footer>
  );
}
