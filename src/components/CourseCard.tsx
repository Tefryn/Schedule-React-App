import type Course from '../types/Course.tsx';

interface CourseProps {
  course: Course;
}

const CourseCard = ({course}: CourseProps) => (
    <div className="flex flex-col border p-2 rounded">
        <h3 className="m-0 px-3 text-lg">{course.term} CS {course.number}</h3>
        <p className="m-0 px-3">{course.title}</p>
        <div className="w-full mt-auto">
            <hr className="border-t mt-3 mb-1" />
            <p className="px-3">{course.meets}</p>
        </div>
    </div>
);

export default CourseCard