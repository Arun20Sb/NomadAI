import React from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const PageNotFound = () => {
  return (
    <div
      className="flex flex-col items-center justify-center inset-0 bg-gradient-to-br from-gray-800 to-black text-white"
      style={{ height: "calc(100vh - 5.15rem)", overflow: "hidden" }}
    >
      <h1 className="text-9xl font-extrabold tracking-widest text-red-500">
        404
      </h1>
      <div className="bg-red-500 px-4 py-2 text-sm rounded rotate-12 absolute">
        Oops!
      </div>
      <p className="mt-5 text-xl text-gray-300">
        We couldn't find the page you were lookin for fr
      </p>
      <Link
        to="/"
        className="mt-8 px-6 py-3 bg-gray-950 text-white font-medium text-lg rounded shadow-md hover:shadow-lg hover:bg-gray-900 transition-all flex gap-2"
      >
        <span>
          <FaArrowLeft />
        </span>
        <span>Go Back Home</span>
      </Link>
    </div>
  );
};

export default PageNotFound;
