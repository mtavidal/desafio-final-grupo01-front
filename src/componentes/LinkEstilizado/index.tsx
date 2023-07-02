import { NavLink } from "react-router-dom";

interface LinksProps {
  url: string;
  children: React.ReactNode | string;
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
