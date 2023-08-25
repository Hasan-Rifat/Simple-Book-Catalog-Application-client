import React from "react";
import { Link } from "react-router-dom";

type BannerProps = {};

const Banner: React.FC<BannerProps> = () => {
  return (
    <section className="bg-[#fff6f7]">
      <div className="max-w-[1200px] mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
        <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left items-center text-center">
          <h1 className="title-font text-7xl mb-4  text-[#161619] font-bold">
            February
          </h1>
          <p className="mb-8 leading-relaxed  text-5xl text-[#161619]">
            Featured Books of the
          </p>
          <div className="flex justify-center">
            <Link
              to={"/all-book"}
              className="inline-flex text-white bg-black border-0 py-2 px-6 focus:outline-none rounded text-lg uppercase"
            >
              see more
            </Link>
          </div>
        </div>
        <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
          <img
            className="object-cover object-center rounded"
            alt="hero"
            src="https://bookworm.madrasthemes.com/wp-content/uploads/2020/08/img1-12.png"
          />
        </div>
      </div>
    </section>
  );
};
export default Banner;
