import React, { useState } from 'react';
import { Box, Drawer, List, ListItem, ListItemText, IconButton, AppBar, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Link from 'next/link';

const drawerWidth = 240;

export default function Layout({ children }) {
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const menuItems = [
        { text: 'Home', href: '/' },
        { text: 'All', href: '/all' },
        { text: 'Random Three', href: '/random-three' },
        { text: 'Random Five', href: '/random-five' },
        { text: 'Random Ten', href: '/random-ten' },
    ];

    const drawer = (
        <List>
            {menuItems.map((item) => (
                <ListItem
                    button
                    key={item.text}
                    component={Link}
                    href={item.href}
                    sx={{
                        color: 'white',
                        '& .MuiListItemText-primary': {
                            fontSize: '1.2rem',
                        }
                    }}
                >
                    <ListItemText primary={item.text} />
                </ListItem>
            ))}
        </List>
    );

    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar position="fixed">
                <Toolbar>
                    <IconButton
                        color="inherit"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        My App
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
            >
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true,
                    }}
                    sx={{
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    width: '100%',
                    mt: 8,
                }}
            >
                {children}
            </Box>
        </Box>
    );
} 