/* Third-party ****************************************************************/
import { NavLink, Link } from "react-router-dom";

/* Styles *********************************************************************/
import "../styles/components/Header.scss";

/* Component FNC **************************************************************/
export default function Header(): JSX.Element {
  const navLinksName = ["users", "animals"] as const;

  /* Jsx **********************************************************************/
  return (
    <div className="header">
      <div className="header__content">
        <Link to="/" className="header__title">
          React table app
        </Link>
        <ul className="header__navlink-list">
          {navLinksName.map((item) => {
            return (
              <NavLink
                to={`/${item}`}
                key={item}
                className={({ isActive }) => `header__navlink ${isActive ? "header__navlink--is-active" : ""}`}
              >
                <span className="header__navlink-text">{item}</span>
              </NavLink>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
