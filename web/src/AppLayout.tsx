import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import AppBar, { type AppBarProps } from "@mui/material/AppBar";
import Box, { type BoxProps } from "@mui/material/Box";
import Container, { type ContainerProps } from "@mui/material/Container";
import Drawer, { type DrawerProps } from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Toolbar, { type ToolbarProps } from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { useState, type ReactNode } from "react";

import {
  CLASSIFICATION_BANNER_HEIGHT,
  ClassificationBanner,
  type Classification,
} from "./ClassificationBanner.js";

export interface AppLayoutProps extends Omit<
  BoxProps,
  "children" | "title" | "maxWidth"
> {
  children: ReactNode;
  title?: ReactNode;
  logo?: ReactNode;
  sidebar?: ReactNode;
  actions?: ReactNode;
  userMenu?: ReactNode;
  classification?: Classification;
  sidebarWidth?: number | string;
  collapsedSidebarWidth?: number | string;
  defaultSidebarOpen?: boolean;
  sidebarOpen?: boolean;
  onSidebarOpenChange?: (open: boolean) => void;
  maxWidth?: ContainerProps["maxWidth"];
  appBarProps?: AppBarProps;
  toolbarProps?: ToolbarProps;
  drawerProps?: Omit<DrawerProps, "open" | "variant">;
  mainProps?: ContainerProps;
}

const toolbarHeight = { xs: 56, sm: 64 } as const;

const toCssSize = (value: number | string) =>
  typeof value === "number" ? `${value}px` : value;

