import React, { useState, useEffect } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilImage, cilPencil, cilDescription } from '@coreui/icons'

const BaseInputModule = ({ courseToEdit, onSubmit }) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  useEffect(() => {
    if (courseToEdit) {
      setTitle(courseToEdit.title)
      setDescription(courseToEdit.description)
    } else {
      setTitle('')
      setDescription('')
    }
  }, [courseToEdit])

  const handleSubmit = () => {
    onSubmit({
      title,
      description,
    })
  }

  return (
    <CContainer>
      <CRow className="justify-content-center">
        <CCol>
          <CCard>
            <CCardBody>
              <CForm onSubmit={handleSubmit}>
                <CInputGroup className="mb-3">
                  <CInputGroupText>
                    <CIcon icon={cilPencil} />
                  </CInputGroupText>
                  <CFormInput
                    type="text"
                    placeholder="Name"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </CInputGroup>

                <CInputGroup className="mb-3">
                  <CInputGroupText>
                    <CIcon icon={cilDescription} />
                  </CInputGroupText>
                  <CFormInput
                    type="text"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                </CInputGroup>
                <div className="d-grid">
                  <CButton color="primary" onClick={handleSubmit}>
                    {courseToEdit ? 'Edit module' : 'Add module'}
                  </CButton>
                </div>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  )
}

export default BaseInputModule
