import { CCard, CCardBody, CCardTitle } from '@coreui/react'
import React from 'react'
import CourseDetailModuleCollapse from './CollapseModule'

const CourseDetailModulesCard = () => {
  const modules = [
    {
      name: 'Module 01: Nhập Môn',
      lessons: [
        {
          id: 1,
          name: 'Bài 01: Nhập môn',
        },
      ],
    },
    {
      name: 'Module 02: Lập Trình',
      lessons: [
        {
          id: 1,
          name: 'Bài 04: Route',
        },
        {
          id: 1,
          name: 'Bài 05: Controller',
        },
      ],
    },
  ]
  return (
    <CCard className={'border-light'}>
      <CCardBody className="d-grid gap-2">
        <CCardTitle>
          <strong>Bài Học</strong>
        </CCardTitle>

        {modules.map((module, index) => (
          <CourseDetailModuleCollapse key={index} module={module} />
        ))}
      </CCardBody>
    </CCard>
  )
}

export default CourseDetailModulesCard
