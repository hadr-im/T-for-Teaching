import { Link } from "react-router-dom";

/**
 * The apply call to action: a link, not a button. Shared by the hero, the
 * navbar and the placements card so the three can never drift apart.
 *
 * The default icon is a mortarboard, tossed on hover — graduates throw
 * their caps, so the gesture is already the right one, and it echoes the
 * cap sitting on the `t` in the T for Teaching mark.
 */

/* Exported so the submit button on the register page can use the same
   cap rather than inlining its own copy — a duplicated icon is how the
   old plane survived the whole retheme. */
export const ICONS = {
  cap: (
    <svg className="link-apply__icon" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 3 1 9l11 6 9-4.91V17h2V9z" />
      <path d="M5 13.18v4L12 21l7-3.82v-4L12 17z" />
    </svg>
  ),
  arrow: (
    <svg
      className="link-apply__icon"
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 12h15M13 5.5 19.5 12 13 18.5" />
    </svg>
  ),
  back: (
    <svg
      className="link-apply__icon"
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 12H5M11 5.5 4.5 12 11 18.5" />
    </svg>
  ),
};

export default function ApplyLink({
  label = "Apply now",
  icon = "cap",
  to = "/register",
  className = "",
  iconFirst = false,
  onClick,
}) {
  const track = (
    <span className={`link-apply__track link-apply__track--${icon}`} aria-hidden="true">
      {ICONS[icon] || ICONS.cap}
    </span>
  );
  const text = <span className="link-apply__label">{label}</span>;

  const inner = iconFirst ? (
    <>
      {track}
      {text}
    </>
  ) : (
    <>
      {text}
      {track}
    </>
  );

  const classes = `link-apply ${className}`;

  // An in-page anchor is not a route — router <Link> would try to
  // navigate to a path called "#opportunities".
  if (to.startsWith("#")) {
    return (
      <a href={to} className={classes} onClick={onClick}>
        {inner}
      </a>
    );
  }

  return (
    <Link to={to} className={classes} onClick={onClick}>
      {inner}
    </Link>
  );
}
