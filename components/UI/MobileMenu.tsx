import MenuIcon from "@mui/icons-material/Menu";
import { Box, IconButton } from "@mui/material";
import type { MenuItemType } from "../../lib/types.ts";
import {
  Menubar,
  MenuPopup,
  MenuPortal,
  MenuPositioner,
  MenuRoot,
  MenuTrigger,
} from "./MenuBar.tsx";
import { RecursiveMobileMenu } from "./RecursiveMobileMenu.tsx";

export default function MobileMenu({ items }: { items: MenuItemType[] }) {
  return (
    <Box>
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
    </Box>
  );
}
