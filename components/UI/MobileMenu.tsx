import { MenuItemType } from "../../lib/types.ts";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Menubar,
  MenuRoot,
  MenuTrigger,
  MenuPortal,
  MenuPositioner,
  MenuPopup,
} from "./MenuBar.tsx";
import { IconButton } from "@mui/material";
import { RecursiveMobileMenu } from "./RecursiveMobileMenu.tsx";

export default function MobileMenu({ items }: { items: MenuItemType[] }) {
  return (
    <Menubar dir="rtl">
      <MenuRoot>
        <MenuTrigger
          render={
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          }
        ></MenuTrigger>
        <MenuPortal dir="rtl">
          <MenuPositioner sideOffset={4} alignOffset={-2}>
            <MenuPopup>
              {items?.map((item) => (
                <RecursiveMobileMenu key={item?.title} item={item} />
              ))}
            </MenuPopup>
          </MenuPositioner>
        </MenuPortal>
      </MenuRoot>
    </Menubar>
  );
}
