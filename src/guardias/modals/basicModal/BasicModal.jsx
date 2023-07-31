import { useCallback, useEffect } from "react";
import "./basicModal.css";

export const BasicModal = ({ isOpen, closeModal, children }) => {
  const keyPress = useCallback(
    (event) => {
      if (event.key === "Escape" && isOpen) {
        closeModal();
      }
    },
    [closeModal, isOpen] /* [setIsOpen, isOpen] */ //igual se podría quitar closeModal y no pasaría nada
  );

  const onHandleClick = (event) => {
    //console.log(event);
    if (JSON.stringify(event.target.innerHTML).includes("modal-central"))
      closeModal();
  };

  useEffect(() => {
    document.addEventListener("keydown", keyPress);
    return () => document.removeEventListener("keydown", keyPress);
  }, [keyPress]);

  if (isOpen)
    return (
      <div
        onMouseDown={onHandleClick}
        /* onClick={onHandleClick} */ id="modal-fondo"
        className="darkBG"
      >
        <div id="modal-central" className="centered">
          <div className="modal">
            {/*  <div className="modalContent">{children}</div> */}
            <div>{children}</div>
          </div>
        </div>
      </div>
    );
};
