import { CCard, CCardBody, CCardTitle } from '@coreui/react'
import PropTypes from 'prop-types'
import React from 'react'
import CourseDetailModuleCollapse from './CollapseModule'

const CourseDetailModulesCard = (props) => {
  return (
    <CCard className={'border-light'}>
      <CCardBody className="d-grid gap-2">
        <CCardTitle>
          <strong>Bài Học</strong>
        </CCardTitle>

        {props.modules.map((module) => (
          <CourseDetailModuleCollapse key={module._id} module={module} />
        ))}
      </CCardBody>
    </CCard>
  )
}
CourseDetailModulesCard.propTypes = {
  modules: PropTypes.array.isRequired,
}

export default CourseDetailModulesCard
