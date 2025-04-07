import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useLocation } from "react-router-dom";
import restaurantsRepo from "../repo/restaurants.repo";
import { RestaurantProps, SearchHistoryProps } from "../types/types";
import RestaurantCard from "../components/RestaurantCard";
import Header from "../components/Header";
import IMAGES from "../constants/images";
import { Loader } from "../components/Loader";

const Restaurants = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchTerm = searchParams.get("search");

  React.useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [location.pathname]);

  const query = useQuery({
    queryKey: ["restaurants", searchTerm],
    queryFn: () => restaurantsRepo.find({ search: searchTerm }),
  });

  const restaurants = query?.data?.data?.data as RestaurantProps[];

  return (
    <React.Fragment>
      <Header />
      <main>
        {restaurants?.length && !searchTerm ? (
          <div className="banner">
            <img
              style={{ width: "100%", height: "300px", objectFit: "cover" }}
              src={IMAGES.RESTAURANT_BANNER}
              alt="Main Banner"
            />
          </div>
        ) : null}
        <div className="container-xl py-5">
          {!searchTerm ? null : (
            <div className="fs-5 mb-4">
              Search results for: <span className="fs-3 fw-bold">{searchTerm}</span>
            </div>
          )}
          {!restaurants?.length && searchTerm ? (
            <div className="py-5">
              <div className="text-center fw-bold fs-3">0 results found for your search.</div>
              <div className="fw-medium fs-6 text-center">Please try another search term</div>
            </div>
          ) : null}
          {searchTerm ? null : (
            <div className="d-flex justify-content-between align-items-center">
              <div className="fs-2 fw-bold mb-4">Top Restaurants</div>
            </div>
          )}

          <div className="row">
            <Loader isLoading={query.isPending && !restaurants?.length} type="vertical" />
            {restaurants?.map((item) => (
              <div className="col-12 col-md-4 col-lg-3 mb-5 reveal-item" key={item?._id}>
                <RestaurantCard restaurant={item} />
              </div>
            ))}
          </div>
        </div>
      </main>
    </React.Fragment>
  );
};

export default Restaurants;
