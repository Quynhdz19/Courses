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
    badge: {
      color: 'info',
      text: 'NEW',
    },
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
]

export default _navAdmin
