import { Link, NavLink } from "react-router-dom";

interface NavItem {
  to: string;
  label: string;
}

const NAV_ITEMS: NavItem[] = [
  { to: "/", label: "Champions" },
  { to: "/favorites", label: "Favorites" },
  { to: "/items", label: "Items" },
];

function NavBar() {
  return (
    <header className="navbar">
      <Link to="/" className="navbar__brand">
        RiftRoster
      </Link>
      <nav>
        <ul className="navbar__links">
          {NAV_ITEMS.map((item) => (
            <li key={item.to}>
              {/* `end` keeps "/" from staying active on every other page. */}
              <NavLink to={item.to} end={item.to === "/"} className="navbar__link">
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

export default NavBar;
