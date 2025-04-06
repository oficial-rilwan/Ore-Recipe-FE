import React from "react";
import Header from "../components/Header";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import recipeRepo from "../repo/recipe.repo";
import { RecipeProps } from "../types/types";
import RecipeCard from "../components/RecipeCard";
import { OverlayTrigger, Popover } from "react-bootstrap";
import { Loader } from "../components/Loader";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import NotFound from "./404";

const Recipe = () => {
  const { id } = useParams();

  React.useEffect(() => {
    window.scroll(0, 0);
  }, [id]);

  const query = useQuery({
    queryKey: ["recipe", id],
    queryFn: () => recipeRepo.get(id),
  });

  const recipesQuery = useQuery({
    queryKey: ["recipes"],
    queryFn: () => recipeRepo.find(),
  });

  const recipe = query?.data?.data as RecipeProps;
  const recipes = recipesQuery?.data?.data?.data as RecipeProps[];

  if (query.isPending) {
    return <LoaderIndicator />;
  }

  if (!query.isPending && !recipe) {
    return <NotFound title="404 Recipe Not Found" />;
  }

  return (
    <React.Fragment>
      <Header />
      <main>
        <div className="container-xl">
          <div className="row mb-5">
            <div className="col-12 col-md-6">
              <img style={{ width: "100%", height: "auto" }} src={recipe?.imageURL} alt={recipe?.name} />
            </div>
            <div className="col-12 col-md-6">
              <div className="fw-bold fs-2 mb-3">{recipe?.name}</div>
              <div className="fw-bold">Ingredients:</div>
              <ul className="mb-3">
                {recipe?.ingredients?.map((item) => (
                  <li key={item.name}>
                    {item.quantity} {item.name} at <span>₦{item.price.toLocaleString()}</span>
                  </li>
                ))}
              </ul>

              <div className="mb-5">
                <span className="fw-bold">Calories:</span> {recipe?.calories}
              </div>
              <div className="d-flex align-items-center gap-3">
                <div className="d-flex align-items-center">
                  <span className="fw-bold">Total: </span>{" "}
                  <span className="fw-bold primary_color fs-4"> ₦{recipe?.price.toLocaleString()}</span>
                </div>
                <OverlayTrigger
                  trigger="click"
                  placement="right"
                  overlay={
                    <Popover id="popover-basic">
                      <Popover.Header as="h3">Price in USD</Popover.Header>
                      <Popover.Body>${recipe?.USDPrice.toLocaleString()}</Popover.Body>
                    </Popover>
                  }
                >
                  <button type="button" className="btn btn-sm btn-success">
                    <small>Click to see USD</small>
                  </button>
                </OverlayTrigger>
              </div>
            </div>
          </div>
        </div>
        <div className="container-xl py-5">
          <div className="fs-2 fw-bold mb-4">Trending Now</div>
          <div className="row">
            <Loader isLoading={query.isPending && !recipes?.length} type="horizontal" />

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
            <Loader isLoading={query.isPending && !recipes?.length} type="vertical" />
            {recipes?.slice(7, 15).map((item) => (
              <div className="col-12 col-md-4 col-lg-3 mb-4 reveal-item" key={item?._id}>
                <RecipeCard recipe={item} type="a" />
              </div>
            ))}
          </div>
        </div>
      </main>
    </React.Fragment>
  );
};

function LoaderIndicator() {
  return (
    <React.Fragment>
      <Header />
      <div className="container">
        <div className="row mb-5">
          <div className="col-12 col-md-6">
            <Skeleton style={{ width: "100%", height: "300px" }} />
          </div>
          <div className="col-12 col-md-6">
            <Skeleton style={{ height: "50px" }} className="mb-3" />
            <Skeleton count={4} />
          </div>
        </div>
        <div className="row mb-5">
          <Loader isLoading type="horizontal" />
        </div>
        <div className="row mb-5">
          <Loader isLoading type="vertical" />
        </div>
      </div>
    </React.Fragment>
  );
}

export default Recipe;
