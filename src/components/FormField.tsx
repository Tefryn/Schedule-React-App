import type { FieldErrors, UseFormRegister } from 'react-hook-form';
import type { Course } from '../types/Course';
interface FormFieldProps {
    name: keyof Course;
    label: string;
    errors: FieldErrors<Course>;
    register: UseFormRegister<Course>
}
const FormField = (({name, label, errors, register}: FormFieldProps) => (
    <label>
      <p className="text-lg">{label}{ errors[name] && <span className="text-sm inline-block pl-2 text-red-400 italic">
        {errors[name].message}</span> }
      </p>
      <input {...register(name)}
        className={`w-full rounded border ${errors[name] ? 'border-red-500' : 'border-gray-300'} bg-inherit p-3 shadow shadow-gray-100 mt-2 appearance-none outline-none text-neutral-80`}
      />
  </label>
))

export default FormField