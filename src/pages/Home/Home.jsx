import React, { Suspense } from 'react';
import Banner from '../../components/Banner/Banner';
import FeaturedArticles from '../FeaturedArticles/FeaturedArticles';
import Slider from '../../components/LottieSlider/Slider';
import Loader from '../../components/Loader/Loader';
import { useLoaderData } from 'react-router';


const Home = () => {

    const featuredArticleData = useLoaderData();
    return (
        <div>

            <Banner></Banner>
            <Suspense fallback={<Loader></Loader>}>
                <FeaturedArticles featuredArticleData={featuredArticleData}></FeaturedArticles>
            </Suspense>
            <Slider></Slider>
        </div>
    );
};

export default Home;