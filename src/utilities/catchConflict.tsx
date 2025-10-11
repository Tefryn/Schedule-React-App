
import { type Course } from '../types/Course';

const catchConflicts = (courses: Course[], selectedCourses: Course[]) => {
    const conflicts = courses.filter(course => {
        if (selectedCourses.includes(course)){
            return false
        }
        const dates = getDays(course.meets);
        const times = getTimes(course.meets);
        
        return selectedCourses.some(selected => (
            selected.term === course.term 
            && dates.some((day: string) => selected.meets.includes(day)) 
            && timeOverlap(times, getTimes(selected.meets)))
        )
    })
    return conflicts
}

const getDays = (meets: string) => {
    return meets.match(/M|Tu|W|Th|F/g) || [];
}

const getTimes = (meets: string) => {
    return meets.replace(/:/g, "").match(/[0-9]{3,4}/g)?.map(Number) || [];
}

const timeOverlap = (time1: number[], time2: number[]) => (
    time1[0] < time2[1] && time2[0] < time1[1]
);

export default catchConflicts;
export {getDays, getTimes};
