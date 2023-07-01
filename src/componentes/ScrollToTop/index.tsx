import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    toast.dismiss();
  }, [pathname]);

  return null;
}
