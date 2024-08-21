import React, { Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { CContainer, CSpinner } from '@coreui/react'


import CoursesList from 'src/views/courses'
import Dashboard from 'src/views/dashboard/Dashboard'
import CourseDetail from 'src/views/pages/course/CourseDetail'

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/courses', name: 'Courses', element: CoursesList },
  { path: '/course-detail', name: 'CourseDetail', element: CourseDetail },
  // { path: '/courses-video', name: 'CoursesList', element: VideoCourses },
]

const AppContent = () => {
  return (
    <CContainer className="px-4" lg>
      <Suspense fallback={<CSpinner color="primary" />}>
        <Routes>
          {routes.map((route, idx) => {
            return (
              route.element && (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  element={<route.element />}
                />
              )
            )
          })}
          <Route path="/" element={<Navigate to="dashboard" replace />} />
        </Routes>
      </Suspense>
    </CContainer>
  )
}

export default React.memo(AppContent)
