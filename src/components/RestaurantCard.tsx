import { RestaurantProps } from "../types/types";
import { Link } from "react-router-dom";
import { FaMapMarkerAlt } from "react-icons/fa";

const RestaurantCard = ({ restaurant }: { restaurant: RestaurantProps }) => {
  return (
    <Link style={{ color: "inherit", textDecoration: "none" }} to={"#"}>
      <img
        className="mb-3"
        style={{ width: "100%", height: "200px", objectFit: "cover" }}
        src={restaurant.imageURL}
        alt={restaurant.name}
      />
      <div>
        <div className="fs-5 fw-bold">{restaurant.name}</div>
        <div>
          <FaMapMarkerAlt className="fa fa-map-marker primary_color fs-6" />
          <small className="text-secondary">{restaurant.location}</small>
        </div>
      </div>
    </Link>
  );
};

export default RestaurantCard;
