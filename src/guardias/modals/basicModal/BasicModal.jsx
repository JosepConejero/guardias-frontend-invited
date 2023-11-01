import { useCallback, useEffect } from "react";
import "./basicModal.css";

export const BasicModal = ({ isOpen, closeModal, children }) => {
  const keyPress = useCallback(
    (event) => {
      if (event.key === "Escape" && isOpen) {
        closeModal();
      }
    },
    [closeModal, isOpen]
  );

  const onHandleClick = (event) => {
    if (JSON.stringify(event.target.innerHTML).includes("modal-central"))
      closeModal();
  };

  useEffect(() => {
    document.addEventListener("keydown", keyPress);
    return () => document.removeEventListener("keydown", keyPress);
  }, [keyPress]);

  if (isOpen)
    return (
      <div onMouseDown={onHandleClick} id="modal-fondo" className="darkBG">
        <div id="modal-central" className="centered">
          <div className="modal">
            <div>{children}</div>
          </div>
        </div>
      </div>
    );
};
