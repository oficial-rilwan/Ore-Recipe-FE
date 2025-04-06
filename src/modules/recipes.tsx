import { useQuery } from "@tanstack/react-query";
import React from "react";
import recipeRepo from "../repo/recipe.repo";
import { useLocation } from "react-router-dom";
import Header from "../components/Header";
import { RecipeProps } from "../types/types";
import RecipeCard from "../components/RecipeCard";
import { Loader } from "../components/Loader";

const Recipes = () => {
  const searchParams = new URLSearchParams(useLocation().search);
  const searchTerm = searchParams.get("search");

  const query = useQuery({
    queryKey: ["recipes", searchTerm],
    queryFn: () => recipeRepo.find({ search: searchTerm }),
  });

  const recipes = query?.data?.data?.data as RecipeProps[];

  return (
    <React.Fragment>
      <Header />
      <main>
        <div className="container-xl py-5">
          <div className="fs-5 mb-4">
            Search results for: <span className="fs-3 fw-bold">{searchTerm}</span>
          </div>
          {!recipes?.length && searchTerm ? (
            <div className="py-5">
              <div className="text-center fw-bold fs-3">0 results found for your search.</div>
              <div className="fw-medium fs-6 text-center">Please try another search term</div>
            </div>
          ) : null}

          <div className="row">
            <Loader isLoading={query.isPending && !recipes?.length} type="vertical" />
            {recipes?.map((item) => (
              <div className="col-12 col-md-4 col-lg-3 mb-5 reveal-item" key={item?._id}>
                <RecipeCard recipe={item} type="a" />
              </div>
            ))}
          </div>
        </div>
      </main>
    </React.Fragment>
  );
};

export default Recipes;
