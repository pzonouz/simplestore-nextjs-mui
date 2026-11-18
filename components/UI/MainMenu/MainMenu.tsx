"use client";
import { Box } from "@mui/material";
import { useState } from "react";
import type { MenuItemType } from "@/lib/types";
import {
  Menubar,
  MenubarLink,
  MenuPopup,
  MenuPortal,
  MenuPositioner,
  MenuRoot,
  MenuTrigger,
} from "./MenuBar";
import { RecursiveMainMenu } from "./RecursiveMainMenu";

export function MainMenubar({
  items,
  addressPrefix,
}: {
  items: MenuItemType[];
  addressPrefix: string;
}) {
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  return (
    <Menubar dir="rtl">
      {items?.map((item) =>
        item?.children?.length ? (
          <MenuRoot
            key={item.id}
            open={openMenuId === item.id}
            onOpenChange={(open) => setOpenMenuId(open ? item.id : null)}
          >
            <MenuTrigger>{item.name}</MenuTrigger>
            <MenuPortal dir="rtl">
              <MenuPositioner sideOffset={4} alignOffset={-2}>
                <MenuPopup>
                  {item.children.map((child) => (
                    <RecursiveMainMenu
                      addressPrefix={addressPrefix}
                      key={child.id}
                      item={child}
                      onCloseRoot={() => setOpenMenuId(null)}
                    />
                  ))}
                </MenuPopup>
              </MenuPositioner>
            </MenuPortal>
          </MenuRoot>
        ) : (
          <MenubarLink key={item.id} href={"/"}>
            {item.name}
          </MenubarLink>
        ),
      )}
      <Box sx={{ marginInlineStart: "auto" }}>
        <MenubarLink key={"guide"} href={"/faq"}>
          راهنما
        </MenubarLink>
      </Box>
    </Menubar>
  );
}
