import Link from "next/link";

const Header = () => {
  return (
    <header className="flex justify-between items-center space-x-2 font-bold px-4 lg:px-10 py-5">
      <div className="flex  items-center space-x-2">
        <Link href="/">
          <img
            src="/logo.svg"
            height={50}
            width={50}
            alt="logo"
            className="rounded-full"
          />
        </Link>
        <h1 className="">Techgix</h1>
      </div>
      <div>
        <Link
          target="_blank"
          rel="no-referer"
          className="px-5 hidden py-3 text-sm md:text-base bg-gray-900 text-[#f7ab0a] lg:flex items-center rounded-full text-center"
          href="https://www.facebook.com/profile.php?id=100090082942228"
        >
          Join our Community
        </Link>
        <Link
          target="_blank"
          rel="no-referer"
          className="px-5 py-3 lg:hidden text-sm md:text-base bg-gray-900 text-[#f7ab0a] flex items-center rounded-full text-center"
          href="https://www.facebook.com/profile.php?id=100090082942228"
        >
          community
        </Link>
      </div>
    </header>
  );
};

export default Header;
