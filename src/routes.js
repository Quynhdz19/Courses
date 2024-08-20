import React, { lazy } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from "react-redux";

const Dashboard = lazy(() => import('src/views/dashboard/Dashboard'));
const CoursesList = lazy(() => import('src/views/courses'));
const CoursesDetail = lazy(() => import('src/views/courses/coursesDetail'));
const Login = lazy(() => import('./views/pages/login/Login'));
const Register = lazy(() => import('./views/pages/register/Register'));
const Page404 = lazy(() => import('./views/pages/page404/Page404'));
const Page500 = lazy(() => import('./views/pages/page500/Page500'));

const PrivateRoute = ({ element }) => {
  const auth = useSelector((state) => state.auth);
  return auth.isLoggedIn ? (element) : (<Navigate to="/login" />);
};

const PublicRoute = ({ element }) => {
  const auth = useSelector((state) => state.auth);
  return auth.isLoggedIn ? (<Navigate to="/" />) : (element);
};

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate replace to="/dashboard" />} />
      <Route path="/login" element={<PublicRoute element={<Login />} />} />
      <Route path="/register" element={<PublicRoute element={<Register />} />} />
      <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
      <Route path="/courses" element={<PrivateRoute element={<CoursesList />} />} />
      <Route path="/courses-detail" element={<PrivateRoute element={<CoursesDetail />} />} />
      <Route path="/404" element={<Page404 />} />
      <Route path="/500" element={<Page500 />} />
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
};
export default Routers;


