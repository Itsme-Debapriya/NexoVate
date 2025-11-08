"use client";


import Link from "next/link";
import { Mail, Linkedin, Twitter, Github } from "lucide-react";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="bg-foreground text-background mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 font-bold text-lg mb-4">
              <Image
                src="/Logo1.png"
                alt="NexoVate Logo"
                width={70}
                height={70}
                className="rounded-md p-1"
              />
              NexoVate
            </div>
            <p className="text-sm opacity-75">
              Empowering learners worldwide with high-quality education
              accessible to everyone.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4">Learn</h4>
            <ul className="space-y-2 text-sm opacity-75">
              <li>
                <Link href="/courses" className="hover:opacity-100">
                  Courses
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:opacity-100">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:opacity-100">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-semibold mb-4">Connect</h4>
            <div className="flex gap-4">
              <a
                href="https://www.linkedin.com/in/debapriya-dey-4012a62b5/"
                className="opacity-75 hover:opacity-100 transition"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://github.com/Itsme-Debapriya"
                className="opacity-75 hover:opacity-100 transition"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=debapriyadey03srp@gmail.com&body=I%20want%20to%20connect!"
                className="opacity-75 hover:opacity-100 transition"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-background-secondary pt-8 text-center text-sm opacity-75">
          <p>&copy; 2025 Debapriya. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
