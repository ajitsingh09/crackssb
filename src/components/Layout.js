import React, { useState } from 'react';
import { Box, Drawer, List, ListItem, ListItemText, IconButton, AppBar, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Link from 'next/link';

const drawerWidth = 280;

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
        <List sx={{
            height: '100%',
            bgcolor: 'rgba(0, 0, 0, 0.9)',
            py: 0
        }}>
            {menuItems.map((item) => (
                <ListItem
                    button
                    key={item.text}
                    component={Link}
                    href={item.href}
                    sx={{
                        color: 'white',
                        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                        py: 3,
                        '& .MuiListItemText-primary': {
                            fontSize: '1.4rem',
                            textAlign: 'center',
                            fontWeight: 300,
                        },
                        '&:hover': {
                            bgcolor: 'rgba(255, 255, 255, 0.1)',
                            borderColor: 'rgba(255, 255, 255, 0.3)',
                            '& .MuiListItemText-primary': {
                                fontWeight: 400,
                            }
                        },
                        transition: 'all 0.3s ease',
                    }}
                >
                    <ListItemText primary={item.text} />
                </ListItem>
            ))}
        </List>
    );

    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar
                position="fixed"
                sx={{
                    bgcolor: 'rgba(0, 0, 0, 0.9)',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
                }}
            >
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
                        '& .MuiDrawer-paper': {
                            boxSizing: 'border-box',
                            width: drawerWidth,
                            bgcolor: 'rgba(0, 0, 0, 0.9)',
                        },
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