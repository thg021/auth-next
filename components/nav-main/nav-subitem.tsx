import { map, size } from "lodash";
import { CollapsibleContent } from "../ui/collapsible";
import {
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "../ui/sidebar";

type NavSubitemProps = {
  items?: { title: string; url: string }[];
};

export const NavSubItem = ({ items }: NavSubitemProps) => {
  if (size(items) === 0) return;

  return (
    <CollapsibleContent>
      <SidebarMenuSub>
        {map(items, (subItem) => (
          <SidebarMenuSubItem key={subItem.title}>
            <SidebarMenuSubButton asChild>
              <a href={subItem.url}>
                <span>{subItem.title}</span>
              </a>
            </SidebarMenuSubButton>
          </SidebarMenuSubItem>
        ))}
      </SidebarMenuSub>
    </CollapsibleContent>
  );
};
