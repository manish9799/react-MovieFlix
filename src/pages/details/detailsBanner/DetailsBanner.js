import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import useFetch from '../../../hooks/useFetch';
import { useParams } from 'react-router-dom';
import { Box, Button, Stack, Typography } from '@mui/material';
import Img from '../../../components/lazyLoadImage/Img';
import PosterFallback from "../../../assets/no-poster.png";
import dayjs from 'dayjs';
import Genres from '../../../components/genres/Genres';
import CircleRating from '../../../components/circleRating/CircleRating';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import VideoPopup from '../../../components/videoPopup/VideoPopup';

const DetailsBanner = ({ video, crew }) => {
    const [show, setShow] = useState(false);
    const [videoId, setVideoId] = useState(null);
    const movieD = ["Status", "Release Date", "Runtime"]

    const { mediaType, id } = useParams();
    const { data, loading } = useFetch(`/${mediaType}/${id}`);

    const { url } = useSelector((state) => state.home);

    const _genres = data?.genres?.map((g) => g.id);

    const director = crew?.filter((f) => f.job === "Director");
    const writer = crew?.filter(
        (f) => f.job === "Screenplay" || f.job === "Story" || f.job === "Writer"
    );

    const toHoursAndMinutes = (totalMinutes) => {
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
    };

    const movieDetails = (title) => {
        return (
            <Stack direction='row'>
                <Typography color='white' sx={{ fontSize: '15px' }}>{title}:</Typography>
                <Typography color='grey' sx={{ fontSize: '15px', ml: 1, mr: 2 }} >
                    {title == 'Status' ? data?.status : title == 'Release Date' ?
                        dayjs(data?.release_date).format("MMM D, YYYY") : title == 'Runtime' ?
                            toHoursAndMinutes(data?.runtime) : null
                    }
                </Typography>
            </Stack>
        )
    }

    return (

        <Box sx={{ position: 'relative' }}>
            <Img className={'detailsBackground'}
                src={url?.backdrop + data?.backdrop_path}
            />
            <Stack direction='row' gap={6} sx={{ paddingLeft: '10%', paddingTop: '5%', width: '100%', height: '90vh', backgroundColor: 'rgb(8, 8, 8,0.8)', position: 'absolute', top: 0 }}>
                <Box sx={{ width: '25%' }}>
                    {data?.poster_path ? (
                        <Img className={'moviePoster'}
                            src={url?.backdrop + data?.poster_path}
                        />
                    ) : (
                        <Img className={'moviePoster'}
                            src={PosterFallback}
                        />
                    )}
                </Box>
                <Box sx={{ width: '60%', display: 'flex', flexDirection: 'column', }}>
                    <Typography variant='h5' color='white'>
                        {`${data?.name || data?.title} 
                            (${dayjs(data?.release_date).format("YYYY")})`
                        }
                    </Typography>
                    <Typography variant='p' color='grey'> {data?.tagline}</Typography>
                    <div style={{ margin: '10px 10px 20px 10px' }}>
                        <Genres data={_genres} />
                    </div>
                    <Stack direction='row' gap={3} sx={{ mb: 2 }} >
                        <div style={{ width: '7%' }}>
                            <CircleRating rating={data?.vote_average?.toFixed(1)} />
                        </div>
                        <Button onClick={() => {
                            setShow(true);
                            setVideoId(video.key);
                        }} variant="contained" startIcon={<PlayCircleOutlineIcon sx={{ fontSize: '20px' }} />}>
                            <Typography sx={{ fontSize: '12px', textTransform: 'none' }}>Watch Trailer</Typography>
                        </Button>
                    </Stack>
                    <Typography color='white' sx={{ fontSize: '20px' }}> Overview</Typography>
                    <Typography color='white' sx={{ fontSize: '13px', width: '100%' }} > {data?.overview}</Typography>
                    <Stack direction='row' sx={{ mt: 1, }}>
                        {movieD?.map((item) => {
                            return movieDetails(item);
                        })}
                    </Stack>
                    {director?.length > 0 &&
                        <Stack direction='row' sx={{ mt: 1 }}>
                            <Typography color='white' sx={{ fontSize: '15px', mr: 1 }}>Director:</Typography>
                            {director?.map((d, i) => {
                                return (
                                    <Typography color='grey' sx={{ fontSize: '15px', ml: 0.5 }} >
                                        {d.name}{director.length - 1 !== i && ", "}
                                    </Typography>
                                )
                            })}
                        </Stack>
                    }
                    {writer?.length > 0 &&
                        <Stack direction='row' sx={{ mt: 1 }}>
                            <Typography color='white' sx={{ fontSize: '15px', mr: 1 }}>Writer:</Typography>
                            {writer?.map((d, i) => {
                                return (
                                    <Typography color='grey' sx={{ fontSize: '15px', ml: 0.5, }} >
                                        {d.name}{writer.length - 1 !== i && ", "}
                                    </Typography>
                                )
                            })}
                        </Stack>
                    }

                </Box>
                <VideoPopup
                    show={show}
                    setShow={setShow}
                    videoId={videoId}
                    setVideoId={setVideoId}
                />

            </Stack>

        </Box>


    )
}

export default DetailsBanner