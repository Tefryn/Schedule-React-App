import { createFileRoute } from '@tanstack/react-router'
import { useParams } from '@tanstack/react-router';
import { CourseEditor } from '../components/CourseEditor.tsx'

const CourseFormPage = () => {
  const { code, term, number, title, meets} = useParams({ from: '/form/$code/$term/$number/$title/$meets' })

  if(!code) {
    return <></>
  }
  return (
    <CourseEditor code={code} term={term} number={number} title={title} meets={meets}/>
  )
};

export const Route = createFileRoute('/form/$code/$term/$number/$title/$meets')({
  component: CourseFormPage,
})
