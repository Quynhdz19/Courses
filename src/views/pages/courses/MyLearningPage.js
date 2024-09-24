import { CContainer } from '@coreui/react'
import { Empty } from 'antd'
import React, { useEffect, useState } from 'react'
import userService from 'src/services/UserService'
import BasePlaceholder from '../../components/base/BasePlaceholder'
import CourseCardsList from '../../components/courses/CourseCardsList'
import { openErrorNotification } from 'src/views/components/base/BaseNotification'

const MyLearningPage = () => {
  const [coursesLeaning, setCoursesLeaning] = useState([])
  const [coursesLoading, setCoursesLoading] = useState(false)

  const fetchCoursesLearning = async () => {
    try {
      const response = await userService.getCourses({})
      setCoursesLeaning(response)
    } catch (error) {
      openErrorNotification(error.data?.message ?? error.message)
    }
  }

  useEffect(() => {
    setCoursesLoading(true)
    fetchCoursesLearning().then(() => setCoursesLoading(false))
  }, [])

  return (
    <>
      <h2 className="mt-4 mb-3">Khóa học đang học</h2>

      <CContainer style={{ margin: 0 }}>
        {coursesLoading ? (
          <BasePlaceholder />
        ) : coursesLeaning.length ? (
          <CourseCardsList courses={coursesLeaning} />
        ) : (
          <Empty />
        )}
      </CContainer>
    </>
  )
}

export default MyLearningPage