export function AppLayout({
  children,
  title,
  logo,
  sidebar,
  actions,
  userMenu,
  classification,
  sidebarWidth = 256,
  collapsedSidebarWidth = 72,
  defaultSidebarOpen = true,
  sidebarOpen,
  onSidebarOpenChange,
  maxWidth = "lg",
  appBarProps,
  toolbarProps,
  drawerProps,
  mainProps,
  sx,
  ref,
  ...rest
}: AppLayoutProps) {
  const theme = useTheme();
  const desktop = useMediaQuery(theme.breakpoints.up("md"));
  const [uncontrolledSidebarOpen, setUncontrolledSidebarOpen] =
    useState(defaultSidebarOpen);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const desktopSidebarOpen = sidebarOpen ?? uncontrolledSidebarOpen;
  const bannerHeight = classification ? CLASSIFICATION_BANNER_HEIGHT : 0;
  const currentSidebarWidth = desktopSidebarOpen
    ? sidebarWidth
    : collapsedSidebarWidth;
  const currentSidebarCssWidth = toCssSize(currentSidebarWidth);

  const setDesktopSidebarOpen = (open: boolean) => {
    if (sidebarOpen === undefined) {
      setUncontrolledSidebarOpen(open);
    }
    onSidebarOpenChange?.(open);
  };

  const handleSidebarToggle = () => {
    if (desktop) {
      setDesktopSidebarOpen(!desktopSidebarOpen);
    } else {
      setMobileSidebarOpen(true);
    }
  };

  const sidebarContent = (
    <Box
      aria-label="Sidebar navigation"
      component="nav"
      sx={{ flex: 1, minHeight: 0, overflowX: "hidden", overflowY: "auto" }}
    >
      {sidebar}
    </Box>
  );

  return (
    <Box
      ref={ref}
      sx={[
        {
          bgcolor: "background.default",
          minHeight: "100vh",
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...rest}
    >
      {classification && (
        <ClassificationBanner classification={classification} />
      )}

      <AppBar
        color="transparent"
        elevation={0}
        position="fixed"
        {...appBarProps}
        sx={[
          {
            bgcolor: "background.default",
            borderBottom: 1,
            borderColor: "divider",
            color: "text.primary",
            top: `${bannerHeight}px`,
            zIndex: (currentTheme) => currentTheme.zIndex.drawer + 1,
          },
          ...(Array.isArray(appBarProps?.sx)
            ? appBarProps.sx
            : [appBarProps?.sx]),
        ]}
      >
        <Toolbar
          {...toolbarProps}
          sx={[
            { gap: 1 },
            ...(Array.isArray(toolbarProps?.sx)
              ? toolbarProps.sx
              : [toolbarProps?.sx]),
          ]}
        >
          {sidebar && !desktop && (
            <IconButton
              aria-label="Open sidebar"
              color="inherit"
              edge="start"
              onClick={handleSidebarToggle}
            >
              <MenuIcon />
            </IconButton>
          )}
          {logo}
          {title && (
            <Typography
              component="span"
              noWrap
              sx={{ flexGrow: 1, fontWeight: 700, minWidth: 0 }}
              variant="h6"
            >
              {title}
            </Typography>
          )}
          {!title && <Box sx={{ flexGrow: 1 }} />}
          <Stack alignItems="center" direction="row" spacing={1}>
            {actions}
            {userMenu}
          </Stack>
        </Toolbar>
      </AppBar>

      {sidebar && (
        <>
          <Drawer
            {...drawerProps}
            open
            variant="permanent"
            sx={[
              {
                display: { xs: "none", md: "block" },
                "& .MuiDrawer-paper": {
                  bgcolor: "background.paper",
                  borderColor: "divider",
                  boxSizing: "border-box",
                  height: {
                    xs: `calc(100% - ${bannerHeight + toolbarHeight.xs}px)`,
                    sm: `calc(100% - ${bannerHeight + toolbarHeight.sm}px)`,
                  },
                  overflowX: "hidden",
                  display: "flex",
                  flexDirection: "column",
                  top: {
                    xs: `${bannerHeight + toolbarHeight.xs}px`,
                    sm: `${bannerHeight + toolbarHeight.sm}px`,
                  },
                  transition: theme.transitions.create("width", {
                    easing: theme.transitions.easing.sharp,
                    duration: desktopSidebarOpen
                      ? theme.transitions.duration.enteringScreen
                      : theme.transitions.duration.leavingScreen,
                  }),
                  width: currentSidebarWidth,
                },
              },
              ...(Array.isArray(drawerProps?.sx)
                ? drawerProps.sx
                : [drawerProps?.sx]),
            ]}
          >
            {sidebarContent}
            <Box
              sx={{
                alignItems: "center",
                display: "flex",
                flexShrink: 0,
                justifyContent: "flex-start",
                p: 2,
              }}
            >
              <IconButton
                aria-expanded={desktopSidebarOpen}
                aria-label={
                  desktopSidebarOpen ? "Collapse sidebar" : "Expand sidebar"
                }
                onClick={() => setDesktopSidebarOpen(!desktopSidebarOpen)}
              >
                {desktopSidebarOpen ? (
                  <ChevronLeftIcon />
                ) : (
                  <ChevronRightIcon />
                )}
              </IconButton>
            </Box>
          </Drawer>

          <Drawer
            {...drawerProps}
            ModalProps={{ keepMounted: true, ...drawerProps?.ModalProps }}
            onClose={() => setMobileSidebarOpen(false)}
            open={mobileSidebarOpen}
            sx={[
              {
                display: { xs: "block", md: "none" },
                "& .MuiDrawer-paper": {
                  bgcolor: "background.paper",
                  borderColor: "divider",
                  boxSizing: "border-box",
                  height: {
                    xs: `calc(100% - ${bannerHeight + toolbarHeight.xs}px)`,
                    sm: `calc(100% - ${bannerHeight + toolbarHeight.sm}px)`,
                  },
                  top: {
                    xs: `${bannerHeight + toolbarHeight.xs}px`,
                    sm: `${bannerHeight + toolbarHeight.sm}px`,
                  },
                  width: sidebarWidth,
                },
              },
              ...(Array.isArray(drawerProps?.sx)
                ? drawerProps.sx
                : [drawerProps?.sx]),
            ]}
            variant="temporary"
          >
            <Box sx={{ display: "flex", justifyContent: "flex-end", p: 1 }}>
              <IconButton
                aria-label="Close sidebar"
                onClick={() => setMobileSidebarOpen(false)}
              >
                <CloseIcon />
              </IconButton>
            </Box>
            {sidebarContent}
          </Drawer>
        </>
      )}

      <Container
        component="main"
        maxWidth={maxWidth}
        {...mainProps}
        sx={[
          {
            ml: {
              xs: 0,
              md: sidebar ? currentSidebarCssWidth : 0,
            },
            width: {
              xs: "100%",
              md: sidebar ? `calc(100% - ${currentSidebarCssWidth})` : "100%",
            },
            pt: {
              xs: `${bannerHeight + toolbarHeight.xs}px`,
              sm: `${bannerHeight + toolbarHeight.sm}px`,
            },
            transition: theme.transitions.create(["margin-left", "width"]),
          },
          ...(Array.isArray(mainProps?.sx) ? mainProps.sx : [mainProps?.sx]),
        ]}
      >
        {children}
      </Container>
    </Box>
  );
}

AppLayout.displayName = "AppLayout";
