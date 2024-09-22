import {
  CAvatar,
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
  const [courses, setCourses] = useState([])
  const [coursesLeaning, setCoursesLeaning] = useState([])

  const imgCarousel = [
    {
      image: {
        src: 'https://online.unicode.vn/storage/images/Laravel-banner.png?ver=1',
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
        src: 'https://online.unicode.vn/storage/images/Laravel-banner.png?ver=1',
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
      setCourses(response)
    } catch (error) {
      console.error('Error fetching courses:', error)
    }
  }

  useEffect(() => {
    fetchAlCourses()
    fetchCoursesLearning()
  }, [])

  return (
    <div>
      <Carousel arrows infinite={false}>
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
      <h2 className="mt-4 mb-2">Courses Đang Học</h2>

      <CContainer style={{ margin: 0 }}>
        <CRow xs={{ cols: 1, gutter: 4 }} sm={{ cols: 2 }} lg={{ cols: 3 }} xl={{ cols: 4 }}>
          {coursesLeaning.map((course) => (
            <CLink
              className="lesson-content"
              key={course._id}
              href={bindRouteParams(RouteMap.CourseDetailPage, [course._id])}
            >
              <CCard>
                <CCardImage
                  size="md"
                  src={course.backgroundImg}
                  // status={item.image.status}
                />
                <CCardTitle>
                  <span className="m-lg-2">{course.title}</span>
                </CCardTitle>
                {/* <CCardText>
                  <ins className="m-lg-2 text-primary">{item.price}</ins>
                </CCardText> */}
                <div style={{ display: 'flex', justifyContent: 'flex', flexWrap: 'wrap' }}>
                  <CAvatar
                    className="m-lg-1"
                    size="md"
                    src={avatar2}
                    // status={item.avtar.status}
                  />
                  <CCardText>
                    <span className="text-center m-lg-2">Author</span>
                  </CCardText>
                  {/* <CCardText style={{ display: 'flex', justifyContent: 'right' }}>
                    <div className="text-center m-lg-2">{item.lecture}</div>
                  </CCardText> */}
                </div>
              </CCard>
            </CLink>
          ))}
        </CRow>
      </CContainer>

      <h2 className="mt-4 mb-2">Danh Sách Khóa Học</h2>

      <CContainer style={{ margin: 0 }}>
        <CRow xs={{ cols: 1, gutter: 4 }} sm={{ cols: 2 }} lg={{ cols: 3 }} xl={{ cols: 4 }}>
          {courses.map((course) => (
            <CLink
              className="lesson-content"
              key={course._id}
              href={bindRouteParams(RouteMap.CourseDetailPage, [course._id])}
            >
              <CCard>
                <CCardImage
                  size="md"
                  src={course.backgroundImg}
                  // status={item.image.status}
                />
                <CCardTitle>
                  <span className="m-lg-2">{course.title}</span>
                </CCardTitle>
                {/* <CCardText>
                  <ins className="m-lg-2 text-primary">{item.price}</ins>
                </CCardText> */}
                <div style={{ display: 'flex', justifyContent: 'flex', flexWrap: 'wrap' }}>
                  <CAvatar
                    className="m-lg-1"
                    size="md"
                    src={avatar2}
                    // status={item.avtar.status}
                  />
                  <CCardText>
                    <span className="text-center m-lg-2">Author</span>
                  </CCardText>
                  {/* <CCardText style={{ display: 'flex', justifyContent: 'right' }}>
                    <div className="text-center m-lg-2">{item.lecture}</div>
                  </CCardText> */}
                </div>
              </CCard>
            </CLink>
          ))}
        </CRow>
      </CContainer>
    </div>
  )
}

export default CoursesListPage
