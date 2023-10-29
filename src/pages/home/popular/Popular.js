import React, { useState } from "react";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import useFetch from "../../../hooks/useFetch";
import Carousel from "../../../components/carousel/Carousel";
import CarouselHead from "../../../components/carouselHead/CarouselHead";

const Popular = () => {
    const [endpoint, setEndpoint] = useState("movie");
    const tabsData = [{label:"Movies",value:'movie'},{label:"TV Shows",value:'tv'}]
    const { data, loading } = useFetch(`/${endpoint}/popular`);

    return (
            <ContentWrapper >
                <CarouselHead
                    title="What's Popular"
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
};

export default Popular;
