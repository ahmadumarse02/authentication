"use client";

import Image from "next/image";
import { useState } from "react";
import { LogOut, Settings, User, ChevronDown } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import avatar from "@/assets/assets/avatar.jpg";

interface HeaderProps {
  title: string;
  description: string;
}

const Header: React.FC<HeaderProps> = ({ title, description }) => {
  const [open, setOpen] = useState(false);

  return (
    <header className="flex items-center justify-between py-6">
      <div>
        <h1 className="text-xl font-bold">{title}</h1>
        <p className="text-sm text-[#262626]">{description}</p>
      </div>
      <div className="relative flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition">
        <Image
          src={avatar}
          alt="User Avatar"
          width={40}
          height={40}
          className="rounded-full"
        />
        <div className="text-left">
          <p className="text-sm font-medium">Otor John</p>
          <p className="text-xs text-gray-500">HR Office</p>
        </div>

        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <button
              className="p-2 rounded-md hover:bg-gray-200 transition"
              onClick={() => setOpen(!open)}
            >
              <ChevronDown className="w-4 h-4" />
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-48 p-2 bg-white shadow-lg rounded-lg">
            <button className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-gray-100 rounded-md">
              <User className="w-4 h-4" />
              Profile
            </button>
            <button className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-gray-100 rounded-md">
              <Settings className="w-4 h-4" />
              Settings
            </button>
            <button className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-500 hover:bg-gray-100 rounded-md">
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </PopoverContent>
        </Popover>
      </div>
    </header>
  );
};

export default Header;
