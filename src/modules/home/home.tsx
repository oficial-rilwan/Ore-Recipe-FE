import React from "react";
import { Helmet } from "react-helmet";

const HomePage = () => {
  return (
    <React.Fragment>
      <Helmet>
        <meta charSet="utf-8" />
        <title>My Title</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
    </React.Fragment>
  );
};

export default HomePage;
