import Link from "next/link";
import type { MenuItemType } from "@/lib/types";
import {
  MenuItem,
  MenuPopup,
  MenuPortal,
  MenuPositioner,
  MenuSubmenuRoot,
  MenuSubmenuTrigger,
} from "./MenuBar";

export const RecursiveMainMenu = ({
  item,
  addressPrefix,
  onCloseRoot,
}: {
  item: MenuItemType;
  addressPrefix: string;
  onCloseRoot?: () => void;
}) => {
  const hasChildren = !!item?.children?.length;

  if (hasChildren) {
    return (
      <MenuSubmenuRoot>
        <MenuSubmenuTrigger
          onClick={() => {
            if (onCloseRoot) {
              onCloseRoot();
            }
          }}
        >
          <Link
            style={{
              color: "inherit",
              textDecoration: "none",
            }}
            href={`/${addressPrefix}/${item?.slug}`}
          >
            {item.name}
          </Link>
        </MenuSubmenuTrigger>
        <MenuPortal>
          <MenuPositioner side="left" alignOffset={-4}>
            <MenuPopup>
              {item.children?.map((child) => (
                <RecursiveMainMenu
                  addressPrefix={addressPrefix}
                  key={child.id}
                  item={child}
                />
              ))}
            </MenuPopup>
          </MenuPositioner>
        </MenuPortal>
      </MenuSubmenuRoot>
    );
  }

  return (
    <MenuItem href={`/${addressPrefix}/${item?.slug}`} closeOnClick>
      {item.name}
    </MenuItem>
  );
};
