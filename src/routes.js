import React from 'react'
import CoursesList from 'src/views/courses'
import CoursesDetail from 'src/views/courses/coursesDetail'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/courses', name: 'Courses', element: CoursesList },
  { path: '/courses-detail', name: 'CoursesDetail', element: CoursesDetail },
]

export default routes
