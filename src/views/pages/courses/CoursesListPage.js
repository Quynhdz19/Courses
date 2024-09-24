import {
  CAvatar,
  CButton,
  CCard,
  CCardBody,
  CCardImage,
  CCardText,
  CCardTitle,
  CContainer,
  CImage,
  CLink,
  CRow,
} from '@coreui/react'
import { Carousel } from 'antd'
import React, { useEffect, useState } from 'react'
import avatar2 from 'src/assets/images/avatars/2.jpg'
import { bindRouteParams, RouteMap } from 'src/routes/routeMap'
import userService from 'src/services/UserService'
import './LessonPage.scss'
import CourseService from 'src/services/CourseService'

const CoursesListPage = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [courses, setCourses] = useState([])
  const [coursesLeaning, setCoursesLeaning] = useState([])

  const imgCarousel = [
    {
      image: {
        src: 'https://online.unicode.vn/storage/images/unicode-online.jpg',
        status: 'succes',
      },
    },
    {
      image: {
        src: 'https://online.unicode.vn/storage/images/Laravel-banner.png?ver=1',
        status: 'succes',
      },
    },
    {
      image: {
        src: 'https://online.unicode.vn/storage/images/unicode-online.jpg',
        status: 'succes',
      },
    },
    {
      image: {
        src: 'https://online.unicode.vn/storage/images/Laravel-banner.png?ver=1',
        status: 'succes',
      },
    },
  ]
  const fetchCoursesLearning = async () => {
    try {
      const response = await userService.getCourses({})
      setCoursesLeaning(response)
    } catch (error) {
      console.error('Error fetching courses:', error)
    }
  }

  const fetchAlCourses = async () => {
    try {
      const response = await CourseService.getCourses({})
      setCourses(response.data)
    } catch (error) {
      console.error('Error fetching courses:', error)
    }
  }

  useEffect(() => {
    fetchAlCourses()
    fetchCoursesLearning()
  }, [])

  const isLearningCourse = (courseId) => {
    return coursesLeaning.some((course) => course._id === courseId)
  }

  const handleButtonClick = (event) => {
    event.preventDefault()
    event.stopPropagation()
  }

  return (
    <div>
      <Carousel arrows infinite={true} transitionDuration={500} autoPlaySpeed={1000}>
        {imgCarousel.map((item) => (
          <div
            key={item.image}
            style={{
              width: '80%',
              display: 'flex',
              maxWidth: '100%',
              height: 'auto',
            }}
          >
            <CImage src={item.image.src} status={item.image.status} />
          </div>
        ))}
      </Carousel>

      <h2 className="mt-4 mb-3">Khóa học mới mở</h2>
      <CContainer style={{ margin: 0 }}>
        <CRow xs={{ cols: 1, gutter: 4 }} sm={{ cols: 2 }} lg={{ cols: 3 }} xl={{ cols: 4 }}>
          {courses.map((course) => (
            <div
              key={course._id}
              className={`d-flex ${isLearningCourse(course._id) ? 'display-none' : ''}`}
            >
              {isLearningCourse(course._id) ? (
                <div></div>
              ) : (
                <CLink
                  className="lesson-content"
                  href={bindRouteParams(RouteMap.CourseDetailPage, [course._id])}
                >
                  <CCard className="h-100 d-flex flex-column not-allowed card-hover">
                    <CCardImage size="md" src={course.backgroundImg} />
                    <CCardBody className="d-flex flex-column justify-content-between">
                      <CCardTitle>
                        <span>{course.title}</span>
                      </CCardTitle>
                      <div className="d-flex align-items-center mt-auto">
                        <CAvatar className="me-2" size="md" src={avatar2} />
                        <CCardText>Author</CCardText>
                      </div>
                      <CButton className="my-2" color="primary" onClick={handleButtonClick}>
                        Đăng ký ngay
                      </CButton>
                    </CCardBody>
                  </CCard>
                </CLink>
              )}
            </div>
          ))}
        </CRow>
      </CContainer>
    </div>
  )
}

export default CoursesListPage
