
import { Box, CssBaseline } from "@mui/material";
import { styled } from '@mui/material/styles';
import { useState } from "react";
import { Outlet } from "react-router-dom";
import NavHeader from "./NavHeader";

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  }));

export default function DashboardLayout(){
    const [open, setOpen] = useState(true);

    const handleDrawerOpen = () => {
      setOpen(true);
    };
  
    const handleDrawerClose = () => {
      setOpen(false);
    };

    return <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <NavHeader open={open} handleDrawerOpen={handleDrawerOpen} handleDrawerClose={handleDrawerClose} />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <DrawerHeader />
            <Outlet />
        </Box>
    </Box>
}