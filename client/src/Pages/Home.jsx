import React from "react";

function Home() {
  return (
    <div className="flex flex-col items-center  h-screen bg-gray-100">
      <h1 className="text-3xl text-red-400 mt-10 font-bold "> USER HOME </h1>
    <div className="max-w-2xl mx-auto mt-3 p-5 bg-white shadow-lg rounded-lg">
    <p className="text-lg text-gray-950 font-semibold mt-4">
        This web application's homepage is built using the MERN stack, combining
        MongoDB for the database, Express.js for the backend server, and
        React.js for the frontend interface. State management across the React
        components is handled efficiently using the Redux library, ensuring
        smooth data flow and predictable state updates. For secure user
        authentication, the application implements JSON Web Tokens (JWT),
        allowing protected routes and user sessions to be managed safely and
        reliably. This combination of technologies provides a modern, full-stack
        JavaScript solution that delivers a responsive and scalable user
        experience.
        <br /> <br />
      </p>
    </div>
    </div>
  );
}

export default Home;
