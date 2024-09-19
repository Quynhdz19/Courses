import { CButton, CModal, CModalBody, CModalFooter } from '@coreui/react'
import PropTypes from 'prop-types'
import React from 'react'

const AddModal = ({ visible, onClose, onConfirm }) => {
  return (
    <CModal visible={visible} onClose={onClose} backdrop="static">
      <CModalBody>
        <p className="modal-title">Are you sure you want to add the selected users to the course?</p>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={onClose}>
          No, Cancel
        </CButton>
        <CButton color="primary" onClick={onConfirm}>
          Yes, Add
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

AddModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
}

export default AddModal
