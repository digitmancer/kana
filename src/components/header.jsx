import * as React from 'react';
import { Box, Button, Toolbar } from '@mui/material';

export default function Header({ pages, setPage })
{
  return (
    <Box className="header">
      <Toolbar>
        <Box sx={{ display: 'flex' }}>
          {pages.map((page) => (
            <Button
              key={page}
              onClick={() => setPage(page)}
              sx={{ color: 'white', display: 'block' }}
            >
              {page}
            </Button>
          ))}
        </Box>
      </Toolbar>
    </Box>
  )
}