import { useRouter } from "next/router";
import Link from "next/link";
import PropTypes from "prop-types";
import { motion as m } from "framer-motion";

export { NavLink };

NavLink.propTypes = {
  href: PropTypes.string.isRequired,
  exact: PropTypes.bool,
};

NavLink.defaultProps = {
  exact: false,
};

function NavLink({ href, exact, children, ...props }) {
  const { pathname } = useRouter();
  const isActive = exact
    ? pathname === href
    : pathname
        .replace(/^\/(.+)/, "$1")
        .startsWith(href.replace(/^\/(.+)/, "$1"));

  if (isActive) {
    props.className += " active";
  }

  return (
    <Link
      href={href}
      {...props}
      onClick={(e) => {
        isActive && e.preventDefault();
      }}
    >
      {isActive ? (
        <m.div
          transition={{
            type: "tween",
            ease: "easeOut",
            duration: 0.4,
          }}
          className="nav-act-ind"
          layoutId="nav-act-ind"
        ></m.div>
      ) : (
        ""
      )}
      {children}
    </Link>
  );
}
