import { Menu } from "@base-ui/react/menu";
import { Menubar as BaseMenubar } from "@base-ui/react/menubar";
import CheckIcon from "@mui/icons-material/Check";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider, { type DividerProps } from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItemButton, {
  type ListItemButtonProps,
} from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader, {
  type ListSubheaderProps,
} from "@mui/material/ListSubheader";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import type * as React from "react";

/* ----------------------------- Menubar ----------------------------- */

const StyledMenubar = styled("div")(({ theme }) => ({
  display: "flex",
  width: "fit-content",
  gap: "1px",
  margin: "1rem 0",
  padding: theme.spacing(1),
  background: (theme.vars || theme).palette.grey[200],
  borderRadius: "8px",
  ...theme.applyStyles("dark", {
    background: (theme.vars || theme).palette.grey[800],
  }),
  '&[aria-orientation="vertical"]': {
    flexDirection: "column",
  },
}));

export function Menubar(props: React.ComponentProps<typeof BaseMenubar>) {
  return <BaseMenubar render={<StyledMenubar />} {...props} />;
}

export function MenuRoot(props: React.ComponentProps<typeof Menu.Root>) {
  return <Menu.Root {...props} />;
}

/* ------------------- Shared primary-colored item style ------------------- */
/* Primary text; primary background + white text on hover/active/highlight/open */

const StyledItemButton = styled(ListItemButton)(({ theme }) => {
  const { primary } = (theme.vars || theme).palette;
  return {
    color: primary.main,
    "& .MuiListItemIcon-root, & .MuiListItemText-secondary, & .MuiTypography-root":
    {
      color: "inherit",
    },
    "&:hover, &:active, &.Mui-focusVisible, &[data-highlighted], &[data-popup-open]":
    {
      backgroundColor: primary.main,
      color: primary.contrastText,
    },
  };
}) as typeof ListItemButton;

/* ------------------------------ Trigger ------------------------------ */

const StyledTrigger = styled(Button)(({ theme }) => {
  const { primary } = (theme.vars || theme).palette;
  return {
    paddingInline: theme.spacing(2),
    backgroundColor: "transparent",
    color: primary.main,
    fontWeight: 500,
    transition: "none",
    textTransform: "capitalize",
    letterSpacing: 0,
    fontSize: "1rem",
    "&:hover, &:active, &[data-popup-open], &.Mui-focusVisible": {
      backgroundColor: primary.main,
      color: primary.contrastText,
    },
    '[aria-orientation="vertical"] &': {
      justifyContent: "initial",
    },
  };
}) as typeof Button;

export function MenuTrigger(props: React.ComponentProps<typeof Menu.Trigger>) {
  return <Menu.Trigger render={<StyledTrigger size="small" />} {...props} />;
}

/* Root item without children: a plain link, no menu opens */
export function MenubarLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <StyledTrigger component={Link} href={href} size="small">
      {children}
    </StyledTrigger>
  );
}

/* ------------------------- Portal / Positioner ------------------------- */

export function MenuPortal(props: React.ComponentProps<typeof Menu.Portal>) {
  return <Menu.Portal {...props} />;
}

export function MenuPositioner(
  props: React.ComponentProps<typeof Menu.Positioner>,
) {
  return <Menu.Positioner {...props} />;
}

/* -------------------------------- Popup -------------------------------- */

const StyledPaper = styled(Paper)(({ theme }) => ({
  minWidth: 160,
  paddingBlock: theme.spacing(0.5),
  transformOrigin: "var(--transform-origin)",
  "&[data-starting-style], &[data-ending-style]": {
    opacity: 0,
    transform: "scale(0.95)",
  },
}));

export function MenuPopup(props: React.ComponentProps<typeof Menu.Popup>) {
  return (
    <Menu.Popup
      render={(renderProps) => (
        <StyledPaper elevation={8}>
          <List
            component="div"
            disablePadding
            sx={{ outline: "none" }}
            {...renderProps}
          >
            {props.children}
          </List>
        </StyledPaper>
      )}
      {...props}
    />
  );
}

/* -------------------------------- Item -------------------------------- */

interface MenuItemExtendedProps {
  icon?: React.ReactNode;
  secondary?: React.ReactNode;
  hint?: React.ReactNode;
  href?: string;
}

export function MenuItem(
  props: React.ComponentProps<typeof Menu.Item> &
    Pick<ListItemButtonProps, "sx"> &
    MenuItemExtendedProps,
) {
  const { sx = [], icon, hint, href, children, secondary, ...other } = props;
  const itemSx = [{ gap: 1.5 }, ...[sx].flat()];

  return (
    <Menu.Item
      render={
        href ? (
          <StyledItemButton component={Link} href={href} dense sx={itemSx} />
        ) : (
          <StyledItemButton dense sx={itemSx} />
        )
      }
      {...other}
    >
      {icon && <ListItemIcon sx={{ minWidth: "unset" }}>{icon}</ListItemIcon>}
      <ListItemText secondary={secondary}>{children}</ListItemText>
      {hint && (
        <Typography sx={{ flexShrink: 0, typography: "body2" }}>
          {hint}
        </Typography>
      )}
    </Menu.Item>
  );
}

