import { NavLink } from "react-router-dom";
import { ReactElement } from "react";

interface LinksProps {
  url: string;
  children: ReactElement | string;
  style: string;
  target?: string;
}

export default function LinkEstilizado({
  url,
  children,
  style,
  target,
}: LinksProps) {
  return (
    <NavLink to={url} className={style} target={target}>
      {children}
    </NavLink>
  );
}
