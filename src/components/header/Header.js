import { Box, Button, List, ListItem, Popover, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import "./style.scss";
import ContentWrapper from '../contentWrapper/ContentWrapper';


const navConfig = [
  { title: 'Home', path: '/' },
  { title: 'Movies', path: '/explore/movie' },
  { title: 'TV Shows', path: '/explore/tv' },
  // { title: 'Contact', path: '/contact' },
];
const Header = () => {
  const navigate = useNavigate()
  const [showMobile, setShowMobile] = useState(false)
  const [openMenu, setOpenMenu] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMobileMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (event) => {
    setAnchorEl(null);
  };


  return (
    <ContentWrapper>
    <Box className='header'>
      <Typography className='logo' onClick={()=>navigate('/')}>MovieFlix</Typography>

      {showMobile ?
        <>
          <Button onClick={handleMobileMenu}><MenuIcon /></Button>
          <Popover
            id={'mobileMenu'}
            open={openMenu}
            anchorEl={anchorEl}
            onClose={handleClose}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
            sx={{ mt: 4, boxShadow: 'none' }}
          >
            <Typography color='white'>njjjjjjjjjjj</Typography>

          </Popover>
          <List>
            {navConfig?.map((item, i) => {
              return (
                <ListItem key={i} sx={{ minWidth: '200px' }}>
                  <Link to={`${item.path}`} style={{ textDecoration: 'none' }} >
                    <Typography sx={{ color: 'white', textDecoration: 'none', fontSize: '14px', fontWeight: '500' }} >{item.title}</Typography>
                  </Link>
                </ListItem>
              )
            })}
          </List>
        </>
        :
        <List sx={{ display: 'flex' }}>
          {navConfig?.map((item, i) => {
            return (
              <ListItem key={i} sx={{ minWidth: '100px' }}>
                <Link to={`${item.path}`} style={{ textDecoration: 'none' }} >
                  <Typography sx={{ color: 'white', textDecoration: 'none', fontSize: '14px', fontWeight: '500' }} >{item.title}</Typography>
                </Link>
              </ListItem>
            )
          })}
        </List>
      }
    </Box>
    </ContentWrapper>
  )
}

export default Header