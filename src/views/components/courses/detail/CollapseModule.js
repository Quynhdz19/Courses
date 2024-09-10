import { cilMediaPlay, cilMinus, cilPlus } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CCard, CCardBody, CCardTitle, CCollapse, CListGroup, CListGroupItem } from '@coreui/react'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { bindRouteParams, RouteMap } from 'src/routes/routeMap'
const CourseDetailModuleCollapse = (props) => {
  const [visible, setVisible] = useState(false)
  const { courseId } = useParams()
  return (
    <CCard
      className={'border-light'}
      style={{ cursor: 'pointer' }}
      onClick={() => setVisible(!visible)}
      aria-expanded={visible}
      aria-controls="collapse"
    >
      <CCardBody>
        <CCardTitle>
          <div
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            {props.module.name}
            <div>{visible ? <CIcon icon={cilMinus} /> : <CIcon icon={cilPlus} />}</div>
          </div>
        </CCardTitle>
        <CCollapse id="collapse" visible={visible}>
          <CListGroup flush>
            {props.module.lessons.map((lesson, index) => (
              <CListGroupItem
                key={index}
                as="a"
                href={bindRouteParams(RouteMap.LessonPage, [courseId, lesson.id])}
              >
                <div
                  style={{
                    minHeight: '36px',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                >
                  <div style={{ marginRight: '12px' }}>
                    <CIcon icon={cilMediaPlay} />
                  </div>
                  {lesson.name}
                </div>
              </CListGroupItem>
            ))}
          </CListGroup>
        </CCollapse>
      </CCardBody>
    </CCard>
  )
}

CourseDetailModuleCollapse.propTypes = {
  module: PropTypes.shape({
    name: PropTypes.string.isRequired,
    lessons: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
      }),
    ).isRequired,
  }).isRequired,
}

export default CourseDetailModuleCollapse
