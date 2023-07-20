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
  const { startDeletingCourse, setActiveCourse, startSavingCourse } =
    useCoursesStore();
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
    setFlcChecked(course.flc);
    setFrequentChecked(course.frequent);
  }, []);

  return (
    <ListItem
      sx={{
        py: 0 /* py: -2 */,
        border: 1,
        borderRadius: 2,
        color: "grey",
        mb: 0.5,
      }}
    >
      <ListItemText onClick={handleTitleChange}>{course.title}</ListItemText>
      <Checkbox
        /* sx={{ bgcolor: "red" }} */
        onChange={handleFlcChange}
        /* onChange={handleCheckboxChange} */
        checked={flcChecked}
        /*  checked={checkboxChecked} */
        name="flc"
        disabled
      />
      <Checkbox
        onChange={handleFrequentChange}
        /* onChange={handleCheckboxChange} */
        checked={frequentChecked}
        /* checked={checkboxChecked} */
        name="frequent"
        disabled
      />
      <IconButton
        onClick={onDeleteItem}
        // sx={{ visibility: course.title === "SIN CURSO" ? "hidden" : "" }}
        disabled
      >
        <DeleteIcon />
      </IconButton>
    </ListItem>
  );
};
