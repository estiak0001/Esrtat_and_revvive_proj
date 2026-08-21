import { Link } from "react-router-dom";

const variants = {
  primary:
    "bg-amber-400 text-navy-950 hover:bg-amber-300 shadow-soft hover:shadow-lg",
  outline:
    "border-2 border-white/70 text-white hover:bg-white hover:text-navy-900",
  ghost:
    "border-2 border-navy-800 text-navy-800 hover:bg-navy-800 hover:text-white",
};

export default function Button({
  to,
  href,
  onClick,
  type = "button",
  variant = "primary",
  className = "",
  children,
}) {
  const classes = `inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 font-display font-semibold text-sm tracking-wide transition-all duration-300 ${variants[variant]} ${className}`;

  if (to) {
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
