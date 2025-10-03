import { useMemo, useState, type ReactNode } from "react";
import { validateCourses, type Course } from '../types/Course';
import { type Schedule } from "../types/Schedule";
import { SelectedCoursesContext } from "./SelectedCoursesContext";
import { TitleContext } from "./TitleContext";

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

const getTitle = (json: unknown) => {
  if (typeof json === 'object' && json !== null && 'title' in json) {
    return (json as Schedule).title;
  }
  return "Course Schedule";
}
  

export const ScheduleContextProvider = ({ json, children }: ScheduleContextProps) => {
  
  const courses = useMemo(() => getCourses(json), [json]);
  const title = useMemo(() => getTitle(json), [json]);
  const [selectedCourses, setSelectedCourses] = useState<Course[]>([]);
    
  const toggleSelectedCourses = (item: Course) => {
    setSelectedCourses(selected => toggleList(item, selected));
  };

  return (
    <TitleContext.Provider value={{title}}>
      <SelectedCoursesContext.Provider value={{ courses, selectedCourses, toggleSelectedCourses }}>
        {children}
      </SelectedCoursesContext.Provider>
    </TitleContext.Provider>
  );
};