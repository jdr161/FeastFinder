import { useState, useContext } from 'react';
import { AppBar, Box, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemText, Toolbar, Typography, Button } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import { NavLink, Link } from "react-router-dom";
import { AuthContext } from '../../contexts/authcontext';


const drawerWidth = 240;
const pages = [
  { name: 'Home', link: '/' },]
// { name: 'About', link: '/about' },
// { name: 'Services', link: '/services' },
// { name: 'Book Appointment', link: '/book-appointment' }]

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const auth = useContext(AuthContext);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        FeastFinder
      </Typography>
      <Divider />
      <List>
        {pages.map((item) => (
          <NavLink key={item.name} to={item.link} style={{ textDecoration: 'none', color: 'gray' }}>
            <ListItem key={item.name} disablePadding>
              <ListItemButton sx={{ textAlign: 'center' }}>
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          </NavLink>
        ))}
        {auth.user ? (
          <ListItem key="logout" disablePadding>
            <ListItemButton onClick={auth.logOut} sx={{ textAlign: 'center', textDecoration: 'none', color: 'gray' }}>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </ListItem>
        ) : ( 
          <NavLink key="login" to="/login" style={{ textDecoration: 'none', color: 'gray' }}>
            <ListItem key="login" disablePadding>
              <ListItemButton sx={{ textAlign: 'center' }}>
                <ListItemText primary="Login" />
              </ListItemButton>
            </ListItem>
          </NavLink>
        )}
      </List>
    </Box>
  );

  return (
    <Box>
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, textAlign: { xs: 'center', sm: 'left' } }}
          >
            <Link style={{ textDecoration: 'none', color: 'white' }}>
              FeastFinder
            </Link>
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {pages.map((item) => (
              <NavLink key={item.name} to={item.link}>
                <Button key={item.name} sx={{ color: '#fff' }}>
                  {item.name}
                </Button>
              </NavLink>
            ))}
            {auth.user ? (
              <Button key="logout" onClick={auth.logOut} sx={{ color: '#fff' }}>
                Logout
              </Button>
            ) : (
              <NavLink key="login" to="/login">
                <Button key="login" sx={{ color: '#fff' }}>
                  Login
                </Button>
              </NavLink>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  )
}

export default Navbar;