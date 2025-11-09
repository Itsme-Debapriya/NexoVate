"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Menu, X, Moon, Sun, User, LogOut, BookOpen } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useTheme } from "@/hooks/useTheme";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const pathname = usePathname();

  const toggleMenu = () => setIsOpen(!isOpen);

  const router = useRouter();
  const handleLogout = () => {
    logout();
    setIsOpen(false);
    router.push("/");
  };

  return (
    <nav className="sticky top-0 z-50 bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 font-bold text-xl text-primary"
          >
            <Image
              src="/Logo1.png"
              alt="NexoVate Logo"
              width={70}
              height={70}
              className="rounded-md p-1"
            />
            NexoVate
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/courses"
              className={`relative text-foreground hover:text-primary transition pb-1 ${
                pathname === "/courses"
                  ? "text-primary font-semibold after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-primary"
                  : ""
              }`}
            >
              Courses
            </Link>
            {isAuthenticated && (
              <Link
                href="/instructor"
                className={`relative text-foreground hover:text-primary transition pb-1 flex items-center gap-1 ${
                  pathname === "/instructor"
                    ? "text-primary font-semibold after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-primary"
                    : ""
                }`}
              >
                <BookOpen className="w-4 h-4" />
                Teach
              </Link>
            )}
            <Link
              href="/about"
              className={`relative text-foreground hover:text-primary transition pb-1 ${
                pathname === "/about"
                  ? "text-primary font-semibold after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-primary"
                  : ""
              }`}
            >
              About
            </Link>
            <Link
              href="/contact"
              className={`relative text-foreground hover:text-primary transition pb-1 ${
                pathname === "/contact"
                  ? "text-primary font-semibold after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-primary"
                  : ""
              }`}
            >
              Contact
            </Link>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 hover:bg-background-secondary rounded-lg transition"
              aria-label="Toggle theme"
            >
              {theme === "light" ? (
                <Moon className="w-5 h-5" />
              ) : (
                <Sun className="w-5 h-5" />
              )}
            </button>

            {/* Auth Buttons */}
            {!isAuthenticated ? (
              <div className="hidden sm:flex gap-2">
                <Link href="/signin" className="btn-outline">
                  Sign In
                </Link>
                <Link href="/signup" className="btn-primary">
                  Sign Up
                </Link>
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-3">
                <Link
                  href="/dashboard"
                  className="flex items-center gap-2 text-foreground hover:text-primary"
                >
                  <User className="w-4 h-4" />
                  <span className="text-sm">{user?.name}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-3 py-2 text-foreground hover:bg-background-secondary rounded-lg transition"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="md:hidden p-2 hover:bg-background-secondary rounded-lg"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2 border-t border-border pt-4">
            <Link
              href="/courses"
              className="block px-4 py-2 hover:bg-background-secondary rounded-lg"
            >
              Courses
            </Link>
            {isAuthenticated && (
              <Link
                href="/instructor"
                className="block px-4 py-2 hover:bg-background-secondary rounded-lg items-center gap-2"
              >
                <BookOpen className="w-4 h-4" />
                Teach
              </Link>
            )}
            <Link
              href="/about"
              className="block px-4 py-2 hover:bg-background-secondary rounded-lg"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="block px-4 py-2 hover:bg-background-secondary rounded-lg"
            >
              Contact
            </Link>
            {!isAuthenticated && (
              <div className="flex gap-2 px-4 pt-2">
                <Link href="/signin" className="btn-outline flex-1">
                  Sign In
                </Link>
                <Link href="/signup" className="btn-primary flex-1">
                  Sign Up
                </Link>
              </div>
            )}
            {isAuthenticated && (
              <div className="px-4 pt-2 space-y-2">
                <Link
                  href="/dashboard"
                  className="block px-3 py-2 hover:bg-background-secondary rounded-lg"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-3 py-2 hover:bg-background-secondary rounded-lg text-destructive"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
