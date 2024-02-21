import { useEffect } from "react";

export default function useKey(key, action) {
  useEffect(() => {
    function escape(e) {
      if (e.code.toLowerCase() === key.toLowerCase()) action();
    }
    document.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("keydown", escape);
    };
  }, [action, key]);
}
