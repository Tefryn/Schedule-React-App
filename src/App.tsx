import Banner from './components/Banner';
import { useState } from 'react';
import { useJsonQuery } from './utilities/makeFetch';
import { type Course } from './types/Course.tsx';
import TermSelector from './components/TermSelector.tsx';
import CourseSelector from './components/CourseSelector.tsx';
import {ScheduleContextProvider} from './state/ScheduleContextProvider.tsx';

interface Schedule {
  title: string;
  courses: Course[];
}

const App = () => {
  const [selected, setSelected] = useState('Fall');

  const [json, isLoading, error] = useJsonQuery('https://courses.cs.northwestern.edu/394/guides/data/cs-courses.php');

  if (error) return <h1>Error loading user data: {`${error}`}</h1>;
  if (isLoading) return <h1>Loading user data...</h1>;
  if (!json) return <h1>No user data found</h1>;

  const schedule = json as Schedule;
  const courses = Object.values(schedule.courses);
  const terms = [...new Set(courses.flatMap(course => course.term ?? []))].sort();

  return (
    <>
      <Banner title = {schedule.title} />
      <div>
        <ScheduleContextProvider json={json}>
          <TermSelector name = "term-selector" options = {terms} selected = {selected} setSelected = {setSelected}/>
          <CourseSelector term = {selected} />
        </ScheduleContextProvider>
      </div>
    </>
  );
};

export default App;
