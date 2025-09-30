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
    if (json && (json as Schedule).courses) {
        return { success: true, data: { courses: (json as Schedule).courses } }
    }
    return { success: false, error: "Unable to parse data" }
}