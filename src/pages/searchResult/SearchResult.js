import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchDataFromApi } from "../../utils/api";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import noResults from "../../assets/no-results.png";
import { Box, CircularProgress, IconButton, Stack, TextField, Typography } from "@mui/material";
import SearchMovieCard from "../../components/searchMovieCard/SearchMovieCard";
import SearchIcon from '@mui/icons-material/Search';


const SearchResult = () => {
    const { query } = useParams();
    const navigate = useNavigate()
    const [data, setData] = useState(null);
    const [pageNum, setPageNum] = useState(1);
    const [loading, setLoading] = useState(false);
    const [newQuery, setNewQuery] = useState('')

    const fetchInitialData = () => {
        setLoading(true);
        fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`).then(
            (res) => {
                setData(res);
                setPageNum((prev) => prev + 1);
                setLoading(false);
            }
        );
    };

    const fetchNextPageData = () => {
        fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`).then(
            (res) => {
                if (data?.results) {
                    setData({
                        ...data,
                        results: [...data?.results, ...res.results],
                    });
                } else {
                    setData(res);
                }
                setPageNum((prev) => prev + 1);
            }
        );
    };

    useEffect(() => {
        setNewQuery(query)
        setPageNum(1);
        fetchInitialData();
    }, [query]);

    const searchQueryHandler = (event) => {
        if (event.key === "Enter" && newQuery.length > 0) {
            navigate(`/search/${newQuery}`);
        }
    };

    return (
        <div className="searchResultsPage">
            {/* {loading && <Spinner initial={true} />} */}
            {!loading ? (
                <ContentWrapper>
                    <Box sx={{ textAlign: 'center', m: 2 }}>
                        <TextField
                            type='text'
                            name='search'
                            size='small'
                            value={newQuery}
                            placeholder='Search for a movie or tv show....'
                            sx={{ width: '35%', color: 'black', backgroundColor: 'white', borderRadius: '20px', border: '3px solid black', p: 1 }}
                            onChange={(e) => setNewQuery(e.target.value)}
                            onKeyUp={searchQueryHandler}
                            variant="standard"
                            InputProps={{
                                disableUnderline: true,
                            }}
                        />
                        <IconButton sx={{ p: 0.2, ml: 2 }}
                            onClick={() => navigate(`/search/${newQuery}`)} >
                            <SearchIcon sx={{ mt: 0.5, p: 0.4, backgroundColor: 'black', color: 'white', borderRadius: '20px', border: '3px solid white', fontSize: '40px' }} />
                        </IconButton>
                    </Box>
                    {data?.results?.length > 0 ? (
                        <>
                            <Typography sx={{ p: 2 }} color='white'>
                                {`Search ${data?.total_results > 1 ?
                                    "results" : "result"} of '${query}'`}
                            </Typography>
                            <InfiniteScroll
                                className="content"
                                dataLength={data?.results?.length || []}
                                next={fetchNextPageData}
                                hasMore={pageNum <= data?.total_pages}
                                loader={
                                    <Box sx={{ textAlign: 'center' }} >
                                        <CircularProgress />
                                    </Box>
                                }
                            >
                                <SearchMovieCard data={data?.results} />
                            </InfiniteScroll>
                        </>
                    ) : (
                        <Typography variant="h4" sx={{ p: 2, textAlign: 'center', minHeight: '60vh', display: 'flex', justifyContent: 'center' }} color='white'>Sorry, Results not found!</Typography>
                    )}
                </ContentWrapper>
            ) :
                <Box sx={{ textAlign: 'center', minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
                    <CircularProgress />
                </Box>
            }
        </div>
    );
};

export default SearchResult;
