import { CButton, CModal, CModalBody, CModalFooter } from '@coreui/react'
import PropTypes from 'prop-types'
import React from 'react'

const DeleteModal = ({ visible, onClose, onConfirm }) => {
  return (
    <CModal visible={visible} onClose={onClose} backdrop="static">
      <CModalBody>
        <p className="modal-title">Are you sure you want to delete?</p>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={onClose}>
          No, Cancel
        </CButton>
        <CButton color="danger" onClick={onConfirm}>
          Yes, Delete
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

DeleteModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
}

export default DeleteModal
