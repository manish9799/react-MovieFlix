import React from 'react'
import { Box, Stack, Typography } from '@mui/material'
import ContentWrapper from '../contentWrapper/ContentWrapper'
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import "./style.scss";

const Footer = () => {
  return (
    <ContentWrapper>
    <Box className='footer' >
      <Stack className='about-col'>
        <Typography className='about'>Tearms & Condition</Typography>
        <Typography className='about'>Privacy Policy</Typography>
        <Typography className='about'>Contact</Typography>
        <Typography className='about'>About Us</Typography>
       
      </Stack>
      <Stack className='footer-col'>
        <LinkedInIcon className='icon'/>
        <InstagramIcon className='icon'/>
        <FacebookIcon className='icon'/>
        <TwitterIcon className='icon'/>
      </Stack>
      <Typography className='copyright'>Created By @ Manish Katara</Typography>
      <Typography color='white' sx={{fontSize:'12px',width:'100%'}}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</Typography>
    </Box>
    </ContentWrapper>
    
    
    
  )
}

export default Footer