import Category from "../Components/category/Category";
import { HeroSection } from "../Components/heroSection/HeroSection";
import HomePageProductCard from "../Components/homePageProductCard/HomePageProduct";
import Layout from "../Components/layout/Layout";
import Testimonial from "../Components/testimonial/Testimonial";
import Track from "../Components/Track";

const Home = () => {
  return (
    <>
      <Layout>
        <HeroSection/>
        <Category/>
        <HomePageProductCard/>
        <Track/>
        <Testimonial/>
      </Layout>
    </>
  )
};
export default Home;
