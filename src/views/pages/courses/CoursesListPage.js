import { CContainer, CImage } from '@coreui/react'
import { Carousel, Empty } from 'antd'
import React, { useEffect, useState } from 'react'
import CourseService from 'src/services/CourseService'
import { openErrorNotification } from 'src/views/components/base/BaseNotification'
import BasePlaceholder from '../../components/base/BasePlaceholder'
import CourseCardsList from '../../components/courses/CourseCardsList'

const CoursesListPage = () => {
  const [courses, setCourses] = useState([])
  const [coursesLoading, setCoursesLoading] = useState(false)

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

  const fetchAlCourses = async () => {
    try {
      const response = await CourseService.getCourses({})
      setCourses(response.data)
    } catch (error) {
      openErrorNotification(error.data?.message ?? error.message)
    }
  }

  useEffect(() => {
    setCoursesLoading(true)
    fetchAlCourses().then(() => setCoursesLoading(false))
  }, [])

  return (
    <>
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

      <h2 className="mt-4 mb-3">Khóa học mới mở</h2>

      <CContainer style={{ margin: 0 }}>
        {coursesLoading ? (
          <BasePlaceholder />
        ) : courses.length ? (
          <CourseCardsList courses={courses} />
        ) : (
          <Empty />
        )}
      </CContainer>
    </>
  )
}

export default CoursesListPage
