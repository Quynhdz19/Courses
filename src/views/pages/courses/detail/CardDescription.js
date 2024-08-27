import { CCard, CCardBody, CCardText, CCardTitle } from '@coreui/react'
import PropTypes from 'prop-types'
import React from 'react'

const CourseDetailDescriptionCard = (props) => {
  const { header, content } = props
  const paragraphs = content.split('\n')

  return (
    <CCard className={'border-light'}>
      <CCardBody>
        <CCardTitle>
          <strong>{header}</strong>
        </CCardTitle>
        {paragraphs.map((paragraph, index) => (
          <CCardText key={index}>{paragraph}</CCardText>
        ))}
      </CCardBody>
    </CCard>
  )
}

CourseDetailDescriptionCard.propTypes = {
  header: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
}

export default CourseDetailDescriptionCard
