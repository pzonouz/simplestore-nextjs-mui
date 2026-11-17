"use client";
import MenuIcon from "@mui/icons-material/Menu";
import { Box, IconButton, useTheme } from "@mui/material";
import type { MenuItemType } from "../../../lib/types.ts";
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
  const theme = useTheme();
  return (
    <Box sx={{ zIndex: "2000", position: "relative" }}>
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
                <MenuIcon width={32} height={32} />
              </IconButton>
            }
          ></MenuTrigger>
          <MenuPortal dir="rtl">
            <MenuPositioner
              sideOffset={4}
              alignOffset={-2}
              // style={{ zIndex: 1400 }}
              style={{ zIndex: theme.zIndex.modal + 1 }}
            >
              <MenuPopup>
                {items?.map((item) => (
                  <RecursiveMobileMenu
                    addressPrefix="category"
                    key={item?.name}
                    item={item}
                  />
                ))}
              </MenuPopup>
            </MenuPositioner>
          </MenuPortal>
        </MenuRoot>
      </Menubar>
    </Box>
  );
}
