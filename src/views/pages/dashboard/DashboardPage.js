import { cilPeople, cilBook } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import {
  CCardImage,
  CAvatar,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CButton,
} from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { bindRouteParams, RouteMap } from 'src/routes/routeMap'
import { useNavigate } from 'react-router-dom'
import WidgetsDropdown from '../../components/dashboard/widgets/WidgetsDropdown'
import Pagination from 'src/views/components/courses-management/courses/Pagination'
import courseService from 'src/services/CourseService'
import orderService from 'src/services/OrderService'
import { openErrorNotification } from 'src/views/components/base/BaseNotification'
import avatar1 from 'src/assets/images/avatars/avatar.png'

const DashboardPage = () => {
  const avatar = avatar1
  const navigate = useNavigate()

  const [topCourses, setTopCourses] = useState([])
  const [registrationOrders, setRegistrationOrders] = useState([])
  const [totalPages, setTotalPages] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [searchQuery, setSearchQuery] = useState({
    page: 1,
    size: 10,
    orderBy: 'createdAt',
    orderDirection: 'asc',
    status: 'PENDING',
  })

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      setCurrentPage(1)
      setSearchQuery((prevQuery) => ({ ...prevQuery, search: searchTerm, page: 1 }))
    }, 200)

    return () => clearTimeout(debounceTimeout)
  }, [searchTerm])

  useEffect(() => {
    fetchRegistrationOrders()
  }, [searchQuery])

  const handlePageChange = (page) => {
    setSearchQuery((prevQuery) => ({ ...prevQuery, page }))
    setCurrentPage(page)
  }

  const fetchRegistrationOrders = async () => {
    try {
      const response = await orderService.getOrders(searchQuery)
      setRegistrationOrders(response.data)
      setTotalPages(response.metadata.totalPage)
    } catch (error) {
      openErrorNotification(error.data?.message ?? error.message)
    }
  }

  useEffect(() => {
    const fetchTopCourses = async () => {
      try {
        const response = await courseService.getTopCourseMetrics({ limit: 5 })
        setTopCourses(response.data)
      } catch (error) {
        openErrorNotification(error.data?.message ?? error.message)
      }
    }
    fetchTopCourses()
  }, [])

  const handleUpdateOrder = async (orderId, status) => {
    try {
      await orderService.updateOrder(orderId, { status })
      fetchRegistrationOrders()
    } catch (error) {
      openErrorNotification(error.data?.message ?? error.message)
    }
  }

  return (
    <>
      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader className="fw-bold fs-5">
              Các yêu cầu đăng ký khóa học
            </CCardHeader>
            <CCardBody>
              <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead className="text-nowrap bg-primary">
                  <CTableRow>
                    <CTableHeaderCell className="text-center bg-body-tertiary">
                      STT
                    </CTableHeaderCell>
                    <CTableHeaderCell className="text-center bg-body-tertiary">
                      <CIcon icon={cilPeople} />
                    </CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">Học sinh</CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">Khóa học</CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary text-center">Xử lý</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {registrationOrders.length > 0 ? (
                    registrationOrders.map((order, index) => (
                      <CTableRow key={order._id}>
                        <CTableDataCell className="text-center fw-bold">
                          {(index + 1) + (currentPage - 1) * searchQuery.size}
                        </CTableDataCell>
                        <CTableDataCell className="text-center">
                          <CAvatar size="md" src={avatar} />
                        </CTableDataCell>
                        <CTableDataCell>{order.user.fullName}</CTableDataCell>
                        <CTableDataCell>{order.course.title}</CTableDataCell>
                        <CTableDataCell className="text-center">
                          <CButton color="success" className="me-2 fw-bold" style={{ color: 'white' }} onClick={() => handleUpdateOrder(order._id, 'APPROVED')}>
                            Chấp nhận
                          </CButton>
                          <CButton color="danger" className="fw-bold" style={{ color: 'white' }} onClick={() => handleUpdateOrder(order._id, 'REJECTED')}>
                            Từ chối
                          </CButton>
                        </CTableDataCell>
                      </CTableRow>
                    ))
                  ) : (
                    <CTableRow>
                      <CTableDataCell colSpan="5" className="text-center">
                        No Orders Found
                      </CTableDataCell>
                    </CTableRow>
                  )}
                </CTableBody>
              </CTable>
            </CCardBody>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </CCard>
        </CCol>
      </CRow>

      <WidgetsDropdown className="mb-4" />

      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader className="fw-bold fs-5">Top 5 khóa học</CCardHeader>
            <CCardBody>
              <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead className="text-nowrap">
                  <CTableRow>
                    <CTableHeaderCell className="text-center bg-body-tertiary">
                      STT
                    </CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary text-center">
                      <CIcon icon={cilBook} color="warning" />
                    </CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">Khóa học</CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">
                      Mô tả
                    </CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">
                      Modules
                    </CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">Học sinh</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {Array.isArray(topCourses) && topCourses.length > 0 ? (
                    topCourses.map((course, index) => (
                      <CTableRow key={course._id} onClick={() =>
                        navigate(bindRouteParams(RouteMap.CourseModulesManagementPage, [course._id]))
                      }>
                        <CTableDataCell className="text-center fw-bold">
                          {index + 1}
                        </CTableDataCell>
                        <CTableDataCell className="text-center">
                          <CCardImage
                            src={course.backgroundImg}
                            style={{ maxWidth: '100px', width: 'auto' }}
                          />
                        </CTableDataCell>
                        <CTableDataCell>
                          {course.title}
                        </CTableDataCell>
                        <CTableDataCell>
                          {course.description}
                        </CTableDataCell>
                        <CTableDataCell>
                          {course.modules?.length || 0}
                        </CTableDataCell>
                        <CTableDataCell>
                          {course.totalStudents}
                        </CTableDataCell>
                      </CTableRow>
                    ))
                  ) : (
                    <CTableRow>
                      <CTableDataCell colSpan="7" className="text-center">Loading...</CTableDataCell>
                    </CTableRow>
                  )}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default DashboardPage
