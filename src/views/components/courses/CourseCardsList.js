import {
  CAvatar,
  CCard,
  CCardBody,
  CCardImage,
  CCardText,
  CCardTitle,
  CLink,
  CRow,
  CButton,
} from '@coreui/react'
import PropTypes from 'prop-types'
import React from 'react'
import avatar2 from 'src/assets/images/avatars/2.jpg'
import { bindRouteParams, RouteMap } from 'src/routes/routeMap'
import './CourseCardsList.scss'

const CourseCardsList = (props) => {
  const handleButtonClick = (event) => {
    event.preventDefault()
    event.stopPropagation()
  }

  return (
    <CRow xs={{ cols: 1, gutter: 4 }} sm={{ cols: 2 }} lg={{ cols: 3 }} xl={{ cols: 4 }}>
      {props.courses.map((course) => (
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
                  <CCardText>Lê Xuân Quỳnh</CCardText>
                </div>
                {!course.isRegistered && (
                  <CButton className="my-2" color="primary" onClick={handleButtonClick}>
                    Đăng ký ngay
                  </CButton>
                )}
              </CCardBody>
            </CCard>
          </CLink>
        </div>
      ))}
    </CRow>
  )
}

CourseCardsList.propTypes = {
  courses: PropTypes.array.isRequired,
}

export default CourseCardsList
