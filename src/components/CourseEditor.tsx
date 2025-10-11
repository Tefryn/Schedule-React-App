import { useForm, type SubmitHandler, type SubmitErrorHandler } from 'react-hook-form';
import { useNavigate } from '@tanstack/react-router';
import { Button } from './Button.tsx';
import { type Course } from '../types/Course.tsx'
import { zodResolver } from '@hookform/resolvers/zod';
import FormField from './FormField.tsx';
import {courseSchema} from "../types/Course.tsx"

type CourseFormProps = {
  course: {
    code: string;
    term: string;
    number: string;
    title: string;
    meets: string;
  };
};

const CourseEditor = (({code, term, number, title, meets}: Course) => {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<Course>({
      defaultValues: {code, term, number, title, meets},
      mode: 'onChange',
      resolver: zodResolver(courseSchema)
    });

    const onSubmit: SubmitHandler<Course> = async(data) => {
      alert(`Submitting ${JSON.stringify(data)}`)
      // Simulate a 2-second API call
      await new Promise(resolve => setTimeout(resolve, 2000));
    };
    const onError: SubmitErrorHandler<Course> = () => {
      alert('Submissions prevented due to form errors')
    };

    const navigate = useNavigate();
    return (
        <form onSubmit={handleSubmit(onSubmit, onError)}>
          <input type="number" {...register('code')} className="hidden" />
            <FormField name="term" label="Term" errors={errors} register={register}/>
            <FormField name="number" label="Course Number" errors={errors} register={register}/>
            <FormField name="title" label="Title" errors={errors} register={register}/>
            <FormField name="meets" label="Meeting Times" errors={errors} register={register}/>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit" disabled={isSubmitting}>Submit</button>
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

export { CourseEditor, CourseFormButton }
