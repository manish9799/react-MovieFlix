import { Box, Tab, Tabs, Typography } from '@mui/material'
import React from 'react'

const carouselHead = ({title,setEndpoint,endpoint,tabsData}) => {
    const onTabChange = (event, newValue) => {
        setEndpoint(newValue);
    };

  return (
    <Box sx={{
        p:2,
        display:'flex',
        justifyContent:'space-between',
        alignItems:'center'
    }}>
    <Typography variant="h6" color='white'>{title}</Typography>
    <Tabs sx={{backgroundColor:'white',borderRadius:'20px',minHeight:'25px'}}
     value={endpoint} 
     onChange={onTabChange} 
     aria-label="icon label tabs example"
     TabIndicatorProps={{
        style: { display: 'none' }
      }}
     >
        {tabsData?.map((tab,i)=>(
            <Tab sx={{color:'black',backgroundColor:endpoint == tab.value ? 'lightblue' : 'white',borderRadius:'20px'}} value={tab.value} label={tab.label} />
        ))}
    </Tabs>
    </Box>
  )
}

export default carouselHead