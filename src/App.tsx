import Banner from './components/Banner';
import CourseList from './components/CourseList';
import { useJsonQuery } from './utilities/makeFetch';
import type Course from './types/Course.tsx';


interface Schedule {
  title: string;
  courses: Record<string, Course>
}

const App = () => {
  const [json, isLoading, error] = useJsonQuery('https://courses.cs.northwestern.edu/394/guides/data/cs-courses.php');
  // Banner title={schedule.title}
  // CourseList courses={schedule.courses}

  if (error) return <h1>Error loading user data: {`${error}`}</h1>;
  if (isLoading) return <h1>Loading user data...</h1>;
  if (!json) return <h1>No user data found</h1>;

  const schedule = json as Schedule;
  
  return (
    <>
      <Banner title = {schedule.title} />
      <CourseList courses = {schedule.courses} />
    </>
  );
};

export default App;
