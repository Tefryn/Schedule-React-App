import { createFileRoute } from '@tanstack/react-router'
import { useParams } from '@tanstack/react-router';
import { CourseForm } from '../components/CourseForm.tsx'

const CourseFormPage = () => {
  const { code, term, number, title, meets} = useParams({ from: '/form/$code/$term/$number/$title/$meets' })

  if(!code) {
    return <></>
  }
  return (
    <CourseForm code={code} term={term} number={number} title={title} meets={meets}/>
  )
};

export const Route = createFileRoute('/form/$code/$term/$number/$title/$meets')({
  component: CourseFormPage,
})
