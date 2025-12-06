"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";

import { sidebarItems } from "../constants";
import { SidebarItem } from "./sidebar-item";

const Sidebar = () => {
  const [isTransition, setIsTransition] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleToogle = (open: boolean) => {
    setIsTransition(true);
    setIsOpen(open);
    setTimeout(() => setIsTransition(false), 200);
  };

  return (
    <aside
      className={cn(
        "h-screen border-r pt-24",
        isTransition && "duration-200",
        isOpen ? "md:w-60 w-[78px]" : "w-[78px]"
      )}
      onMouseEnter={() => handleToogle(true)}
      onMouseLeave={() => handleToogle(false)}
    >
      <nav className="px-3 py-2 space-y-2">
        {sidebarItems.map((item) => (
          <SidebarItem key={item.title} isOpen={isOpen} navItem={item} />
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
