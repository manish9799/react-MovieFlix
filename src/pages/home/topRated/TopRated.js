import React, { useState } from "react";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import useFetch from "../../../hooks/useFetch";
import Carousel from "../../../components/carousel/Carousel";
import CarouselHead from "../../../components/carouselHead/CarouselHead";

const TopRated = () => {
  const tabsData = [{label:"Movies",value:'movie'},{label:"TV Shows",value:'tv'}]
  const [endpoint, setEndpoint] = useState("movie");
  const { data, loading } = useFetch(`/${endpoint}/top_rated`);

  return (
    <ContentWrapper >
      <CarouselHead
        title="Top Rated"
        endpoint={endpoint}
        setEndpoint={setEndpoint}
        tabsData={tabsData}
      />
      <Carousel
        data={data?.results}
        loading={loading}
        endpoint={endpoint}
      />
    </ContentWrapper>
  );
}

export default TopRated