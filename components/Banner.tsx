const Banner = () => {
  return (
    <div className="flex flex-col lg:flex-row md:space-x-5 justify-between font-bold px-4 lg:px-10 py-5 mb-10">
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl lg:text-7xl">Techgix</h1>
        <h2 className="mt-5 md:mt-0">
          Welcome to{" "}
          <span className="underline decoration-4 decoration-[#f7ab0a] ">
            Every Techies
          </span>{" "}
          favourite blog in the techmostphere
        </h2>
      </div>
      <p className="mt-5 md:mt-2 text-gray-400 max-400 max-w-sm">
        New product features | The latest in technology | The weekly tech gist
        loader & More!
      </p>
    </div>
  );
};

export default Banner;
