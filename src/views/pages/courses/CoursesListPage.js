import {
  CAvatar,
  CCard,
  CCardBody,
  CCardImage,
  CCardText,
  CCardTitle,
  CImage,
  CLink,
} from '@coreui/react'
import { Carousel } from 'antd'
import React, { useEffect, useState } from 'react'
import avatar2 from 'src/assets/images/avatars/2.jpg'
import { bindRouteParams, RouteMap } from 'src/routes/routeMap'
import CourseService from 'src/services/CourseService'

const CoursesListPage = () => {
  const [courses, setCourses] = useState([])

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

  const fetchCourses = async () => {
    try {
      const response = await CourseService.getCourses({})
      setCourses(response)
    } catch (error) {
      console.error('Error fetching courses:', error)
    }
  }

  useEffect(() => {
    fetchCourses()
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
      <CCardTitle style={{ display: 'flex', justifyContent: 'left' }}>
        <span className="p-lg-3">Danh Sách Khóa Học </span>
      </CCardTitle>
      <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
        {courses.map((course) => (
          <CLink key={course._id} href={bindRouteParams(RouteMap.CourseDetailPage, [course._id])}>
            <CCardBody className="d-grid gap-2">
              <CCard className="m-lg-3">
                <CCardImage
                  size="md"
                  src={`https://online-course-jimmy.onrender.com/${course.backgroundImg}`}
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
            </CCardBody>
          </CLink>
        ))}
      </div>
    </div>
  )
}

export default CoursesListPage
