import Image from "next/image";
import { AnimatePresence, motion as m } from "framer-motion";
import { NavLink } from "@/components/NavLink";

const Navbar = () => {
  const navItems = [
    {
      pageName: "home",
      path: "/",
      iconSrc: "/icons/home-icon.png",
    },
    {
      pageName: "gallary",
      path: "/gallary",
      iconSrc: "/icons/gallary-icon.png",
    },
  ];
  return (
    <AnimatePresence>
      <m.nav
        className="navbar"
        initial={{ y: "20vh" }}
        animate={{ y: 0 }}
        transition={{ delay: 0.7 }}
      >
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            href={item.path}
            className="nav-item aspect-square block relative"
          >
            <Image
              height={100}
              width={100}
              alt={item.pageName}
              src={item.iconSrc}
              className="h-full"
            />
          </NavLink>
        ))}
      </m.nav>
    </AnimatePresence>
  );
};

export default Navbar;
