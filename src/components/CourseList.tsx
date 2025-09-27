import CourseCard from './CourseCard.tsx';
import type Course from '../types/Course.tsx';


interface CourseProps {
    courses: Record<string, Course>;
}

const CourseList = ({ courses }: CourseProps) => (
    <div className="grid grid-cols-[repeat(auto-fill,_minmax(200px,_1fr))] gap-4 px-4">
        {
        Object.values(courses).map((course: Course) => (
            <CourseCard course={course} />
        ))
        }
    </div>
);

export default CourseList;
