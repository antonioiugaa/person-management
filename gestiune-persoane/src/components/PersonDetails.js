import React, { useCallback } from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import { FaCopy, FaEdit, FaTrash, FaUser, FaIdCard, FaCalendar, FaMapMarkerAlt, FaCheckCircle } from 'react-icons/fa';
import '../styles/PersonDetails.css';

const PersonDetails = ({
  person,
  onCopy,
  onEdit,
  onDelete,
  isIdExpired,
  copyMessage,
}) => {
  const getInitials = useCallback((firstName, lastName) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  }, []);

  if (!person) {
    return (
      <Card className="card-details shadow-sm h-100">
        <Card.Body className="d-flex align-items-center justify-content-center empty-details">
          <div className="text-center">
            <FaUser className="empty-icon-large" />
            <p>Selecteaza o persoana din lista pentru a vedea detaliile</p>
          </div>
        </Card.Body>
      </Card>
    );
  }

  return (
    <Card className="card-details shadow-sm h-100">
      <Card.Header className="card-header-custom border-0">
        <div className="d-flex align-items-center gap-3">
          <div className="details-avatar large">
            {getInitials(person.firstName, person.lastName)}
          </div>
          <div>
            <h5 className="mb-0">
              {person.firstName} {person.lastName}
            </h5>
            <small className="text-muted">ID: {person.idNumber}</small>
          </div>
        </div>
      </Card.Header>

      <Card.Body className="details-body">
        {copyMessage && (
          <div className="alert alert-success mb-3">
            <FaCheckCircle className="me-2" />
            {copyMessage}
          </div>
        )}

        {person.idPhoto && (
          <div className="id-photo-container mb-4">
            <img src={person.idPhoto} alt="ID Document" className="id-photo" />
          </div>
        )}

        <div className="details-section">
          <h6 className="section-title">
            <FaUser className="me-2" /> Informatii Personale
          </h6>
          <div className="detail-item">
            <span className="detail-label">Prenume:</span>
            <span className="detail-value">{person.firstName}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Nume:</span>
            <span className="detail-value">{person.lastName}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">CNP:</span>
            <span className="detail-value">{person.cnp}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">
              <FaCalendar className="me-1" /> Data nasterii:
            </span>
            <span className="detail-value">
              {new Date(person.birthDate).toLocaleDateString('ro-RO')}
            </span>
          </div>
          <div className="detail-item">
            <span className="detail-label">
              <FaMapMarkerAlt className="me-1" /> Locul nasterii:
            </span>
            <span className="detail-value">{person.birthPlace}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Nationalitate:</span>
            <span className="detail-value">{person.nationality}</span>
          </div>
        </div>

        <hr className="my-4" />

        <div className="details-section">
          <h6 className="section-title">
            <FaIdCard className="me-2" /> Act de Identitate
          </h6>
          <div className="detail-item">
            <span className="detail-label">Tip:</span>
            <span className="detail-value">{person.idType}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Seria:</span>
            <span className="detail-value">{person.idNumber}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">
              <FaCalendar className="me-1" /> Eliberat:
            </span>
            <span className="detail-value">
              {new Date(person.issueDate).toLocaleDateString('ro-RO')}
            </span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Expira:</span>
            <span className="detail-value">
              {new Date(person.expiryDate).toLocaleDateString('ro-RO')}
              {isIdExpired(person.expiryDate) && (
                <Badge bg="danger" className="ms-2">
                  Expirat
                </Badge>
              )}
            </span>
          </div>
        </div>

        <div className="details-actions mt-4">
          <Button
            variant="success"
            className="w-100 mb-2 btn-action-lg"
            onClick={onCopy}
          >
            <FaCopy className="me-2" />
            Copiaza Date Personale
          </Button>
          <Button
            variant="primary"
            className="w-100 mb-2 btn-action-lg"
            onClick={onEdit}
          >
            <FaEdit className="me-2" />
            Editeaza
          </Button>
          <Button
            variant="danger"
            className="w-100 btn-action-lg"
            onClick={onDelete}
          >
            <FaTrash className="me-2" />
            Sterge
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default PersonDetails;
