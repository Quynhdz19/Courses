import { cilDrop, cilSpeedometer } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CNavItem, CNavTitle } from '@coreui/react'
import React from 'react'
import { RouteMap } from 'src/routes/routeMap'

const _navAdmin = [
  {
    component: CNavItem,
    name: 'Trang chủ',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Khoá học',
  },
  {
    component: CNavItem,
    name: 'Review courses',
    to: RouteMap.CoursesListPage,
    icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Quản lý courses',
    to: RouteMap.CoursesManagementPage,
    icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Học viên',
  },
  {
    component: CNavItem,
    name: 'Quản lý học viên',
    to: RouteMap.ManagementUser,
    icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
  },
]

export default _navAdmin
