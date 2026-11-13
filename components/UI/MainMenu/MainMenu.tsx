"use client";
import { Box } from "@mui/material";
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

export function MainMenubar({ items }: { items: MenuItemType[] }) {
  return (
    <Menubar dir="rtl">
      {items?.map((item) =>
        item?.children?.length ? (
          <MenuRoot key={item.title}>
            <MenuTrigger>{item.title}</MenuTrigger>
            <MenuPortal dir="rtl">
              <MenuPositioner sideOffset={4} alignOffset={-2}>
                <MenuPopup>
                  {item.children.map((child) => (
                    <RecursiveMainMenu key={child.title} item={child} />
                  ))}
                </MenuPopup>
              </MenuPositioner>
            </MenuPortal>
          </MenuRoot>
        ) : (
          <MenubarLink key={item.title} href={item.href ?? "#"}>
            {item.title}
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
