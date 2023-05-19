/* eslint-disable react-hooks/exhaustive-deps */
import { Checkbox, IconButton, ListItem, ListItemText } from "@mui/material";
import { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { useCoursesStore } from "../../hooks/useCoursesStore";
import { useUiStore } from "../../hooks/useUiStore";

export const ListItemCourses = ({ course }) => {
  const { openCourseModal } = useUiStore();
  const [flcChecked, setFlcChecked] = useState(true);
  const [frequentChecked, setFrequentChecked] = useState(true);
  const { startDeletingCourse, setActiveCourse, startSavingCourse } =
    useCoursesStore();

  const handleTitleChange = () => {
    setActiveCourse(course);
    openCourseModal();
  };

  const handleFlcChange = async (event) => {
    setFlcChecked(event.target.checked);
    await startSavingCourse({ ...course, flc: event.target.checked });
  };

  const handleFrequentChange = async (event) => {
    setFrequentChecked(event.target.checked);
    await startSavingCourse({ ...course, frequent: event.target.checked });
  };

  const onDeleteItem = () => {
    startDeletingCourse(course);
  };

  useEffect(() => {
    setFlcChecked(course.flc);
    setFrequentChecked(course.frequent);
  }, []);

  return (
    <ListItem>
      <ListItemText onDoubleClick={handleTitleChange}>
        {course.title}
      </ListItemText>
      <Checkbox onChange={handleFlcChange} checked={flcChecked} />
      <Checkbox onChange={handleFrequentChange} checked={frequentChecked} />
      <IconButton onClick={onDeleteItem}>
        <DeleteIcon />
      </IconButton>
    </ListItem>
  );
};
