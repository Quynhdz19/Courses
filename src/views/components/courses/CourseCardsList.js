import {
  CAvatar,
  CCard,
  CCardBody,
  CCardImage,
  CCardText,
  CCardTitle,
  CLink,
  CRow,
} from '@coreui/react'
import PropTypes from 'prop-types'
import React from 'react'
import avatar2 from 'src/assets/images/avatars/2.jpg'
import { bindRouteParams, RouteMap } from 'src/routes/routeMap'
import './CourseCardsList.scss'

const CourseCardsList = (props) => {
  return (
    <CRow xs={{ cols: 1, gutter: 4 }} sm={{ cols: 2 }} lg={{ cols: 3 }} xl={{ cols: 4 }}>
      {props.courses.map((course) => (
        <div key={course._id} className="d-flex">
          {/* TODO: check course is learning */}
          {true ? (
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
          ) : (
            <CCard className="h-100 d-flex flex-column not-allowed card-hover">
              <CCardImage size="md" src={course.backgroundImg} />
              <CCardBody className="d-flex flex-column justify-content-between">
                <CCardTitle>
                  <span>{course.title}</span>
                </CCardTitle>
                <CCardText className="text-center mt-auto">Chưa Đăng Ký</CCardText>
              </CCardBody>
            </CCard>
          )}
        </div>
      ))}
    </CRow>
  )
}

CourseCardsList.propTypes = {
  courses: PropTypes.array.isRequired,
}

export default CourseCardsList
