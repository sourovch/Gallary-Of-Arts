import Image from "next/image";
import { AnimatePresence, motion as m } from "framer-motion";
import { NavLink } from "@/components/NavLink";

const Navbar = () => {
  return (
    <AnimatePresence>
      <m.nav className="navbar">
        <NavLink href={"/"} className="nav-item aspect-square block">
          <Image
            height={100}
            width={100}
            alt="home"
            src={"/icons/home-icon.png"}
            className="h-full"
          />
        </NavLink>
        <NavLink href={"/gallary"} className="nav-item aspect-square block">
          <Image
            height={100}
            width={100}
            alt="home"
            src={"/icons/gallary-icon.png"}
            className="h-full"
          />
        </NavLink>
      </m.nav>
    </AnimatePresence>
  );
};

export default Navbar;
