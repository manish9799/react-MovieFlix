import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Img from '../lazyLoadImage/Img';
import CircleRating from '../circleRating/CircleRating';
import Genres from '../genres/Genres';
import PosterFallback from "../../assets/no-poster.png";
import { Typography } from '@mui/material';
import ContentWrapper from '../contentWrapper/ContentWrapper';
import dayjs from 'dayjs';
import "./style.scss";


const SearchMovieCard = ({ data, mediaType }) => {
    const { url } = useSelector((state) => state.home);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)

    return (
        <div className="carousel">
            {!loading ? (
                <div className="carouselItems searchMovies">
                    {data?.map((item) => {
                        const posterUrl = item.poster_path
                            ? url.poster + item.poster_path
                            : PosterFallback;
                        return (
                            <div
                                key={item.id}
                                className="carouselItem"
                                onClick={() =>
                                    navigate(`/${item.media_type || mediaType}/${item.id}`)
                                }
                            >
                                <div className="posterBlock">
                                    <Img src={posterUrl} />
                                    <CircleRating rating={item.vote_average?.toFixed(1)} />
                                    <Genres data={item.genre_ids?.slice(0, 2)} />
                                </div>
                                <div className="textBlock">
                                    <span className="title">
                                        {item?.title?.length > 20 ?
                                            item?.title.substring(0, 19) + '...' || item.name.substring(0, 18) + '...' :
                                            item.title || item.name
                                        }
                                    </span>
                                    <span className="date">
                                        {dayjs(item.release_date || item.first_air_date).format(
                                            "MMM D, YYYY")}
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : null
            }
        </div>
    );
}

export default SearchMovieCard