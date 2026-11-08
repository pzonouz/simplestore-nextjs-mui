import type { MenuItemType } from "@/lib/types";
import {
  MenuItem,
  MenuPopup,
  MenuPortal,
  MenuPositioner,
  MenuSubmenuRoot,
  MenuSubmenuTrigger,
} from "./MenuBar";

export const RecursiveMainMenu = ({ item }: { item: MenuItemType }) => {
  const hasChildren = !!item?.children?.length;

  if (hasChildren) {
    return (
      <MenuSubmenuRoot>
        <MenuSubmenuTrigger>{item.title}</MenuSubmenuTrigger>
        <MenuPortal>
          <MenuPositioner alignOffset={-4}>
            <MenuPopup>
              {item.children?.map((child) => (
                <RecursiveMainMenu key={child.title} item={child} />
              ))}
            </MenuPopup>
          </MenuPositioner>
        </MenuPortal>
      </MenuSubmenuRoot>
    );
  }

  return <MenuItem href={item?.href}>{item.title}</MenuItem>;
};
