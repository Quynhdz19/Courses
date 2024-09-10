import PropTypes from 'prop-types'
import React, { lazy } from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import DefaultLayout from 'src/layout/DefaultLayout'
import { RouteMap } from './routeMap'

const LoginPage = lazy(() => import('src/views/pages/auth/LoginPage'))
const RegisterPage = lazy(() => import('src/views/pages/auth/RegisterPage'))

const CoursesListPage = lazy(() => import('src/views/pages/courses/CoursesListPage'))
const CourseDetailPage = lazy(() => import('src/views/pages/courses/CourseDetailPage'))
const LessonPage = lazy(() => import('src/views/pages/courses/LessonPage'))

const CoursesManagementPage = lazy(
  () => import('src/views/pages/courses-management/CoursesManagementPage'),
)
const CourseModulesManagementPage = lazy(
  () => import('src/views/pages/courses-management/CourseModulesManagementPage'),
)
const CourseLessonsManagementPage = lazy(
  () => import('src/views/pages/courses-management/CourseLessonsManagementPage'),
)

const Dashboard = lazy(() => import('src/views/dashboard/Dashboard'))
const Page404 = lazy(() => import('src/views/pages/page404/Page404'))

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
    element: <LoginPage />,
  },
  {
    path: RouteMap.RegisterPage,
    element: <RegisterPage />,
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
        element: <AuthGuard element={<CoursesListPage />} />,
      },
      {
        path: RouteMap.CourseDetailPage,
        element: <AuthGuard element={<CourseDetailPage />} />,
      },
      {
        path: RouteMap.LessonPage,
        element: <AuthGuard element={<LessonPage />} />,
      },
      {
        path: RouteMap.CoursesManagementPage,
        element: <AuthGuard requireAdmin={true} element={<CoursesManagementPage />} />,
      },
      {
        path: RouteMap.CourseModulesManagementPage,
        element: <AuthGuard requireAdmin={true} element={<CourseModulesManagementPage />} />,
      },
      {
        path: RouteMap.CourseLessonsManagementPage,
        element: <AuthGuard requireAdmin={true} element={<CourseLessonsManagementPage />} />,
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
