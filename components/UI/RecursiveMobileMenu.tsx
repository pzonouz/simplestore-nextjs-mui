import { MenuItemType } from "@/lib/types.ts";
import {
  MenuPortal,
  MenuPositioner,
  MenuPopup,
  MenuItem,
  MenuSubmenuRoot,
  MenuSubmenuTrigger,
} from "./MenuBar.tsx";
import Link from "next/link";
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
                <RecursiveMobileMenu item={item} />
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
