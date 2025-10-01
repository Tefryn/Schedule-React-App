import { useMemo, useState, type ReactNode } from "react";
import { validateCourses, type Course } from '../types/Course';
import { SelectedCoursesContext } from "./SelectedCoursesContext";

interface ScheduleContextProps {
  children: ReactNode;
  json: unknown;
}

const toggleList = <T,>(x: T, lst: T[]): T[] => (
  lst.includes(x) ? lst.filter(y => y !== x) : [...lst, x]
);

const getCourses = (json: unknown) => {
  const validation = validateCourses(json);
  if (!validation.success) {
    console.log(validation.error)
  };

  return (!validation.data?.courses) ? [] : validation.data.courses;
};

export const ScheduleContextProvider = ({ json, children }: ScheduleContextProps) => {
  
  const courses = useMemo(() => getCourses(json), [json]);
  const [selectedCourses, setSelectedCourses] = useState<Course[]>([]);
    
  const toggleSelectedCourses = (item: Course) => {
    setSelectedCourses(selected => toggleList(item, selected));
  };

  return (
    <SelectedCoursesContext.Provider value={{ courses, selectedCourses, toggleSelectedCourses }}>
      {children}
    </SelectedCoursesContext.Provider>
  );
};