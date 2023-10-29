import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import Similar from './carousels/Similar';
import Recommendation from './carousels/Recommendation';
import ContentWrapper from '../../components/contentWrapper/ContentWrapper';
import { Box } from '@mui/material';
import Img from '../../components/lazyLoadImage/Img';
import DetailsBanner from './detailsBanner/DetailsBanner';
import Cast from './cast/Cast';
import VideosSection from './videosSection/VideosSection';

const Details = () => {
  const { mediaType, id } = useParams();
  const { data, loading } = useFetch(`/${mediaType}/${id}/videos`);
  const { data: credits, loading: creditsLoading } = useFetch(
    `/${mediaType}/${id}/credits`
  );

  useEffect(() => {
    window.scrollTo(0, 0);
    // window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
  }, [id]);

  return (
    <>
      <DetailsBanner video={data?.results?.[0]} crew={credits?.crew} />
      <ContentWrapper >
        <Cast  data={credits?.cast} loading={creditsLoading} />
        <VideosSection data={data} loading={loading} />
        <Similar mediaType={mediaType} id={id} />
        <Recommendation mediaType={mediaType} id={id} />
      </ContentWrapper>
    </>
  )
}

export default Details