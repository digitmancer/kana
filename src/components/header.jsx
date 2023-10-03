import { useState} from 'react';
import { Box, Divider, Drawer, Icon, IconButton, List, ListItem, ListItemButton, ListItemText, Toolbar } from '@mui/material';

function Navigation({ pages, open, toggleOpen, setPage })
{
  const userPages = ['Settings'];

  const list = (items) => items.map((page) => (
    <ListItem key={page} disablePadding>
      <ListItemButton onClick={() => setPage(page)}>
        <ListItemText primary={page} />
      </ListItemButton>
    </ListItem>
  ));

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={toggleOpen(false)}
    >
      <Box
        onClick={toggleOpen(false)}
        onKeyDown={toggleOpen(false)}
      > 
        <List>
          {list(pages.filter((page) => !userPages.includes(page)))}
          <Divider />
          {list(pages.filter((page) => userPages.includes(page)))}
        </List>
      </Box>
    </Drawer>
  )
}

export default function Header({ pages, setPage })
{
  const [navOpen, setNavOpen] = useState(false);
  const toggleNav = (newState) => (event) => 
  {
    if (event.type === 'keydown' && 
        (event.key === 'Tab' || event.key === 'Shift')) 
      return;

    setNavOpen(newState);
  };

  return (
    <Box className="header">
      <Toolbar>
        <Box>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleNav(true)}
          >
            <Icon>menu</Icon>
          </IconButton>
          <Navigation 
            pages={pages}
            open={navOpen} 
            toggleOpen={toggleNav}
            setPage={setPage}
          />
        </Box>
      </Toolbar>
    </Box>
  )
}