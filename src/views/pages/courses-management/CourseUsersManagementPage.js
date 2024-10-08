import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {
  CContainer,
  CNav,
  CNavItem,
  CNavLink,
  CButton,
  CInputGroup,
  CFormInput,
  CInputGroupText,
  CCard,
  CCardBody,
  CPagination,
  CPaginationItem,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilSearch, cilChevronCircleLeftAlt, cilChevronCircleRightAlt } from '@coreui/icons'
import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver'
import CourseService from 'src/services/CourseService'
import UsersTable from '../../components/courses-management/users/UsersTable'
import AddModal from '../../components/courses-management/courses/AddModal'
import DeleteModal from '../../components/courses-management/courses/DeleteModal'
import './CourseUsersManagementPage.scss'

const CourseUsersManagementPage = () => {
  const [users, setUsers] = useState([])
  const [usersCourse, setUsersCourse] = useState([])
  const [selectedUsers, setSelectedUsers] = useState([])
  const [modalState, setModalState] = useState({ add: false, delete: false, userIdToAction: null })
  const [activeTab, setActiveTab] = useState('users')
  const { courseId } = useParams()

  const [totalPages, setTotalPages] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [searchQuery, setSearchQuery] = useState({
    page: 1,
    size: 10,
    orderBy: 'createdAt',
    orderDirection: 'asc',
    search: '',
    isInCourse: '',
  })

  useEffect(() => {
    if (activeTab === 'users') {
      fetchUsersCourse()
      setSelectedUsers([])
    } else if (activeTab === 'add-users') {
      fetchUsers()
      setSelectedUsers([])
    }
  }, [activeTab, searchQuery])

  const fetchUsers = async () => {
    try {
      searchQuery.isInCourse = false
      const response = await CourseService.getUserOfCourseOrNo(courseId, searchQuery)
      setUsers(response.data)
      setTotalPages(response.metadata.totalPage)
    } catch (error) {
      console.error('Error fetching users:', error)
    }
  }

  const fetchUsersCourse = async () => {
    try {
      searchQuery.isInCourse = true
      const response = await CourseService.getUserOfCourseOrNo(courseId, searchQuery)
      setUsersCourse(response.data)
      setTotalPages(response.metadata.totalPage)
    } catch (error) {
      console.error('Error fetching course users:', error)
    }
  }

  const handleSearch = () => {
    setSearchQuery((prevQuery) => ({ ...prevQuery, search: searchTerm, page: 1 }))
    setCurrentPage(1)
  }

  const handlePageChange = (page) => {
    setSearchQuery((prevQuery) => ({ ...prevQuery, page }))
    setCurrentPage(page)
  }

  const handleTabChange = (tab) => {
    setActiveTab(tab)
    setSearchTerm('')
    setSearchQuery((prevQuery) => ({ ...prevQuery, search: '', page: 1 }))
  }

  const closeModal = () => {
    setModalState({ add: false, delete: false })
  }

  const handleUserAction = (userId, action) => {
    if (action === 'add') {
      setModalState({ add: true, delete: false, userIdToAction: userId })
    } else if (action === 'delete') {
      setModalState({ add: false, delete: true, userIdToAction: userId })
    }
  }

  const handleCourseAction = async (action) => {
    try {
      const userId = modalState.userIdToAction
      const formattedData = {
        userIds: userId ? [userId.toString()] : selectedUsers.map((id) => id.toString()),
      }
      if (action === 'add') {
        await CourseService.addUsers(courseId, formattedData)
      } else if (action === 'delete') {
        await CourseService.deleteUsers(courseId, formattedData)
      }
      if (activeTab === 'users') {
        fetchUsersCourse()
        setSelectedUsers([])
      } else if (activeTab === 'add-users') {
        fetchUsers()
        setSelectedUsers([])
      }
      closeModal()
    } catch (error) {
      console.error(`Error ${action} users:`, error)
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const year = date.getFullYear()
    return `${day}/${month}/${year}`
  }

  const handleExportExcel = () => {
    const filteredData = usersCourse.map(({ fullName, email, phone, dateOfBirth }) => ({
      fullName,
      email,
      phone,
      dateOfBirth: formatDate(dateOfBirth),
    }))

    const worksheet = XLSX.utils.json_to_sheet(filteredData)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Users')
    const wbout = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' })
    saveAs(new Blob([wbout], { type: 'application/octet-stream' }), 'users.xlsx')
  }

  const handleSelectedUser = (userId) => {
    setSelectedUsers((prevSelectedUsers) =>
      prevSelectedUsers.includes(userId)
        ? prevSelectedUsers.filter((id) => id !== userId)
        : [...prevSelectedUsers, userId],
    )
  }

  const handleSelectAll = () => {
    if (activeTab === 'users') {
      setSelectedUsers(
        usersCourse.length === selectedUsers.length ? [] : usersCourse.map((user) => user._id),
      )
    } else if (activeTab === 'add-users') {
      setSelectedUsers(users.length === selectedUsers.length ? [] : users.map((user) => user._id))
    }
  }

  const isHeaderCheckboxChecked =
    activeTab === 'users'
      ? usersCourse.length > 0 && selectedUsers.length === usersCourse.length
      : users.length > 0 && selectedUsers.length === users.length

  return (
    <CContainer>
      <CNav variant="tabs" className="mb-4">
        <CNavItem>
          <CNavLink active={activeTab === 'users'} onClick={() => handleTabChange('users')}>
            Users
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink active={activeTab === 'add-users'} onClick={() => handleTabChange('add-users')}>
            Add Users
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink
            active={activeTab === 'export-exl'}
            onClick={() => handleTabChange('export-exl')}
          >
            Export Excel
          </CNavLink>
        </CNavItem>
      </CNav>

      <CInputGroup className="mb-3">
        <CFormInput
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <CInputGroupText style={{ cursor: 'pointer' }} onClick={handleSearch}>
          <CIcon icon={cilSearch} />
        </CInputGroupText>
      </CInputGroup>

      {activeTab === 'users' && (
        <div>
          <CContainer className="d-flex justify-content-end mb-4 gap-3">
            {/*<CButton onClick={() => setActiveTab('add-users')} color="primary" size="sm">*/}
            {/*  Add User*/}
            {/*</CButton>*/}
            <CButton onClick={() => setActiveTab('export-exl')} color="primary" size="sm">
              Export
            </CButton>
            <CButton
              color="primary"
              size="sm"
              disabled={selectedUsers.length === 0}
              onClick={() => setModalState({ ...modalState, delete: true })}
            >
              Delete
            </CButton>
          </CContainer>

          <UsersTable
            users={usersCourse}
            showDeleteButton={true}
            showAddButton={false}
            handleUserAction={handleUserAction}
            handleSelectedUser={handleSelectedUser}
            selectedUsers={selectedUsers}
            isHeaderCheckboxChecked={isHeaderCheckboxChecked}
            handleSelectAll={handleSelectAll}
          />
          <div className="d-flex justify-content-center mt-3">
            <CPagination aria-label="Page navigation example">
              <CPaginationItem
                aria-label="Previous"
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
              >
                <CIcon icon={cilChevronCircleLeftAlt} />
              </CPaginationItem>
              {[...Array(totalPages)].map((_, i) => (
                <CPaginationItem
                  key={i + 1}
                  active={currentPage === i + 1}
                  onClick={() => handlePageChange(i + 1)}
                >
                  {i + 1}
                </CPaginationItem>
              ))}
              <CPaginationItem
                aria-label="Next"
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
              >
                <CIcon icon={cilChevronCircleRightAlt} />
              </CPaginationItem>
            </CPagination>
          </div>
        </div>
      )}

      {activeTab === 'add-users' && (
        <div>
          <CContainer className="d-flex justify-content-end mb-4 gap-3">
            <CButton
              color="primary"
              size="sm"
              disabled={selectedUsers.length === 0}
              onClick={() => setModalState({ ...modalState, add: true })}
            >
              Add Users
            </CButton>
          </CContainer>

          <UsersTable
            users={users}
            showAddButton={true}
            showDeleteButton={false}
            handleUserAction={handleUserAction}
            handleSelectedUser={handleSelectedUser}
            selectedUsers={selectedUsers}
            isHeaderCheckboxChecked={isHeaderCheckboxChecked}
            handleSelectAll={handleSelectAll}
          />

          <div className="d-flex justify-content-center mt-3">
            <CPagination aria-label="Page navigation example">
              <CPaginationItem
                aria-label="Previous"
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
              >
                <CIcon icon={cilChevronCircleLeftAlt} />
              </CPaginationItem>
              {[...Array(totalPages)].map((_, i) => (
                <CPaginationItem
                  key={i + 1}
                  active={currentPage === i + 1}
                  onClick={() => handlePageChange(i + 1)}
                >
                  {i + 1}
                </CPaginationItem>
              ))}
              <CPaginationItem
                aria-label="Next"
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
              >
                <CIcon icon={cilChevronCircleRightAlt} />
              </CPaginationItem>
            </CPagination>
          </div>
        </div>
      )}

      {activeTab === 'export-exl' && (
        <CCard className="py-5">
          <CCardBody className="text-center">
            <div>
              <h2>Export users of courses to Excel</h2>
              <CButton color="primary" className="mt-3" onClick={handleExportExcel}>
                Export
              </CButton>
            </div>
          </CCardBody>
        </CCard>
      )}

      <AddModal
        visible={modalState.add}
        onClose={closeModal}
        onConfirm={() => handleCourseAction('add')}
      />

      <DeleteModal
        visible={modalState.delete}
        onClose={closeModal}
        onConfirm={() => handleCourseAction('delete')}
      />
    </CContainer>
  )
}

export default CourseUsersManagementPage