/* ------------------------------ Submenu ------------------------------ */

export function MenuSubmenuRoot(
  props: React.ComponentProps<typeof Menu.SubmenuRoot>,
) {
  return <Menu.SubmenuRoot {...props} />;
}

const StyledHint = styled(Typography)(({ theme }) => ({
  flexShrink: 0,
  color: "inherit",
  ...theme.typography.body2,
}));

export function MenuSubmenuTrigger(
  props: React.ComponentProps<typeof Menu.SubmenuTrigger> &
    Pick<ListItemButtonProps, "sx"> &
    Pick<MenuItemExtendedProps, "icon" | "hint">,
) {
  const { sx, icon, hint, children, ...other } = props;
  return (
    <Menu.SubmenuTrigger render={<StyledItemButton dense sx={sx} />} {...other}>
      {icon && <ListItemIcon sx={{ minWidth: 32 }}>{icon}</ListItemIcon>}
      <ListItemText>{children}</ListItemText>
      {hint && <StyledHint>{hint}</StyledHint>}
      <ChevronRightIcon
        fontSize="small"
        sx={{
          marginInlineEnd: "-8px",
          "[dir='rtl'] &": { transform: "scaleX(-1)" },
        }}
      />
    </Menu.SubmenuTrigger>
  );
}

/* ----------------------------- Separator ----------------------------- */

export function MenuSeparator(
  props: React.ComponentProps<typeof Menu.Separator> & Pick<DividerProps, "sx">,
) {
  const { sx = [], ...other } = props;
  return (
    <Menu.Separator
      render={<Divider sx={[{ my: 0.5 }, ...[sx].flat()]} />}
      {...other}
    />
  );
}

/* ---------------------------- Checkbox item ---------------------------- */

export function MenuCheckboxItem(
  props: React.ComponentProps<typeof Menu.CheckboxItem> &
    Pick<MenuItemExtendedProps, "hint">,
) {
  const { hint, children, ...other } = props;
  return (
    <Menu.CheckboxItem render={<StyledItemButton dense />} {...other}>
      <ListItemIcon sx={{ minWidth: 32 }}>
        <Menu.CheckboxItemIndicator render={<CheckIcon fontSize="small" />} />
      </ListItemIcon>
      <ListItemText>{children}</ListItemText>
      {hint && <StyledHint>{hint}</StyledHint>}
    </Menu.CheckboxItem>
  );
}

/* ------------------------------ Radio item ------------------------------ */

export function MenuRadioGroup(
  props: React.ComponentProps<typeof Menu.RadioGroup>,
) {
  return <Menu.RadioGroup {...props} />;
}

export function MenuRadioItem(
  props: React.ComponentProps<typeof Menu.RadioItem> &
    Pick<MenuItemExtendedProps, "hint">,
) {
  const { hint, children, ...other } = props;
  return (
    <Menu.RadioItem render={<StyledItemButton dense />} {...other}>
      <ListItemIcon sx={{ minWidth: 32, position: "relative" }}>
        <RadioButtonUncheckedIcon fontSize="small" />
        <Menu.RadioItemIndicator
          render={
            <RadioButtonCheckedIcon
              fontSize="small"
              sx={{ position: "absolute", insetInlineStart: 0 }}
            />
          }
        />
      </ListItemIcon>
      <ListItemText>{children}</ListItemText>
      {hint && <StyledHint>{hint}</StyledHint>}
    </Menu.RadioItem>
  );
}

/* -------------------------------- Group -------------------------------- */

export function MenuGroup(props: React.ComponentProps<typeof Menu.Group>) {
  return (
    <Menu.Group render={<Box sx={{ position: "relative" }} />} {...props} />
  );
}

const StyledSubheader = styled(ListSubheader)(({ theme }) => ({
  position: "initial",
  paddingBlock: theme.spacing(1),
  backgroundColor: "transparent",
  ...theme.typography.overline,
  lineHeight: "1.5",
}));

export function MenuGroupLabel(
  props: React.ComponentProps<typeof Menu.GroupLabel> &
    Pick<ListSubheaderProps, "sx">,
) {
  const { sx, ...other } = props;
  const subheaderProps: ListSubheaderProps = { sx, component: "div" };
  return (
    <Menu.GroupLabel
      render={<StyledSubheader {...subheaderProps} />}
      {...other}
    />
  );
}
