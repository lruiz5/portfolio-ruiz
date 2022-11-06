import Link from "next/link";

const Header = () => {
  return (
    <>
      <Link href={"/"}>Home</Link>
      <Link href={"/about"}>About</Link>
      <Link href={"/portfolios"}>Portfolios</Link>
      <Link href={"/blogs"}>Blogs</Link>
      <Link href={"/cv"}>CV</Link>
    </>
  );
};

export default Header;
