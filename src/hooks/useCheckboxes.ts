import { useState } from "react";

interface UseCheckBoxesReturnTypes {
  checkedCheckbox: boolean;
  setCheckedCheckbox: () => void;
  onHandleClick: () => void;
}

export const useCheckboxes = (initialValue: boolean) => {
  const [checkedCheckbox, setCheckedCheckbox] = useState<boolean>(initialValue);

  const onHandleClick = (): void => {
    setCheckedCheckbox(!checkedCheckbox);
  };

  return {
    checkedCheckbox,
    setCheckedCheckbox,
    onHandleClick,
  } as UseCheckBoxesReturnTypes;
};
