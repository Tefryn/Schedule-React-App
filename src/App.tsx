import Banner from './components/Banner';
import { useState } from 'react';
import { useDataQuery } from './utilities/firebase.tsx';
import TermSelector from './components/TermSelector.tsx';
import CourseSelector from './components/CourseSelector.tsx';
import {ScheduleContextProvider} from './state/ScheduleContextProvider.tsx';
import CoursePlanCard from './components/ScheduleCard.tsx';


const App = () => {
  const [selected, setSelected] = useState('Fall');
  const [json, isLoading, error] = useDataQuery('/');

  if (error) return <h1>Error loading user data: {`${error}`}</h1>;
  if (isLoading) return <h1>Loading user data...</h1>;
  if (!json) return <h1>No user data found</h1>;

  const terms = ["Fall", "Winter", "Spring"]; //[...new Set(courses.flatMap(course => course.term ?? []))];

  return (
    <>
      <ScheduleContextProvider json={json}>
        <Banner/>
        <div className="flex flex-col gap-4">
          <TermSelector name = "term-selector" options = {terms} selected = {selected} setSelected = {setSelected}/>
          <CoursePlanCard term = {selected}/>
        </div>
        <CourseSelector term = {selected} />
      </ScheduleContextProvider>
    </>
  );
};

export default App;
