import { useState } from 'react';
// import { useForm, type SubmitHandler, type SubmitErrorHandler } from 'react-hook-form';
import { useNavigate } from '@tanstack/react-router';
import { Button } from './Button';
import { type Course } from '../types/Course'
import FormField from './FormField.tsx'


type CourseFormProps = {
  course: {
    code: string;
    term: string;
    number: string;
    title: string;
    meets: string;
  };
};

const CourseForm = (({code, term, number, title, meets}: Course) => {
    const [courseCode, setCode] = useState(code);
    const [courseTerm, setTerm] = useState(term);
    const [courseNumber, setNumber] = useState(number);
    const [courseTitle, setTitle] = useState(title);
    const [courseMeets, setMeets] = useState(meets);
    const navigate = useNavigate();


    // const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<Course>({
    //     defaultValues: course,
    //     mode: 'onChange',
    //     resolver: courseResolver 
    // });

    // const onSubmit = () => {
    //   console.log("Not Implemented")
    // }
    // const onError: SubmitErrorHandler<CourseCard> = () => {
    //   alert('Submissions prevented due to form errors')
    // };

    return (
        // <form>
        //   <input type="number" {...register('id')} className="hidden" />
        //   <QuoteField name="author" label="Author" errors={errors} register={register} />
        //   <QuoteField name="quote" label="Quote" errors={errors} register={register} />
        //   <Button type="submit" disabled={isSubmitting}>Submit</Button>
        // </form>
        <form>
            {/* <input type="number" {...register('id')} className="hidden" /> */}
            {/* <input type="text" name="author" value={meets} onChange={(evt) => setMeets(evt.target.value)}
                className={`w-full rounded border border-gray-300 bg-inherit p-3 shadow shadow-gray-100 mt-2 appearance-none outline-none text-neutral-80`}
            /> */}
            <FormField name="code" label="Course Code" value={courseCode} onChange={setCode} />
            <FormField name="term" label="Term" value={courseTerm} onChange={setTerm} />
            <FormField name="number" label="Course Number" value={courseNumber} onChange={setNumber} />
            <FormField name="title" label="Title" value={courseTitle} onChange={setTitle} />
            <FormField name="meets" label="Meeting Times" value={courseMeets} onChange={setMeets} />
            <Button text='Submit' onClick={() => console.log("Submit not implemented")} />
            <Button text='Cancel' onClick={() => navigate({to: `/`})} />
        </form>
    )
})

const CourseFormButton = ({ course }: CourseFormProps) => {
    const navigate = useNavigate();
    return (
        <Button text="Course Form" onClick={() => 
            navigate({
                to: `/form/$code/$term/$number/$title/$meets`, 
                params: {code:course.code, term:course.term, number:course.number, title:course.title, meets:course.meets}, 
            })
        } />
    )
}

export { CourseForm, CourseFormButton }