import {
  CAvatar,
  CCard,
  CCardBody,
  CCardImage,
  CCardText,
  CCardTitle,
  CContainer,
  CLink,
  CRow,
} from '@coreui/react'
import React, { useEffect, useState } from 'react'
import avatar2 from 'src/assets/images/avatars/2.jpg'
import { bindRouteParams, RouteMap } from 'src/routes/routeMap'
import userService from 'src/services/UserService'
import './LessonPage.scss'

const MyLearningPage = () => {
  const [coursesLeaning, setCoursesLeaning] = useState([])

  const fetchCoursesLearning = async () => {
    try {
      const response = await userService.getCourses({})
      setCoursesLeaning(response)
    } catch (error) {
      console.error('Error fetching courses:', error)
    }
  }

  useEffect(() => {
    fetchCoursesLearning()
  }, [])

  return (
    <div>
      <h2 className="mt-4 mb-3">Courses Đang Học</h2>
      <CContainer style={{ margin: 0 }}>
        <CRow xs={{ cols: 1, gutter: 4 }} sm={{ cols: 2 }} lg={{ cols: 3 }} xl={{ cols: 4 }}>
          {coursesLeaning.map((course) => (
            <div key={course._id} className="d-flex">
              <CLink
                className="lesson-content"
                href={bindRouteParams(RouteMap.CourseDetailPage, [course._id])}
              >
                <CCard className="h-100 d-flex flex-column card-hover">
                  <CCardImage size="md" src={course.backgroundImg} />
                  <CCardBody className="d-flex flex-column justify-content-between">
                    <CCardTitle>
                      <span>{course.title}</span>
                    </CCardTitle>
                    <div className="d-flex align-items-center mt-auto">
                      <CAvatar className="me-2" size="md" src={avatar2} />
                      <CCardText>Author</CCardText>
                    </div>
                  </CCardBody>
                </CCard>
              </CLink>
            </div>
          ))}
        </CRow>
      </CContainer>
    </div>
  )
}

export default MyLearningPage
