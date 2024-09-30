import { CContainer, CImage } from '@coreui/react'
import { Carousel, Empty } from 'antd'
import React, { useEffect, useState } from 'react'
import CourseService from 'src/services/CourseService'
import { openErrorNotification } from 'src/views/components/base/BaseNotification'
import BasePlaceholder from '../../components/base/BasePlaceholder'
import CourseCardsList from '../../components/courses/CourseCardsList'

const CoursesListPage = () => {
  const [courses, setCourses] = useState([])
  const [coursesPending, setCoursesPending] = useState([])
  const [coursesNew, setCoursesNew] = useState([])
  const [coursesLoading, setCoursesLoading] = useState(false)

  const imgCarousel = [
    {
      image: {
        src: 'https://online.unicode.vn/storage/images/unicode-online.jpg',
        status: 'success',
      },
    },
    {
      image: {
        src: 'https://online.unicode.vn/storage/images/Laravel-banner.png?ver=1',
        status: 'success',
      },
    },
    {
      image: {
        src: 'https://online.unicode.vn/storage/images/unicode-online.jpg',
        status: 'success',
      },
    },
    {
      image: {
        src: 'https://online.unicode.vn/storage/images/Laravel-banner.png?ver=1',
        status: 'success',
      },
    },
  ]

  const fetchAlCourses = async () => {
    try {
      const response = await CourseService.getCourses({})
      const idCoursesPending = await CourseService.getPendingCourser()
      if (response.data) {
        const newCourses = response.data.filter((item) => item.isRegistered === false)
        newCourses.forEach((item) => {
          item.isPending = false
          idCoursesPending.forEach((item2) => {
            if (item._id === item2.course) {
              item.isPending = true
            }
          })
        })
        setCourses(newCourses)
      }
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
      <Carousel
        autoplay
        autoplaySpeed={2000}
        pauseOnHover={false}
        draggable={false}
        infinite={true}
        transitionDuration={500}
      >
        {imgCarousel.map((item, index) => (
          <div
            key={index}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
            }}
          >
            <CImage
              src={item.image.src}
              status={item.image.status}
              style={{
                maxWidth: '100%',
                height: 'auto',
                objectFit: 'cover',
                pointerEvents: 'none',
              }}
            />
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
