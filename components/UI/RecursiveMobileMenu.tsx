import Link from "next/link";
import type { MenuItemType } from "@/lib/types.ts";
import {
  MenuItem,
  MenuPopup,
  MenuPortal,
  MenuPositioner,
  MenuSubmenuRoot,
  MenuSubmenuTrigger,
} from "./MenuBar.tsx";
export const RecursiveMobileMenu = ({ item }: { item: MenuItemType }) => {
  const hasChildren = item?.children && item?.children?.length > 0;
  if (hasChildren) {
    return (
      <MenuSubmenuRoot>
        <MenuSubmenuTrigger>Share</MenuSubmenuTrigger>
        <MenuPortal>
          <MenuPositioner alignOffset={-4}>
            <MenuPopup>
              {item?.children?.map((item) => (
                <RecursiveMobileMenu key={item?.title} item={item} />
              ))}
            </MenuPopup>
          </MenuPositioner>
        </MenuPortal>
      </MenuSubmenuRoot>
    );
  } else {
    return (
      <MenuItem>
        {item?.href ? <Link href={item?.href}>{item?.title}</Link> : item.title}
      </MenuItem>
    );
  }
};
