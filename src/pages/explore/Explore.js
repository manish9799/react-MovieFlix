import React, { useState, useEffect } from "react";
import ContentWrapper from '../../components/contentWrapper/ContentWrapper';
import { useNavigate, useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchDataFromApi } from "../../utils/api";
import ClearIcon from '@mui/icons-material/Clear';
import { Box, Chip, CircularProgress, FormControl, IconButton, InputLabel, MenuItem, OutlinedInput, Select, Stack, TextField, Typography } from "@mui/material";
import SearchMovieCard from "../../components/searchMovieCard/SearchMovieCard";
import useFetch from "../../hooks/useFetch";
import "./style.scss";

let filters = {};

const sortbyData = [
  { value: "popularity.desc", label: "Popularity Descending" },
  { value: "popularity.asc", label: "Popularity Ascending" },
  { value: "vote_average.desc", label: "Rating Descending" },
  { value: "vote_average.asc", label: "Rating Ascending" },
  {
    value: "primary_release_date.desc",
    label: "Release Date Descending",
  },
  { value: "primary_release_date.asc", label: "Release Date Ascending" },
  { value: "original_title.asc", label: "Title (A-Z)" },
];

const Explore = () => {
  const [data, setData] = useState(null);
  const [pageNum, setPageNum] = useState(1);
  const [loading, setLoading] = useState(false);
  const [genre, setGenre] = useState([]);
  const [sortby, setSortby] = useState(null);
  const { mediaType } = useParams();

  const { data: genresData } = useFetch(`/genre/${mediaType}/list`);

  const fetchInitialData = () => {
    setLoading(true);
    fetchDataFromApi(`/discover/${mediaType}`, filters).then((res) => {
      setData(res);
      setPageNum((prev) => prev + 1);
      setLoading(false);
    });
  };

  const fetchNextPageData = () => {
    fetchDataFromApi(
      `/discover/${mediaType}?page=${pageNum}`,
      filters
    ).then((res) => {
      if (data?.results) {
        setData({
          ...data,
          results: [...data?.results, ...res.results],
        });
      } else {
        setData(res);
      }
      setPageNum((prev) => prev + 1);
    });
  };

  useEffect(() => {
    filters = {};
    setData(null);
    setPageNum(1);
    setSortby(null);
    setGenre([]);
    fetchInitialData();
  }, [mediaType]);

  const onChange = (e) => {
    let val = e.target.value;
    let name = e.target.name;
    if (name === "sortby") {
      setSortby(val);
      filters.sort_by = val;
    }
    setPageNum(1);
    fetchInitialData();
  };


  const handleChange = (event) => {
    const {
      target: { value },
    } = event;

    setGenre(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const clearFilter = (name) => {
    if (name == 'sortby') {
      setSortby(null)
      delete filters.sort_by;
    } else {
      setGenre([])
      delete filters.with_genres;
    }
    setPageNum(1);
    fetchInitialData();
  }

  useEffect(()=>{
    if(genre?.length > 0){
      let genreId = [] 
      genre.map(item => genresData?.genres.filter(obj=> obj.name == item ? genreId.push(obj.id): null))
      filters.with_genres = genreId.join(',');
    }
    else{
      delete filters.with_genres;
    }
    setPageNum(1);
    fetchInitialData();
  },[genre])

  return (
    <div className="searchResultsPage">
      {/* {loading && <Spinner initial={true} />} */}
      {!loading ? (
        <ContentWrapper>
          <Box sx={{ py: 5, display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="h6" color='white'>Explore {mediaType == 'tv' ? 'TV Shows' : 'Movies'} </Typography>
            <Stack direction='row'>
              <FormControl sx={{ m: 1, width: 300, p: 0 }} size="small">
                <Typography color='white'>Select Genre -</Typography>
                <Select
                  name="genres"
                  multiple
                  value={genre}
                  onChange={handleChange}
                  className="select-filter"
                  input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                  sx={{ "& fieldset": { border: "none" } }}
                  endAdornment={<IconButton className="clear-icon" sx={{ display: genre.length ? 'block' : 'none' }} ><ClearIcon className="icon" onClick={() => clearFilter('genre')} /></IconButton>}

                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.3 }}>
                      {selected?.map((value) => (
                        <Chip sx={{ backgroundColor: 'black', color: 'white' }} key={value} label={value} />
                      ))}
                    </Box>
                  )}
                >
                  {genresData?.genres.map((item, i) => (
                    <MenuItem value={item.name}>{item.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl sx={{ m: 1, minWidth: 220 }} size="small">
                <Typography color='white'>Sort by</Typography>
                <Select
                  id="demo-select-small"
                  name='sortby'
                  value={sortby}
                  onChange={onChange}
                  className="select-filter"
                  sx={{ "& fieldset": { border: "none" } }}
                  endAdornment={<IconButton className="clear-icon" sx={{ display: sortby ? 'block' : 'none' }} ><ClearIcon className="icon" onClick={() => clearFilter('sortby')} /></IconButton>}
                >
                  {sortbyData?.map((item, i) => (
                    <MenuItem value={item.value}>
                      <em>{item.label}</em>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

            </Stack>
          </Box>
          {data?.results?.length > 0 ? (
            <>
              <InfiniteScroll
                className="content"
                dataLength={data?.results?.length || []}
                next={fetchNextPageData}
                hasMore={pageNum <= data?.total_pages}
                loader={
                  <Box sx={{ textAlign: 'center', minWidth: '100vh' }} >
                    <CircularProgress />
                  </Box>
                }
              >
                <SearchMovieCard data={data?.results} mediaType={mediaType}/>
              </InfiniteScroll>
            </>
          ) : (
            <Typography variant="h4" sx={{ p: 2, textAlign: 'center', minHeight: '60vh', display: 'flex', justifyContent: 'center' }} color='white'>Sorry, Results not found!</Typography>
          )}
        </ContentWrapper>
      ) :
        <Box sx={{minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
          <CircularProgress />
        </Box>
      }
    </div>
  );
}

export default Explore