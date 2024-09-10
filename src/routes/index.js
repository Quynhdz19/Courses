import PropTypes from 'prop-types'
import React, { lazy } from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import DefaultLayout from 'src/layout/DefaultLayout'
import { RouteMap } from './routeMap'

const Dashboard = lazy(() => import('src/views/dashboard/Dashboard'))
const CoursesList = lazy(() => import('src/views/pages/courses'))
const CoursesDetail = lazy(() => import('src/views/pages/courses/course/CourseDetail'))
const VideoDetail = lazy(() => import('src/views/pages/courses/detail/videoVideoDetail'))
const Login = lazy(() => import('src/views/pages/login/Login'))
const Register = lazy(() => import('src/views/pages/register/Register'))
const Page404 = lazy(() => import('src/views/pages/page404/Page404'))
const CourseManager = lazy(() => import('src/views/pages/management/courses'))
const ModulesManager = lazy(
  () => import('src/views/pages/management/courses/components/ModulesManager'),
)
const LessonsManager = lazy(
  () => import('src/views/pages/management/courses/components/LessonsManager'),
)

const AuthGuard = (props) => {
  const { isPublic = false } = props
  const { requireAdmin = false } = props

  const auth = useSelector((state) => state.auth)

  // if (!isPublic && !auth.isLoggedIn) return <Navigate to={RouteMap.LoginPage} replace />

  // if (requireAdmin && auth.account.role !== 'ADMIN')
  //   return <Navigate to={RouteMap.HomePage} replace />

  return props.element
}
AuthGuard.propTypes = {
  element: PropTypes.node,
  isPublic: PropTypes.bool,
  requireAdmin: PropTypes.bool,
}

const routes = [
  {
    path: RouteMap.LoginPage,
    element: <Login />,
  },
  {
    path: RouteMap.RegisterPage,
    element: <Register />,
  },
  {
    element: <DefaultLayout />,
    children: [
      {
        path: RouteMap.HomePage,
        element: <AuthGuard element={<Dashboard />} />,
      },
      {
        path: RouteMap.DashboardPage,
        element: <AuthGuard element={<Dashboard />} />,
      },
      {
        path: RouteMap.CoursesListPage,
        element: <AuthGuard element={<CoursesList />} />,
      },
      {
        path: RouteMap.CourseDetailPage,
        element: <AuthGuard element={<CoursesDetail />} />,
      },
      {
        path: RouteMap.LessonPage,
        element: <AuthGuard element={<VideoDetail />} />,
      },
      {
        path: RouteMap.CoursesManagementPage,
        element: <AuthGuard requireAdmin={true} element={<CourseManager />} />,
      },
      {
        path: RouteMap.CourseManagementPage,
        element: <AuthGuard requireAdmin={true} element={<ModulesManager />} />,
      },
      {
        path: RouteMap.LessonsManagementPage,
        element: <AuthGuard requireAdmin={true} element={<LessonsManager />} />,
      },
    ],
  },
  {
    path: RouteMap.NotFoundPage,
    element: <Page404 />,
  },
  {
    path: '*',
    element: <Navigate to={RouteMap.NotFoundPage} replace />,
  },
]

export default routes
