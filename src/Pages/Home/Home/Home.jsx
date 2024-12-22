import { Helmet } from "react-helmet-async";
import Banner from "../Banner/Banner";
import Category from "../Category/Category";
import PopularItems from "../../PopularItems/PopularItems";


const Home = () => {
    return (
        <div>
             <Helmet>
        <title>Online Shop | Home</title>
      </Helmet>
          <Banner></Banner> 
          <Category></Category>
          <PopularItems></PopularItems>
        </div>
    );
};

export default Home; 