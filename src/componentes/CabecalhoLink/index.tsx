import { Link } from "react-router-dom";
import { ReactElement } from "react";

interface LinksProps {
  url: string;
  children: ReactElement | string;
  style: string;
}

export default function CabecalhoLink({ url, children, style }: LinksProps) {
  return (
    <Link to={url} className={style}>
      {children}
    </Link>
  );
}
