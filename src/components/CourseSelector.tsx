import CourseCard from './CourseCard';
import { useSelectedCourses } from '../state/SelectedCoursesContext.tsx';

interface CourseSelectorProps {
  term: string;
}
const CourseSelector = ({term}: CourseSelectorProps) => {
  const {courses, selectedCourses, toggleSelectedCourses} = useSelectedCourses();
  const courseArray = Object.values(courses)
  const filteredCourses = courseArray.filter(course => course.term && course.term === term);

  return (
    <div className="container mx-auto px-4 w-svw">
      <div className="grid grid-cols-[repeat(auto-fill,_minmax(200px,_1fr))] gap-4 px-4">
        { 
          filteredCourses.map(course => (
            <CourseCard key={course.code} course={course} selected={selectedCourses.includes(course)} select={toggleSelectedCourses} />
          ))
        }
      </div>
    </div>
  )
};

export default CourseSelector;