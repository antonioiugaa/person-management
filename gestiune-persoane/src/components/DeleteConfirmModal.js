import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { FaTimesCircle, FaTrash } from 'react-icons/fa';
import '../styles/DeleteConfirmModal.css';

const DeleteConfirmModal = ({ show, person, onConfirm, onCancel }) => {
  return (
    <Modal show={show} onHide={onCancel} centered>
      <Modal.Header closeButton className="modal-header-custom">
        <Modal.Title>
          <FaTimesCircle className="me-2 text-danger" />
          Confirma Stergere
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-body-custom">
        <p className="mb-0">
          Esti sigur ca doresti sa stergi <strong>{person?.firstName} {person?.lastName}</strong>?
        </p>
        <p className="text-muted small mt-2">
          Aceasta actiune nu poate fi anulata.
        </p>
      </Modal.Body>
      <Modal.Footer className="modal-footer-custom">
        <Button variant="secondary" onClick={onCancel}>
          Anuleaza
        </Button>
        <Button variant="danger" onClick={onConfirm}>
          <FaTrash className="me-2" />
          Sterge
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteConfirmModal;
