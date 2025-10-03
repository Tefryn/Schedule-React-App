import { useState } from 'react';
import { Button } from './Button';
import Modal from './Modal';
import type { Course } from '../types/Course';
import { useSelectedCourses } from '../state/SelectedCoursesContext';


interface CoursePlanModalProps {
    term: string;
    courses: Course[];
    isOpen: boolean;
    onClose: () => void
}

const CoursePlanModal = ({ term, courses, isOpen, onClose }: CoursePlanModalProps) => (
  <Modal isOpen={isOpen} onClose={onClose}>
    <div className="flex flex-col">
      <h2 className="text-lg font-bold">Course Plan for {term} Quarter</h2>
      <ul className="ml-6 h-30 overflow-auto border border-gray-400 p-4 list-none">
        {
          courses.length === 0 
            ? <li>No courses selected: Click course cards to select</li> 
            : courses.map(course => <li key={`id-${course.code}`}>CS{course.number}: {course.title} - {course.meets}`</li>)
        }
      </ul>
    </div>
  </Modal>
);

interface CoursePlanCardProps {
  term: string;
}
const CoursePlanCard = ({term}: CoursePlanCardProps) => {
  const selectedContext = useSelectedCourses();
  const [modalOpen, setModalOpen] = useState(false);

  const filteredSelectedCourses = selectedContext.selectedCourses.filter(course => course.term && course.term === term);

  return (
    <div className="container mx-auto px-4 w-auto flex justify-end py-4">
        
    <div className="flex gap-2">
        <Button text='Course Plan' onClick={() => setModalOpen(true)} />
    </div>
      <CoursePlanModal term={term} courses={filteredSelectedCourses} isOpen={modalOpen} onClose={() => setModalOpen(false)} />

    </div>
  )
}
export default CoursePlanCard;