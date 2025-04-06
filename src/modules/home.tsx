import React from "react";
import recipeRepo from "../repo/recipe.repo";
import restaurantsRepo from "../repo/restaurants.repo";
import { useQueries } from "@tanstack/react-query";
import Header from "../components/Header";
import IMAGES from "../constants/images";
import { RecipeProps, RestaurantProps } from "../types/types";
import PATHNAMES from "../constants/pathnames";
import { Link } from "react-router-dom";
import RecipeCard from "../components/RecipeCard";
import { FaArrowRight } from "react-icons/fa";
import RestaurantCard from "../components/RestaurantCard";
import { Loader } from "../components/Loader";

const HomePage = () => {
  const [recipeQuery, restaurantQuery] = useQueries({
    queries: [
      { queryKey: ["recipes"], queryFn: () => recipeRepo.find() },
      { queryKey: ["restaurants"], queryFn: () => restaurantsRepo.find() },
    ],
  });

  const recipes = recipeQuery?.data?.data?.data as RecipeProps[];
  const restaurants = restaurantQuery?.data?.data?.data as RestaurantProps[];

  return (
    <React.Fragment>
      <Header />
      <main>
        <div className="banner reveal-banner">
          <img style={{ width: "100%", height: "auto" }} src={IMAGES.RECIPE_BANNER} alt="Main Banner" />
        </div>
        <div className="container-xl py-5">
          <div className="fs-2 fw-bold mb-4">Trending Now</div>
          <div className="row">
            <Loader isLoading={recipeQuery.isPending && !recipes?.length} type="horizontal" />
            {recipes?.slice(0, 6).map((item) => (
              <div className="col-12 col-md-6 col-lg-4 mb-4 reveal-item" key={item?._id}>
                <RecipeCard recipe={item} type="b" />
              </div>
            ))}
          </div>
        </div>

        <div className="container-xl py-5">
          <div className="fs-2 fw-bold mb-4 text-center">Fresh Picks</div>
          <div className="row">
            <Loader isLoading={recipeQuery.isPending && !recipes?.length} type="vertical" />
            {recipes?.slice(7, 15).map((item) => (
              <div className="col-12 col-md-4 col-lg-3 mb-4 reveal-item" key={item?._id}>
                <RecipeCard recipe={item} type="a" />
              </div>
            ))}
          </div>
        </div>

        <div className="container-xl py-5">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div className="fs-2 fw-bold">Top Restaurants</div>
            <Link className="primary_color fs-6" to={PATHNAMES.RESTAURANTS}>
              See All <FaArrowRight className="fa fa-arrow-right ml-3" />
            </Link>
          </div>
          <div className="row">
            <Loader isLoading={recipeQuery.isPending && !recipes?.length} type="vertical" />
            {restaurants?.slice(0, 4).map((item) => (
              <div className="col-12 col-md-4 col-lg-3 mb-4 reveal-item" key={item._id}>
                <RestaurantCard restaurant={item} />
              </div>
            ))}
          </div>
        </div>
      </main>
    </React.Fragment>
  );
};

export default HomePage;
