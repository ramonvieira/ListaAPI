
import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Box, AppBar, Toolbar, Typography, Drawer, List, ListItem, ListItemText, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Users from '../pages/Users';
import Posts from '../pages/Posts';
import Comments from '../pages/Comments';
import Albums from '../pages/Albums';
import Photos from '../pages/Photos';
import Todos from '../pages/Todos';

const menuItems = [
  { text: 'Users', path: '/', component: Users },
  { text: 'Posts', path: '/posts', component: Posts },
  { text: 'Comments', path: '/comments', component: Comments },
  { text: 'Albums', path: '/albums', component: Albums },
  { text: 'Photos', path: '/photos', component: Photos },
  { text: 'Todos', path: '/todos', component: Todos },
];

function Layout() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <List>
      {menuItems.map((item) => (
        <ListItem button key={item.text} component={Link} to={item.path}>
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
          <Typography variant="h6" noWrap>
            JSONPlaceholder App
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="temporary"
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{
          '& .MuiDrawer-paper': { width: 240 },
        }}
      >
        {drawer}
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: '100%',
          mt: 8
        }}
      >
        <Routes>
          {menuItems.map((item) => (
            <Route
              key={item.path}
              path={item.path}
              element={<item.component />}
            />
          ))}
        </Routes>
      </Box>
    </Box>
  );
}

export default Layout;
