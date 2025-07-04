import { useState } from "react";
import {
  createTheme,
  AppBar,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ThemeProvider,
  Toolbar,
  Typography,
} from "@mui/material";
import { Logout as LogoutIcon, Menu as MenuIcon } from "@mui/icons-material";
import { Link, Outlet, useNavigate } from "react-router-dom";

declare module "@mui/material/styles" {
  // 指定を単純にするためにモバイルとPCの2つに限定する
  interface BreakpointOverrides {
    xs: false;
    sm: false;
    md: false;
    lg: false;
    xl: false;
    mobile: true;
    desktop: true;
  }
}

const defaultTheme = createTheme({
  breakpoints: {
    values: {
      mobile: 0,
      desktop: 600,
    },
  },
});
export function InventoryLayout() {
  /** サイドバーの開閉を管理する */
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavClick = (path: string) => {
    toggleDrawer(false); // サイドバーを閉じる
    navigate(path); // ページ遷移
  };

  const toggleDrawer = (open: boolean) => {
    setOpen(open);
  };

  /** 開閉対象となるサイドバー本体 */
  const list = () => (
    <Box sx={{ width: 240 }}>
      <Toolbar />
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={() => handleNavClick("/inventory/products")}>
            <ListItemText primary="商品一覧" />
          </ListItemButton>
        </ListItem>
        <Divider />
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => handleNavClick("/inventory/import_sales")}
          >
            <ListItemText primary="売上一括登録" />
          </ListItemButton>
        </ListItem>
        <Divider />
      </List>
    </Box>
  );

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: "flex" }}>
        <AppBar position="fixed">
          <Toolbar>
            <IconButton onClick={() => toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1 }}
            >
              在庫管理システム
            </Typography>
            <Button
              variant="contained"
              startIcon={<LogoutIcon />}
              component={Link}
              to="/login"
            >
              ログアウト
            </Button>
          </Toolbar>
        </AppBar>
        <Drawer open={open} onClose={() => toggleDrawer(false)} anchor="left">
          {list()}
        </Drawer>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            // AppBarと被るため下にずらしている
            marginTop: "64px",
            width: "100%",
            background: "white",
          }}
        >
          <Outlet />
        </Box>
        <Box
          component="footer"
          sx={{
            width: "100%",
            position: "fixed",
            textAlign: "center",
            bottom: 0,
            background: "#1976d2",
          }}
        >
          <Typography variant="caption" color="white">
            ©2023 full stack web development
          </Typography>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
