import { useMemo, useState, useEffect, type ReactNode } from "react";
import { validateCourses, type Course } from '../types/Course';
import { type Schedule } from "../types/Schedule";
import { SelectedCoursesContext } from "./SelectedCoursesContext";
import { TitleContext } from "./TitleContext";
import catchConflicts from "../utilities/catchConflict";

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

  return (!validation.data?.courses) ? [] : Object.values(validation.data.courses);
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
  const [conflictedCourses, setConflictedCourses] = useState<Course[]>([]);
    
  const toggleSelectedCourses = (item: Course) => {
    if (!conflictedCourses.includes(item)) {
      setSelectedCourses(selectedCourses => toggleList(item, selectedCourses));
    }
  };

  useEffect(() => {
    const conflicts = catchConflicts(courses, selectedCourses);
    setConflictedCourses(conflicts);
  }, [selectedCourses, courses]);

  return (
    <TitleContext.Provider value={{title}}>
      <SelectedCoursesContext.Provider value={{ courses, selectedCourses, conflictedCourses, toggleSelectedCourses }}>
        {children}
      </SelectedCoursesContext.Provider>
    </TitleContext.Provider>
  );
};