import React from "react";
import { useSelector } from "react-redux";


import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import Img from "../../../components/lazyLoadImage/Img";
import avatar from "../../../assets/avatar.png";
import { Box, Stack, Typography } from "@mui/material";

const Cast = ({ data, loading }) => {
    const { url } = useSelector((state) => state.home);

    const skeleton = () => {
        return (
            <div className="skItem">
                <div className="circle skeleton"></div>
                <div className="row skeleton"></div>
                <div className="row2 skeleton"></div>
            </div>
        );
    };
    return (
        <ContentWrapper>
            <Typography variant="h6" color='white' sx={{ my: 2 }}>Top Cast</Typography>
            {!loading ?
                <Stack direction='row' sx={{overflowY:'scroll'}}>
                    {data?.map((item) => {
                        let imgUrl = item.profile_path
                            ? url.profile + item.profile_path
                            : avatar;
                        return (
                            <Box sx={{p:2}}>
                                <Img className={'castImages'}
                                    src={imgUrl}
                                    />
                                <Typography variant="p" color='white' sx={{ my: 2 }}>{item.name}</Typography>
                                <Typography variant="p" color='white' sx={{ my: 2 }}>{item.character}</Typography>
                            </Box>
                        );
                    })}
                </Stack>
                : (
                    <div className="castSkeleton">
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                    </div>
                )}
        </ContentWrapper>
        // </div>
    );
};

export default Cast;
