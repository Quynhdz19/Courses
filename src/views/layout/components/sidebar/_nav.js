import { cilDrop, cilSpeedometer } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CNavItem, CNavTitle } from '@coreui/react'
import React from 'react'
import { RouteMap } from 'src/routes/routeMap'

const _nav = [
  {
    component: CNavTitle,
    name: 'Bài học',
  },
  {
    component: CNavItem,
    name: 'Courses',
    to: RouteMap.CoursesListPage,
    icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
  },
]

export default _nav
