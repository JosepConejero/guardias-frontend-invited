import { useCallback, useEffect } from "react";
import "./basicModal.css";
import { BasicModalProps } from "../../../interfaces/basicModalProps";

export const BasicModal = ({
  isOpen,
  closeModal,
  children,
}: BasicModalProps): JSX.Element => {
  const keyPress = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        closeModal();
      }
    },
    [closeModal, isOpen]
  );

  const onHandleClick = (
    //  event: MouseEvent<HTMLElement> & { target: EventTarget & HTMLElement }
    //event: MouseEvent<HTMLButtonElement | HTMLAnchorElement>
    //event: ChangeEvent<HTMLInputElement>
    event: any ///any
  ): void => {
    if (JSON.stringify(event.target.innerHTML).includes("modal-central"))
      closeModal();
  };

  // const handleKeyEvent = (event:KeyboardEvent<HTMLElement>): void => {)

  useEffect(() => {
    document.addEventListener("keydown", keyPress);
    return () => document.removeEventListener("keydown", keyPress);
  }, [keyPress]);

  //if (isOpen)
  return (
    <>
      {isOpen && (
        <div onMouseDown={onHandleClick} id="modal-fondo" className="darkBG">
          <div id="modal-central" className="centered">
            <div className="modal">
              <div>{children}</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
