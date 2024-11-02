"use client";

import { useUser } from "@clerk/nextjs";
import paxLogo from "~/assets/images/pax-logo.svg";
import { Bell } from "lucide-react";
import Image from "next/image";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@repo/ui/components/ui/avatar";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const { user, isLoaded } = useUser();
  const pathname = usePathname();

  return (
    <nav className="flex items-center justify-between px-12 pb-4 pt-8 bg-white shadow-md">
      <div className="flex items-center space-x-12">
        <div className="flex items-end">
          <Image
            src={paxLogo}
            alt="Company Logo"
            width={72}
            height={72}
            className="text-blue-600"
          />
        </div>
        <div className="flex space-x-12">
          <NavItem href="/" isActive={pathname === "/"}>
            Leads
          </NavItem>
          <NavItem
            href="/configuration"
            isActive={pathname === "/configuration"}
          >
            Configuration
          </NavItem>
        </div>
      </div>
      {isLoaded && (
        <div className="flex items-center space-x-4">
          <button className="text-gray-600 hover:text-gray-800">
            <Bell className="w-5 h-5" />
            <span className="sr-only">Notifications</span>
          </button>
          <div className="w-px h-6 bg-gray-200" aria-hidden="true" />
          <div className="flex items-center space-x-3">
            <Avatar className="w-10 h-10">
              <AvatarImage src={user?.imageUrl} alt={user?.fullName || "..."} />
              <AvatarFallback>
                {user?.firstName?.charAt(0) || "?"}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-900">
                {user?.fullName || "loading..."}
              </span>
              <span className="text-xs text-gray-500">
                {user?.emailAddresses[0]?.emailAddress || "loading..."}
              </span>
            </div>
          </div>
        </div>
      )}
      {!isLoaded && (
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse" />
          <div className="flex flex-col space-y-2">
            <div className="w-24 h-4 bg-gray-200 rounded animate-pulse" />
            <div className="w-32 h-3 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
      )}
    </nav>
  );
}

interface NavItemProps {
  href: string;
  isActive?: boolean;
  children: React.ReactNode;
}

function NavItem({ href, isActive, children }: NavItemProps) {
  return (
    <Link
      href={href}
      className={`text-sm font-medium ${
        isActive
          ? "text-primary border-b-2 border-primary"
          : "text-gray-500 hover:text-gray-700"
      }`}
    >
      {children}
    </Link>
  );
}
