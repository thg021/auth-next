import { ChevronRight, type LucideIcon } from "lucide-react";
import { size } from "lodash";
import { Collapsible, CollapsibleTrigger } from "@/components/ui/collapsible";
import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { NavSubItem } from "./nav-subitem";
import Link from "next/link";

type Items = {
  title: string;
  url: string;
};

type NavItemProps = {
  title: string;
  url: string;
  icon?: LucideIcon;
  isActive?: boolean;
  items?: Items[];
};

export const NavItem = ({
  title,
  url,
  icon: Icon,
  isActive,
  items,
}: NavItemProps) => {
  return (
    <Collapsible
      key={title}
      asChild
      defaultOpen={isActive}
      className="group/collapsible"
    >
      <SidebarMenuItem>
        <CollapsibleTrigger asChild>
          <Link href={url} className="">
            <SidebarMenuButton
              tooltip={title}
              className="group-data-[state=collapsed]:mx-auto"
            >
              {Icon && <Icon />}
              <span>{title}</span>
              {size(items) > 0 && (
                <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90 " />
              )}
            </SidebarMenuButton>
          </Link>
        </CollapsibleTrigger>
        <NavSubItem items={items} />
      </SidebarMenuItem>
    </Collapsible>
  );
};
