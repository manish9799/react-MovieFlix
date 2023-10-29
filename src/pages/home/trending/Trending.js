import React, { useState } from "react";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import useFetch from "../../../hooks/useFetch";
import Carousel from "../../../components/carousel/Carousel";
import CarouselHead from "../../../components/carouselHead/CarouselHead";

const Trending = () => {
  const [endpoint, setEndpoint] = useState("day");
  const tabsData = [{ label: "Day", value: 'day' }, { label: "Week", value: 'week' }]
  const { data, loading } = useFetch(`/trending/movie/${endpoint}`);

  return (
    <ContentWrapper >
      <CarouselHead
        title="Trending"
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

export default Trending