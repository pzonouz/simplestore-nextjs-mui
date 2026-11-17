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
        <MenuSubmenuTrigger>{item?.name}</MenuSubmenuTrigger>
        <MenuPortal>
          <MenuPositioner alignOffset={-4}>
            <MenuPopup>
              {item?.children?.map((item) => (
                <RecursiveMobileMenu key={item?.name} item={item} />
              ))}
            </MenuPopup>
          </MenuPositioner>
        </MenuPortal>
      </MenuSubmenuRoot>
    );
  } else {
    return (
      <MenuItem>
        {item?.slug ? (
          <Link
            style={{ textDecoration: "none", color: "black" }}
            href={item?.slug}
          >
            {item?.name}
          </Link>
        ) : (
          item.name
        )}
      </MenuItem>
    );
  }
};
