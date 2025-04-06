import React from "react";
import { RecipeProps } from "../types/types";
import { Link } from "react-router-dom";
import PATHNAMES from "../constants/pathnames";

const RecipeCard = ({ recipe, type = "a" }: { recipe: RecipeProps; type: "a" | "b" }) => {
  if (type === "a") {
    return (
      <Link style={{ color: "inherit", textDecoration: "none" }} className="" to={`${PATHNAMES.RECIPES}/${recipe._id}`}>
        <img
          className="mb-3"
          style={{ width: "100%", height: "200px", objectFit: "cover" }}
          src={recipe.imageURL}
          alt={recipe.name}
        />
        <div>
          <div className="fs-5 fw-bold">{recipe.name}</div>
          <div>
            <small className="text-secondary">{recipe.categories.join(", ")}</small>
          </div>
          <div>
            <small className="text-secondary">{recipe.calories} calories</small>
          </div>
        </div>
      </Link>
    );
  }
  return (
    <Link
      style={{ color: "inherit", textDecoration: "none" }}
      className="d-flex gap-3"
      to={`${PATHNAMES.RECIPES}/${recipe._id}`}
    >
      <img style={{ width: "120px", height: "100px", objectFit: "cover" }} src={recipe.imageURL} alt={recipe.name} />
      <div>
        <div>
          <small className="text-secondary">{recipe.categories.join(", ")}</small>
        </div>
        <div>
          <small className="text-secondary">{recipe.calories} calories</small>
        </div>
        <div className="fs-5 fw-bold">{recipe.name}</div>
      </div>
    </Link>
  );
};

export default RecipeCard;
