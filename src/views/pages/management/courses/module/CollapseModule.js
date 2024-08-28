import { cilMediaPlay, cilMinus, cilPlus, cilPencil, cilTrash } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import {
  CCard,
  CCardBody,
  CCardTitle,
  CCollapse,
  CListGroup,
  CListGroupItem,
  CButton,
} from '@coreui/react'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'

const CourseDetailModuleCollapse = (props) => {
  const [visible, setVisible] = useState(false)
  const { id } = useParams()

  const handleEditLesson = (lessonId) => {
  }

  const handleDeleteLesson = (lessonId) => {
  
  }

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
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div style={{ marginRight: '12px' }}>
                    <CIcon icon={cilMediaPlay} />
                  </div>
                  {lesson.name}
                </div>
                <div>
                  <CButton
                    color="warning"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleEditLesson(lesson.id)
                    }}
                    size="sm"
                    className="ms-2"
                  >
                    <CIcon icon={cilPencil} />
                  </CButton>
                  <CButton
                    color="danger"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleDeleteLesson(lesson.id)
                    }}
                    size="sm"
                    className="ms-2"
                  >
                    <CIcon icon={cilTrash} />
                  </CButton>
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
        id: PropTypes.number.isRequired, 
        name: PropTypes.string.isRequired,
      }),
    ).isRequired,
  }).isRequired,
}

export default CourseDetailModuleCollapse
