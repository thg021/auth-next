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
  isItemActive: boolean;
  items?: Items[];
};

export const NavItem = ({
  title,
  url,
  icon: Icon,
  isActive,
  isItemActive,
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
          <Link href={url}>
            <SidebarMenuButton
              tooltip={title}
              isActive={isItemActive}
              className="md:justify-center data-[active=true]:font-bold  data-[active=true]:bg-zinc-200 data-[active=true]:text-emerald-500"
            >
              {Icon && <Icon size={40} className="w-6 h-6" />}
              <div className="w-full flex items-center md:hidden">
                <span>{title}</span>
                {size(items) > 0 && (
                  <ChevronRight className=" ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90 " />
                )}
              </div>
            </SidebarMenuButton>
          </Link>
        </CollapsibleTrigger>
        <NavSubItem items={items} />
      </SidebarMenuItem>
    </Collapsible>
  );
};
