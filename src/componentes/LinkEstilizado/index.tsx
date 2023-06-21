import { NavLink } from "react-router-dom";
import { ReactElement } from "react";

interface LinksProps {
  url: string;
  children: ReactElement | string;
  style: string;
  target?: string;
  recolherMenu?: () => void;
}

export default function LinkEstilizado({
  url,
  children,
  style,
  target,
  recolherMenu,
}: LinksProps) {
  return (
    <NavLink onClick={recolherMenu} to={url} className={style} target={target}>
      {children}
    </NavLink>
  );
}
