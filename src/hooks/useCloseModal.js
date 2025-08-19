import { useRef, useEffect } from "react";

function useCloseModal(close) {
    const ref = useRef();
     useEffect(
        function () {
          function handleClick(e) {
            if (ref.current && !ref.current.contains(e.target)) {
              console.log("Click Outside");
              close();
            }
          }
          document.addEventListener("click", handleClick, true);
          return () => document.removeEventListener("click", handleClick, true);
        },
        [close]
      );
  return ref;
}

export default useCloseModal;