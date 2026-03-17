"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BookOpen, Users, BookMarked, Globe, Handshake } from "lucide-react";

export default function InfoSidebar() {
  const partners = [
    { name: "Academic Press", logo: "AP" },
    { name: "University Library", logo: "UL" },
    { name: "Research Hub", logo: "RH" },
  ];

  return (
    <aside className="w-full h-full lg:w-[400px] space-y-6 p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg shadow-sm">
      {/* Action Button */}
      <div className="flex flex-col gap-4">
        <Link href="/search" className="block">
          <Button className="w-full h-12 text-base font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors flex items-center justify-center gap-2">
            Search
          </Button>
        </Link>
        <Link href="/submissions" className="block">
          <Button className="w-full h-12 text-base font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors flex items-center justify-center gap-2">
            Make a Submission
          </Button>
        </Link>
      </div>

      {/* Role Links */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
          Information For
        </h3>
        <div className="grid gap-2">
          {[
            {
              label: "For Readers",
              icon: BookOpen,
              href: "/information/readers",
            },
            { label: "For Authors", icon: Users, href: "/information/authors" },
            {
              label: "For Librarians",
              icon: BookMarked,
              href: "/information/librarians",
            },
          ].map((item) => (
            <Link key={item.label} href={item.href}>
              <div className="flex items-center gap-3 p-3 rounded-md bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group">
                <item.icon className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                  {item.label}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Languages */}
      <div className="space-y-3 pt-4 border-t border-gray-100 dark:border-gray-800">
        <div className="flex mt-6 items-center gap-2 text-gray-500 dark:text-gray-400">
          <Globe className="w-4 h-4" />
          <h3 className="text-md font-bold uppercase tracking-wider">
            Languages
          </h3>
        </div>
        <div className="flex flex-col gap-4 text-sm font-medium text-gray-600 dark:text-gray-400">
          <span className="hover:text-blue-600 cursor-pointer transition-colors">
            English
          </span>
          <span className="hover:text-blue-600 cursor-pointer transition-colors">
            Français
          </span>
          <span className="hover:text-blue-600 cursor-pointer transition-colors">
            Español
          </span>
        </div>
      </div>

      {/* Partners */}
      <div className="space-y-3 pt-4 border-t border-gray-100 dark:border-gray-800">
        <div className="flex mt-6 items-center gap-2 text-gray-500 dark:text-gray-400">
          <Handshake className="w-4 h-4" />
          <h3 className="text-md font-bold uppercase tracking-wider">
            Our Partners
          </h3>
        </div>
        <div className="grid grid-cols-1 gap-4">
          {partners.map((partner) => (
            <div
              key={partner.name}
              className="flex p-2 rounded bg-gray-50 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-800 transition-all text-center"
            >
              <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase">
                {partner.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
