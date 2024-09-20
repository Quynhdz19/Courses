import { CCard, CCardBody, CCardTitle } from '@coreui/react'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import CourseDetailModuleCollapse from './CollapseModule'

const getTotalLessons = (modules) => modules.reduce((p, c) => p + c.lessons.length, 0)
const getLearnedLessons = (modules) =>
  modules.reduce((p, c) => p + c.lessons.filter((lesson) => lesson.isLearned).length, 0)

const CourseDetailModulesCard = (props) => {
  const [totalLessons, setTotalLessons] = useState(0)
  const [learnedLessons, setLearnedLessons] = useState(0)

  useEffect(() => {
    setTotalLessons(getTotalLessons(props.modules))
    setLearnedLessons(getLearnedLessons(props.modules))
  }, [props.modules])

  return (
    <CCard className={'border-light'}>
      <CCardBody className="d-grid gap-2">
        <CCardTitle>
          <strong>Bài Học</strong>
        </CCardTitle>

        <div style={{ textAlign: 'right' }}>
          Tiến độ: {learnedLessons}/{totalLessons} bài học
        </div>

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
