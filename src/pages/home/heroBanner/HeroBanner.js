import React, { useEffect, useState } from 'react'
import { Box, Button, IconButton, Stack, TextField, Typography } from '@mui/material'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useFetch from '../../../hooks/useFetch';
import Img from '../../../components/lazyLoadImage/Img';
import SearchIcon from '@mui/icons-material/Search';
import "./style.scss";

const HeroBanner = () => {

  const [background, setBackground] = useState("");
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { url } = useSelector((state) => state.home);
  const { data, loading } = useFetch("/movie/upcoming");

  useEffect(() => {
    const bg =
      url.backdrop +
      data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;
    setBackground(bg);
  }, [data]);

  const searchQueryHandler = (event) => {
    if (event.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`);
    }
  };

  return (
    <>

      <Box className='main-heroBanner'>
        <Img className={'homeBackground'}
          src={background}
        />
        <Box className='innerBox'>
        <Box className='inner-textBox'>
          <Typography variant='h3' color='white' sx={{mb:2}}>Welcome..</Typography>
          <Typography variant='subtitle' color='white' sx={{mb:4}}>Millions of movies, TV shows and people to discover.Explore now.</Typography>
          <Stack direction='row' sx={{margin:'0 auto',width:'40%'}}>
            <TextField
              type='text'
              name='search'
              size='small'
              fullWidth
              placeholder='Search for a movie or tv show....'
              sx={{ width: '100%', color: 'black', backgroundColor: 'white', borderRadius: '20px',p:0.8,pl:2 }}
              onChange={(e) => setQuery(e.target.value)}
              onKeyUp={searchQueryHandler}
              variant="standard"
              InputProps={{
                      disableUnderline: true,
                    }}
            />
            <IconButton sx={{p:0.2,ml:2}} onClick={()=>navigate(`/search/${query}`)}>
                            <SearchIcon sx={{p:0.4,backgroundColor:'black',color:'white',borderRadius:'20px',border:'3px solid white',fontSize:'38px'}}  />
              </IconButton>
          </Stack>
        </Box>

        </Box>
      </Box>
    </>

  )
}

export default HeroBanner