import React from 'react';
import Banner from '../../components/Banner/Banner';
import FeaturedArticles from '../FeaturedArticles/FeaturedArticles';
import Slider from '../../components/LottieSlider/Slider';

const Home = () => {
    return (
        <div>

            <Banner></Banner>
            <FeaturedArticles></FeaturedArticles>
            <Slider></Slider>
        </div>
    );
};

export default Home;