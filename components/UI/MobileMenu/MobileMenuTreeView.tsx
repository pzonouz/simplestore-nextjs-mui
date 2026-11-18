"use client";
import "./MobileMenuTreeView.css";

import { AccountCircle } from "@mui/icons-material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import MenuIcon from "@mui/icons-material/MenuOutlined";
import {
  Box,
  Button,
  IconButton,
  SwipeableDrawer,
  Tab,
  Tabs,
} from "@mui/material";
import { RichTreeView } from "@mui/x-tree-view/RichTreeView";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import type { MenuItemType } from "@/lib/types";

const buildMap = (
  nodes: MenuItemType[],
  map: Record<string, MenuItemType> = {},
) => {
  nodes.forEach((n) => {
    map[n.id] = n;
    if (n.children?.length) buildMap(n.children, map);
  });
  return map;
};

const getItemLabel = (item: MenuItemType) => item.name;

export const MobileMenuTreeView = ({ items }: { items: MenuItemType[] }) => {
  const router = useRouter();
  const itemMap = useMemo(() => buildMap(items), [items]);
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState(0);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  return (
    <Box
      sx={{
        bgcolor: "white",
        position: "relative",
        width: "0",
        zIndex: 1000,
      }}
    >
      <IconButton
        sx={{
          bgcolor: "background.paper", // theme-aware surface (light/dark)
          color: "text.primary", // theme-aware icon color
          border: 1,
          borderColor: "divider",
          boxShadow: 2,
          "&:hover": {
            bgcolor: "action.hover",
          },
        }}
        onClick={() => setOpen((prev) => !prev)}
      >
        {<MenuIcon sx={{ cursor: "pointer" }} />}
      </IconButton>

      <SwipeableDrawer
        open={open}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        sx={{ width: "16rem" }}
        slotProps={{
          paper: {
            sx: { width: "18rem", maxWidth: "100vw", padding: "1rem" },
          },
        }}
      >
        <Tabs
          value={tab}
          onChange={handleTabChange}
          aria-label="menu tabs"
          variant="fullWidth"
        >
          <Tab
            icon={<MenuIcon />}
            id="menu-tab-0"
            aria-controls="menu-panel-0"
          />
          <Tab
            icon={<AccountCircle />}
            id="menu-tab-1"
            aria-controls="menu-panel-1"
          />
        </Tabs>

        {/* Panel for tab 0 */}
        <Box
          role="tabpanel"
          hidden={tab !== 0}
          id="menu-panel-0"
          aria-labelledby="menu-tab-0"
          sx={{ marginX: "auto" }}
        >
          {tab === 0 && (
            <RichTreeView
              onItemClick={(_event, itemId) => {
                const item = itemMap[itemId];
                if (item && !item.children?.length) {
                  setOpen(false);
                  router.push(
                    `/category/${encodeURIComponent(item.slug ?? "")}`,
                  );
                }
              }}
              sx={{ width: "16rem", paddingY: "1rem", marginX: "auto" }}
              dir="rtl"
              items={items}
              getItemLabel={getItemLabel}
              slots={{ expandIcon: ChevronLeftIcon }}
            />
          )}
        </Box>

        {/* Panel for tab 1 */}
        <Box
          role="tabpanel"
          hidden={tab !== 1}
          id="menu-panel-1"
          aria-labelledby="menu-tab-1"
        >
          {tab === 1 && (
            <Box
              sx={{
                p: 6,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Button variant="contained" startIcon={<AccountCircle />}>
                صفحه کاربری
              </Button>
            </Box>
          )}
        </Box>
      </SwipeableDrawer>
    </Box>
  );
};
