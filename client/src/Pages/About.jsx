import React from "react";

function About() {
  return (
    <div className="flex flex-col items-center  h-screen bg-gray-100">
      <h1 className="text-3xl text-red-400 font-bold mt-10 "> ABOUT PAGE </h1>
      <div className="max-w-2xl mx-auto mt-3 p-5 bg-white shadow-lg rounded-lg">
        <p className="text-lg text-gray-950 font-semibold mt-4">
          The About page of this application provides an overview of the
          technologies and architecture used in the development process. The
          backend is powered by Express.js, which handles API requests and
          communicates with the MongoDB database to store and retrieve data. On
          the frontend, React.js is used to build dynamic and interactive user
          interfaces, while Redux is implemented for efficient and centralized
          state management across components. To ensure secure access and user
          identity verification, the application uses JWT (JSON Web Tokens) for
          authentication. This full-stack approach offers a robust, scalable,
          and secure web application designed to deliver a seamless user
          experience. experience.
          <br /> <br />
        </p>
      </div>
    </div>
  );
}

export default About;
