import React from "react";
function Hero() {
  return (
    <div className="yellowbackground top-20">
      <div className="flex font-poppins justify-between wrapper items-center bg-yellow-400  py-10 lg:py-0">
        <div className="px-10 space-y-5">
          <h1 className="text-6xl capitalize max-w-xl font-serif">
            <span className="underline decoration-black decoration-4">
              medium
            </span>{" "}
            is a place to write, read, and connect
          </h1>
          <h2 className="text-lg max-w-lg">
            its easy and free to posr your thinking on any topic and connect
            with millions of readers
          </h2>
        </div>
        <img
          className="hidden md:inline-flex h-64 lg:h-full"
          src="https://iconape.com/wp-content/png_logo_vector/medium-m.png"
          alt=""
        />
      </div>
    </div>
  );
}

export default Hero;
