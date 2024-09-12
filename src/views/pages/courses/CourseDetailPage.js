import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import CourseService from 'src/services/CourseService'
import CourseDetailDescriptionCard from '../../components/courses/detail/CardDescription'
import CourseDetailModulesCard from '../../components/courses/detail/CardModules'

const CourseDetailPage = () => {
  const { courseId } = useParams()
  const [course, setCourse] = useState({})

  const fetchCourse = async () => {
    try {
      const response = await CourseService.getCourse(courseId)
      setCourse(response)
    } catch (error) {
      console.error('Error fetching courses:', error)
    }
  }

  useEffect(() => {
    fetchCourse()
  }, [])

  return (
    <div className="d-grid gap-4">
      <CourseDetailDescriptionCard header="Mô tả" content={course.description ?? ''} />
      <CourseDetailModulesCard modules={course.modules ?? []} />
    </div>
  )
}

export default CourseDetailPage
