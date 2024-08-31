import React from 'react'
import PropTypes from 'prop-types'
import { CModal, CModalHeader, CModalBody, CModalFooter, CButton } from '@coreui/react'

const DeleteDialog = ({ visible, onClose, onConfirm }) => {
  return (
    <CModal visible={visible} onDismiss={onClose} backdrop="static">
      <CModalHeader>
        <h5 className="modal-title">Are you sure you want to delete?</h5>
      </CModalHeader>
      <CModalBody>
        <p>Are you sure you want to delete this item?</p>
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

DeleteDialog.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
}

export default DeleteDialog
