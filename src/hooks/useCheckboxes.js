import { useState } from "react";

export const useCheckboxes = (initialValue) => {
  const [checkedCheckbox, setCheckedCheckbox] = useState(initialValue);

  const onHandleClick = () => {
    setCheckedCheckbox(!checkedCheckbox);
  };

  return {
    checkedCheckbox,
    setCheckedCheckbox,
    onHandleClick,
  };
};
