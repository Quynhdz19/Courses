import React, { lazy } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import DefaultLayout from 'src/layout/DefaultLayout'
import VideoDetail from 'src/views/courses/videoCoureses'

const Dashboard = lazy(() => import('src/views/dashboard/Dashboard'))
const CoursesList = lazy(() => import('src/views/courses'))
const CoursesDetail = lazy(() => import('src/views/courses/coursesDetail'))
const Login = lazy(() => import('./views/pages/login/Login'))
const Register = lazy(() => import('./views/pages/register/Register'))
const Page404 = lazy(() => import('./views/pages/page404/Page404'))
const Page500 = lazy(() => import('./views/pages/page500/Page500'))

// eslint-disable-next-line react/prop-types
const PrivateRoute = ({ element }) => {
  const auth = useSelector((state) => state.auth)
  return auth.isLoggedIn ? element : <Navigate to="/login" />
}

// eslint-disable-next-line react/prop-types
const PublicRoute = ({ element }) => {
  const auth = useSelector((state) => state.auth)
  return auth.isLoggedIn ? <Navigate to="/" /> : element
}

const Routers = () => {
  return (
    <DefaultLayout>
      <Routes>
        <Route path="/" element={<Navigate replace to="/dashboard" />} />
        <Route path="/login" element={<PublicRoute element={<Login />} />} />
        <Route path="/register" element={<PublicRoute element={<Register />} />} />
        <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
        <Route path="/courses" element={<PrivateRoute element={<CoursesList />} />} />
        <Route path="/courses-detail" element={<PrivateRoute element={<CoursesDetail />} />} />
        <Route path="/lesson-learn" element={<PrivateRoute element={<VideoDetail />} />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </DefaultLayout>
  )
}
export default Routers
