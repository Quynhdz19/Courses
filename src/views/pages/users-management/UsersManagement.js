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
  CPaginationItem, CModal, CModalHeader, CModalTitle, CModalBody
} from "@coreui/react";
import CIcon from '@coreui/icons-react'
import { cilSearch, cilChevronCircleLeftAlt, cilChevronCircleRightAlt } from '@coreui/icons'
import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver'
import CourseService from 'src/services/CourseService'
import UsersTable from '../../components/courses-management/users/UsersTable'
import AddModal from '../../components/courses-management/courses/AddModal'
import DeleteModal from '../../components/courses-management/courses/DeleteModal'
import userService from 'src/services/UserService'
import BaseInputCourse from "src/views/components/courses-management/courses/BaseInputCourse";
import AddUserModal from "src/views/components/courses-management/courses/AddUserModal";

const UsersManagement = () => {
  const [users, setUsers] = useState([])
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
    fetchUsers()
    setSelectedUsers([])
  }, [activeTab, searchQuery])

  const fetchUsers = async () => {
    try {
      searchQuery.isInCourse = false
      const response = await userService.getUsers(searchQuery)
      setUsers(response.data)
      setTotalPages(response.metadata.totalPage)
    } catch (error) {
      console.error('Error fetching users:', error)
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
      fetchUsers()
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
    const filteredData = users.map(({ fullName, email, phone, dateOfBirth }) => ({
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
      setSelectedUsers(users.length === selectedUsers.length ? [] : users.map((user) => user._id))
    } else if (activeTab === 'add-users') {
      setSelectedUsers(users.length === selectedUsers.length ? [] : users.map((user) => user._id))
    }
  }

  const openModal = (type, course = null) => {
    setModalState({ add: type === 'add', edit: type === 'edit', delete: type === 'delete' })
    // setCourseToDelete(course) setCourseToEdit(course)
  }

  const isHeaderCheckboxChecked =
    activeTab === 'users'
      ? users.length > 0 && selectedUsers.length === users.length
      : users.length > 0 && selectedUsers.length === users.length

  return (
    <CContainer>
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

      <CContainer className="d-flex justify-content-end mb-4 gap-3">
        <CButton color="primary" size="sm" onClick={() => openModal('add')}>
          Add users
        </CButton>
        <CButton color="primary" size="sm" onClick={handleExportExcel}>
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
        users={users}
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
      <DeleteModal
        visible={modalState.delete}
        onClose={closeModal}
        onConfirm={() => handleCourseAction('delete')}
      />
      <CModal
        visible={modalState.add}
        onClose={closeModal}
        backdrop="static"
        className="modal-lg d-flex justify-content-center align-items-center"
      >
        <CModalHeader>
          <CModalTitle>Add course</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <AddUserModal onSubmit={(courseData) => handleCourseAction('add', courseData)} />
        </CModalBody>
      </CModal>
    </CContainer>
  )
}

export default UsersManagement
