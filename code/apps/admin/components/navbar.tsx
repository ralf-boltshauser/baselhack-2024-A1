import paxLogo from "~/assets/images/pax-logo.svg";
import { Bell } from "lucide-react";
import Image from "next/image";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@repo/ui/components/ui/avatar";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-8 pb-4 pt-8 bg-white shadow-sm">
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
          <NavItem href="/leads" isActive>
            Leads
          </NavItem>
          <NavItem href="/configuration">Configuration</NavItem>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <button className="text-gray-600 hover:text-gray-800">
          <Bell className="w-5 h-5" />
          <span className="sr-only">Notifications</span>
        </button>
        <div className="w-px h-6 bg-gray-200" aria-hidden="true" />
        <div className="flex items-center space-x-3">
          <Avatar>
            <AvatarImage
              src="https://github.com/shadcn.png"
              alt="User avatar"
            />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-900">John Doe</span>
            <span className="text-xs text-gray-500">john@example.com</span>
          </div>
        </div>
      </div>
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
