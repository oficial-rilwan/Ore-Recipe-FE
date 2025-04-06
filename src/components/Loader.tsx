import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const CardLoader = ({ type }: { type: "horizontal" | "vertical" }) => {
  if (type === "horizontal") {
    return (
      <div className="d-flex align-items-center gap-4 w-100">
        <Skeleton style={{ width: "120px", height: "100px" }} />
        <div className="w-100">
          <Skeleton count={4} />
        </div>
      </div>
    );
  }
  return (
    <div>
      <Skeleton style={{ width: "100%", height: "200px" }} />
      <div className="mt-3">
        <Skeleton count={3} />
      </div>
    </div>
  );
};

export function Loader({ type, isLoading }: { type: "horizontal" | "vertical"; isLoading: boolean }) {
  if (!isLoading) return null;
  if (type === "horizontal") {
    return (
      <React.Fragment>
        <div className="col-12 col-md-6 col-lg-4 mb-4 reveal-item">
          <CardLoader type="horizontal" />
        </div>
        <div className="col-12 col-md-6 col-lg-4 mb-4 reveal-item">
          <CardLoader type="horizontal" />
        </div>
        <div className="col-12 col-md-6 col-lg-4 mb-4 reveal-item">
          <CardLoader type="horizontal" />
        </div>
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      <div className="col-12 col-md-4 col-lg-3 mb-4 reveal-item">
        <CardLoader type="vertical" />
      </div>
      <div className="col-12 col-md-4 col-lg-3 mb-4 reveal-item">
        <CardLoader type="vertical" />
      </div>
      <div className="col-12 col-md-4 col-lg-3 mb-4 reveal-item">
        <CardLoader type="vertical" />
      </div>
      <div className="col-12 col-md-4 col-lg-3 mb-4 reveal-item">
        <CardLoader type="vertical" />
      </div>
    </React.Fragment>
  );
}

export default CardLoader;
