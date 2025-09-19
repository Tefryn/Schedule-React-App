interface CourseProps {
  courses: Record<string,Record<string,string>>;
}
const CourseList = ({ courses }: CourseProps) => (
    <div className="flex gap-4 text-gray-700">
        {
        Object.values(courses).map((info) => (
            <div className="flex flex-col border p-2 rounded flex-1">
                <h3 className="m-0 px-3 text-lg">
                    {info.term} CS {info.number}
                </h3>
                <p className="m-0 px-3">
                    {info.title}
                </p>
                <div className="w-full mt-auto">
                    <hr className="border-t mt-3 mb-1" />
                    <p className="px-3">{info.meets}</p>
                </div>
            </div>
        ))
        }
    </div>
);

export default CourseList;
