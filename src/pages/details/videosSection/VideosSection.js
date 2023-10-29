import React, { useState } from "react";

import "./style.scss";

import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import VideoPopup from "../../../components/videoPopup/VideoPopup";
import Img from "../../../components/lazyLoadImage/Img";
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import { Box, Stack, Typography } from "@mui/material";

const VideosSection = ({ data, loading }) => {
    const [show, setShow] = useState(false);
    const [videoId, setVideoId] = useState(null);

    const loadingSkeleton = () => {
        return (
            <div className="skItem">
                <div className="thumb skeleton"></div>
                <div className="row skeleton"></div>
                <div className="row2 skeleton"></div>
            </div>
        );
    };

    return (
        <div className="videosSection">
            <ContentWrapper>
                <Typography variant="h6" color='white' sx={{ my: 2 }}>Official Videos</Typography>
                {!loading ? (
                    <Stack direction='row' sx={{ overflowY: 'scroll' }}>
                        {data?.results?.map((video) => (
                            <Box
                                sx={{ p: 2, display: 'flex', flexDirection: 'column' }}
                                key={video.id}
                                onClick={() => {
                                    setVideoId(video.key);
                                    setShow(true);
                                }}
                            >
                                <Img className={'videoThumbnail'}
                                    src={`https://img.youtube.com/vi/${video.key}/mqdefault.jpg`}
                                />
                                {/* <span className="playBtn" >
                                        <PlayCircleOutlineIcon fontSize="large" />
                                     </span> */}
                                <Typography variant="p" color='white' sx={{ my: 2 }}>{video.name}</Typography>
                            </Box>
                        ))}
                    </Stack>
                ) : (
                    <div className="videoSkeleton">
                        {loadingSkeleton()}
                        {loadingSkeleton()}
                        {loadingSkeleton()}
                        {loadingSkeleton()}
                    </div>
                )}
            </ContentWrapper>
            <VideoPopup
                show={show}
                setShow={setShow}
                videoId={videoId}
                setVideoId={setVideoId}
            />
        </div>
    );
};

export default VideosSection;
