import type { ValidationResult } from "./ValidationResult";
import type { Schedule } from "./Schedule.tsx";

export interface Course {
    code: string;
    term: string;
    number: string;
    meets: string;
    title: string;
}

export const validateCourses = (json: unknown): ValidationResult<{courses:Course[]}> => {
    const schedule = json as Schedule
    if (json && schedule) {
        const courses: Course[] = Object.entries(schedule.courses).map(([code, courseData]) => ({
            code,
            term: courseData.term,
            number: courseData.number,
            meets: courseData.meets,
            title: courseData.title,
        }));
        return { success: true, data: { courses: courses } }
    }
    return { success: false, error: "Unable to parse data" }
}