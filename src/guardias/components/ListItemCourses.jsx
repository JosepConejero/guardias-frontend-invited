/* eslint-disable react-hooks/exhaustive-deps */
import { Checkbox, IconButton, ListItem, ListItemText } from "@mui/material";
import { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { useCoursesStore } from "../../hooks/useCoursesStore";

export const ListItemCourses = ({ course }) => {
  const [flcChecked, setFlcChecked] = useState(true);
  const [frequentChecked, setFrequentChecked] = useState(true);
  const { startDeletingCourse } = useCoursesStore();

  const handleFlcChange = (event) => {
    setFlcChecked(event.target.checked);
  };
  const handleFrequentChange = (event) => {
    setFrequentChecked(event.target.checked);
  };

  const onDeleteItem = () => {
    startDeletingCourse();
  };

  useEffect(() => {
    setFlcChecked(course.flc);
    setFrequentChecked(course.frequent);
  }, []);

  return (
    <ListItem>
      <ListItemText>{course.title}</ListItemText>
      <Checkbox onChange={handleFlcChange} checked={flcChecked} />
      <Checkbox onChange={handleFrequentChange} checked={frequentChecked} />
      <IconButton onClick={onDeleteItem}>
        <DeleteIcon />
      </IconButton>
    </ListItem>
  );
};
