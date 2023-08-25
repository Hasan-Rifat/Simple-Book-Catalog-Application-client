import React from "react";
import Banner from "../components/Home/Banner";
import AllBook from "../components/Home/AllBook";

type HomeProps = {};

const Home: React.FC<HomeProps> = () => {
  return (
    <>
      <Banner />
      <AllBook />
    </>
  );
};
export default Home;
