import { cilDrop, cilSpeedometer } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CNavItem, CNavTitle } from '@coreui/react'
import React from 'react'
import { RouteMap } from './routes/routeMap'

const _nav = [
  {
    component: CNavItem,
    name: 'Trang chủ',
    to: RouteMap.DashboardPage,
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },
  {
    component: CNavTitle,
    name: 'Bài học',
  },
  {
    component: CNavItem,
    name: 'Courses đang học',
    to: RouteMap.CoursesListPage,
    icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Quản lý courses',
    to: RouteMap.CoursesManagementPage,
    icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
  },
]

export default _nav
