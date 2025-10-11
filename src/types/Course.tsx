import * as z from "zod";

export const initialCourseSchema = z.object({
  term: z.string().regex(/^(Fall|Winter|Spring|Summer)/, "Term must be Fall, Winter, Spring, or Summer"),
  number: z.string().regex(/^\d{3}(-\d)?$/, "Number must be of the form 312 (with an optional section, e.g. 312-2)"),
  meets: z.string().refine((meet) => {
    const days = meet.match(/M|Tu|W|Th|F/g) || [];
    const times = meet.replace(/:/g, "").match(/[0-9]{3,4}/g)?.map(Number) || [];
    return (meet.length === 0 
        || !(days.length !== new Set(days).size 
        || times.length != 2 || times[0] < 0 || times[1] < times[0] || times[1] > 2359 || times[0]%100 > 60 || times[1]%100 > 60));
  },
    {
    message: "Meets must be valid: unique days and correct times",
  }),
  title: z.string().min(2, "Title must be at least 2 characters")
});

export const courseSchema = initialCourseSchema.extend({
  code: z.string(),
});
export type Course = z.infer<typeof courseSchema>;

const scheduleSchema = z.object({
    title: z.string(),
    courses: z.record(z.string(), initialCourseSchema)
})

export const validateCourses = (json: unknown) => (
    scheduleSchema.safeParse(json)
)

export const validateCourse = (course: Course) => (
    courseSchema.safeParse(course)
)