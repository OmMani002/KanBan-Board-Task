import "./Modal.css";
import React, { Children, useEffect, useRef } from "react";
export default function Modal({ open = false, setOpen, children }) {
  const modelRef = useRef();

  useEffect(() => {
    const handler = (event) => {
      if (!modelRef.current) {
        return;
      }
      if (!modelRef.current.contains(event.target)) {
        event.stopPropagation();
        // console.log(modelRef.current);
        // console.log(event.target);
        setOpen(false);
      }
    };
    // the key is using the `true` option
    // `true` will enable the `capture` phase of event handling by browser
    document.addEventListener("click", handler, true);
    return () => {
      document.removeEventListener("click", handler);
    };
  }, []);

  return (
    <>
      {open && (
        <div className="modal">
          <div className="modal-content" ref={modelRef}>
            {children}
          </div>
        </div>
      )}
    </>
  );
}
