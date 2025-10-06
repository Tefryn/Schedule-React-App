import { createContext, useContext } from 'react';
import { type Course } from '../types/Course';

interface SelectedCoursesContextType {
  courses: Course[];
  selectedCourses: Course[];
  conflictedCourses: Course[];
  toggleSelectedCourses: (course: Course) => void
}

export const SelectedCoursesContext = createContext<SelectedCoursesContextType>(null!);

export const useSelectedCourses = () => {
  return useContext(SelectedCoursesContext);
};