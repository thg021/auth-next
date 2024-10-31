"use client";

import { type LucideIcon } from "lucide-react";
import { map } from "lodash";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
} from "@/components/ui/sidebar";
import { NavItem } from "./nav-item";
import { usePathname } from "next/navigation";

type Items = {
  title: string;
  url: string;
};

type Item = {
  title: string;
  url: string;
  icon?: LucideIcon;
  isActive?: boolean;
  items?: Items[];
};

export function NavMain({ items }: { items: Item[] }) {
  const pathName = usePathname();
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {map(items, (item) => (
          <NavItem
            key={item.title}
            {...item}
            isItemActive={pathName === item.url}
          />
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
