import React from 'react'
import CIcon from '@coreui/icons-react'
import { cilDrop, cilSpeedometer } from '@coreui/icons'
import { CNavItem, CNavTitle } from '@coreui/react'

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
    to: 'courses',
    icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Quản lý courses',
    to: '/management/courses',
    icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
  },
]

export default _navAdmin
