import React from 'react'
import CoursesList from 'src/views/courses'
import CourseDetail from 'src/views/pages/course/CourseDetail'
import VideoCourses from 'src/views/courses/videoCoureses'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/courses', name: 'Courses', element: CoursesList },
  { path: '/course-detail', name: 'CourseDetail', element: CourseDetail },
  { path: '/courses-video', name: 'CoursesList', element: VideoCourses },
]

export default routes
