import { type Course } from '../types/Course.tsx';
import { CourseFormButton } from './CourseForm.tsx';

interface CourseProps {
  course: Course;
  selected: boolean;
  conflicted: boolean;
  select: (course: Course) => void;
}

const CourseCard = ({course, selected, conflicted, select}: CourseProps) => (
    <div className={`flex flex-col p-2 rounded border ${getBorder(selected, conflicted)}`} onClick={() => select(course)}>
        <h3 className="m-0 px-3 text-lg">{course.term} CS {course.number}</h3>
        <p className="m-0 px-3">{course.title}</p>
        <footer className="w-full mt-auto">
            <hr className="border-t mt-3 mb-1" />
            <p className="px-3">{course.meets}</p>
            <CourseFormButton course={course}/>
        </footer>
    </div>
);

const getBorder = (selected: boolean, conflicted: boolean) => (
    selected ? 'border-blue-500 bg-blue-100' : conflicted ? 'border-red-500 bg-gray-100' : 'border-gray-500'
);

export default CourseCard