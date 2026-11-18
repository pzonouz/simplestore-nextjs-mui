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
export const RecursiveMobileMenu = ({
  isRoot = true,
  item,
}: {
  item: MenuItemType;
  isRoot?: boolean;
}) => {
  const hasChildren = item?.children && item?.children?.length > 0;
  if (hasChildren) {
    return (
      <MenuSubmenuRoot>
        <MenuSubmenuTrigger>
          {isRoot ? (
            <>{item?.name}</>
          ) : (
            <Link
              style={{ textDecoration: "none", color: "black" }}
              href={item?.slug ?? "/"}
            >
              {item?.name}
            </Link>
          )}
        </MenuSubmenuTrigger>
        <MenuPortal>
          <MenuPositioner alignOffset={-4}>
            <MenuPopup>
              {item?.children?.map((item) => (
                <RecursiveMobileMenu
                  isRoot={false}
                  key={item?.name}
                  item={item}
                />
              ))}
            </MenuPopup>
          </MenuPositioner>
        </MenuPortal>
      </MenuSubmenuRoot>
    );
  } else {
    return (
      <MenuItem>
        <Link
          style={{ textDecoration: "none", color: "black" }}
          href={`${item?.slug}`}
        >
          {item.name}
        </Link>
      </MenuItem>
    );
  }
};
