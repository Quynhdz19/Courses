import PropTypes from 'prop-types'
import React, { lazy } from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import DefaultLayout from 'src/layout/DefaultLayout'

const Dashboard = lazy(() => import('src/views/dashboard/Dashboard'))
const CoursesList = lazy(() => import('src/views/courses'))
const CoursesDetail = lazy(() => import('src/views/courses/coursesDetail'))
const VideoDetail = lazy(() => import('src/views/courses/videoCoureses'))
const Login = lazy(() => import('src/views/pages/login/Login'))
const Register = lazy(() => import('src/views/pages/register/Register'))
const Page404 = lazy(() => import('src/views/pages/page404/Page404'))
const Page500 = lazy(() => import('src/views/pages/page500/Page500'))

const AuthWrapper = (props) => {
  const auth = useSelector((state) => state.auth)

  if (!props.isPublic && !auth.isLoggedIn) return <Navigate to="/login" replace />

  return props.element
}
AuthWrapper.propTypes = {
  isPublic: PropTypes.bool.isRequired,
  element: PropTypes.node.isRequired,
}

const routes = [
  {
    path: '/login',
    element: <AuthWrapper isPublic={true} element={<Login />} />,
  },
  {
    path: '/register',
    element: <AuthWrapper isPublic={true} element={<Register />} />,
  },
  {
    element: <DefaultLayout />,
    children: [
      {
        path: '/',
        element: <AuthWrapper isPublic={true} element={<Dashboard />} />,
      },
      {
        path: '/dashboard',
        element: <AuthWrapper isPublic={false} element={<Dashboard />} />,
      },
      {
        path: '/courses',
        element: <AuthWrapper isPublic={false} element={<CoursesList />} />,
      },
      {
        path: '/courses-detail',
        element: <AuthWrapper isPublic={false} element={<CoursesDetail />} />,
      },
      {
        path: '/lesson-learn',
        element: <AuthWrapper isPublic={false} element={<VideoDetail />} />,
      },
    ],
  },
  {
    path: '*',
    element: <AuthWrapper isPublic={true} element={<Page404 />} />,
  },
]

export default routes
