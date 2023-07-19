/* eslint-disable react-hooks/exhaustive-deps */
import { Checkbox, IconButton, ListItem, ListItemText } from "@mui/material";
import { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { useCoursesStore } from "../../hooks/useCoursesStore";
import { useUiStore } from "../../hooks/useUiStore";
//import { useCheckbox } from "../../hooks/useCheckbox";

export const ListItemCourses = ({ course }) => {
  const { openCourseModal } = useUiStore();
  const [flcChecked, setFlcChecked] = useState(true);
  const [frequentChecked, setFrequentChecked] = useState(true);
  const {
    startDeletingCourse,
    setActiveCourse,
    startSavingCourse,
    // handleCheckboxChange,
    // setCheckboxChecked,
    // checkboxChecked,
  } = useCoursesStore();
  //const { checkboxValues } = useCheckbox(course); ////

  const handleTitleChange = () => {
    setActiveCourse(course);
    openCourseModal();
  };

  const handleFlcChange = async (event) => {
    setFlcChecked(event.target.checked);
    //await startSavingCourse({ ...course, flc: event.target.checked });
    await startSavingCourse({
      ...course,
      [event.target.name]: event.target.checked,
    });
  };

  const handleFrequentChange = async (event) => {
    setFrequentChecked(event.target.checked);
    //await startSavingCourse({ ...course, frequent: event.target.checked });
    await startSavingCourse({
      ...course,
      [event.target.name]: event.target.checked,
    });
  };

  const onDeleteItem = () => {
    startDeletingCourse(course);
  };

  useEffect(() => {
    // setCheckboxChecked(course.flc);
    // setCheckboxChecked(course.frequent);
    setFlcChecked(course.flc);
    setFrequentChecked(course.frequent);
  }, []);

  return (
    <ListItem>
      <ListItemText onDoubleClick={handleTitleChange}>
        {course.title}
      </ListItemText>
      <Checkbox
        /* sx={{ bgcolor: "red" }} */
        onChange={handleFlcChange}
        /* onChange={handleCheckboxChange} */
        checked={flcChecked}
        /*  checked={checkboxChecked} */
        name="flc"
      />
      <Checkbox
        onChange={handleFrequentChange}
        /* onChange={handleCheckboxChange} */
        checked={frequentChecked}
        /* checked={checkboxChecked} */
        name="frequent"
      />
      <IconButton
        onClick={onDeleteItem}
        sx={{ visibility: course.title === "SIN CURSO" ? "hidden" : "" }}
      >
        <DeleteIcon />
      </IconButton>
    </ListItem>
  );
};
