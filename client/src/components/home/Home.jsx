import Featured from "../featured/Featured";
import PropertyList from "../propertyList/PropertyList";
import FeaturedProperties from "../featuredProperties/FeaturedProperties";
import Footer from "../footer/Footer";
import "./home.css";

const Home = () => {
  return (
    <div>
      <div className="homeContainer">
        <Featured/> 
        <h1 className="homeTitle">Browse by Sports type</h1>
        <PropertyList/>
        <h1 className="homeTitle">Most Visited Grounds</h1>
        <FeaturedProperties/>
        <Footer/>
      </div>
    </div>
  );
};

export default Home;