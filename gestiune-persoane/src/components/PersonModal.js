import React, { useState, useEffect } from 'react';
import { Modal, Form, Button, Row, Col } from 'react-bootstrap';
import { FaPlus, FaEdit, FaIdCard, FaUser, FaUpload } from 'react-icons/fa';
import '../styles/PersonModal.css';

const PersonModal = ({ show, isEditing, onSave, onClose, person }) => {
  const [formData, setFormData] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (show) {
      if (isEditing && person) {
        setFormData({
          ...person,
          birthDate: person.birthDate?.split('T')[0],
          issueDate: person.issueDate?.split('T')[0],
          expiryDate: person.expiryDate?.split('T')[0],
        });
      } else {
        setFormData({
          firstName: '',
          lastName: '',
          cnp: '',
          birthDate: '',
          birthPlace: '',
          nationality: 'Romana',
          idNumber: '',
          issueDate: '',
          expiryDate: '',
          idType: 'Buletin de identitate',
          idPhoto: null,
        });
      }
      setErrors({});
    }
  }, [show, isEditing, person]);

  const validateForm = (data) => {
    const newErrors = {};

    if (!data.firstName?.trim()) newErrors.firstName = 'Prenumele este obligatoriu';
    if (!data.lastName?.trim()) newErrors.lastName = 'Numele este obligatoriu';
    if (!data.cnp?.trim()) newErrors.cnp = 'CNP-ul este obligatoriu';
    else if (!/^\d{13}$/.test(data.cnp)) newErrors.cnp = 'CNP trebuie sa aiba 13 cifre';

    if (!data.birthDate) newErrors.birthDate = 'Data nasterii este obligatorie';
    if (!data.birthPlace?.trim()) newErrors.birthPlace = 'Locul nasterii este obligatoriu';
    if (!data.nationality?.trim()) newErrors.nationality = 'Nationalitatea este obligatorie';
    if (!data.idNumber?.trim()) newErrors.idNumber = 'Seria actului este obligatorie';
    if (!data.issueDate) newErrors.issueDate = 'Data eliberarii este obligatorie';
    if (!data.expiryDate) newErrors.expiryDate = 'Data expirarii este obligatorie';

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, idPhoto: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    const validationErrors = validateForm(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    onSave(formData);
  };

  if (!formData) return null;

  return (
    <Modal show={show} onHide={onClose} size="lg" centered>
      <Modal.Header closeButton className="modal-header-custom">
        <Modal.Title>
          {isEditing ? (
            <>
              <FaEdit className="me-2" />
              Editeaza Persoana
            </>
          ) : (
            <>
              <FaPlus className="me-2" />
              Adauga Persoana Noua
            </>
          )}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="modal-body-custom">
        <Form>
          <h6 className="form-section-title mb-3">
            <FaUser className="me-2" />
            Informatii Personale
          </h6>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Prenume *</Form.Label>
                <Form.Control
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  isInvalid={!!errors.firstName}
                  className="form-control-custom"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.firstName}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Nume *</Form.Label>
                <Form.Control
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  isInvalid={!!errors.lastName}
                  className="form-control-custom"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.lastName}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>CNP (13 cifre) *</Form.Label>
            <Form.Control
              type="text"
              name="cnp"
              value={formData.cnp}
              onChange={(e) =>
                setFormData(prev => ({
                  ...prev,
                  cnp: e.target.value.replace(/\D/g, ''),
                }))
              }
              maxLength="13"
              isInvalid={!!errors.cnp}
              className="form-control-custom"
            />
            <Form.Control.Feedback type="invalid">{errors.cnp}</Form.Control.Feedback>
          </Form.Group>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Data nasterii *</Form.Label>
                <Form.Control
                  type="date"
                  name="birthDate"
                  value={formData.birthDate}
                  onChange={handleChange}
                  isInvalid={!!errors.birthDate}
                  className="form-control-custom"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.birthDate}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Locul nasterii *</Form.Label>
                <Form.Control
                  type="text"
                  name="birthPlace"
                  value={formData.birthPlace}
                  onChange={handleChange}
                  isInvalid={!!errors.birthPlace}
                  className="form-control-custom"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.birthPlace}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-4">
            <Form.Label>Nationalitate *</Form.Label>
            <Form.Control
              type="text"
              name="nationality"
              value={formData.nationality}
              onChange={handleChange}
              isInvalid={!!errors.nationality}
              className="form-control-custom"
            />
            <Form.Control.Feedback type="invalid">{errors.nationality}</Form.Control.Feedback>
          </Form.Group>

          <hr />

          <h6 className="form-section-title mb-3 mt-4">
            <FaIdCard className="me-2" />
            Date Act de Identitate
          </h6>

          <Form.Group className="mb-3">
            <Form.Label>Tip act</Form.Label>
            <Form.Select
              name="idType"
              value={formData.idType}
              onChange={handleChange}
              className="form-control-custom"
            >
              <option>Buletin de identitate</option>
              <option>Pasaport</option>
              <option>Permis de conducere</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Seria/Numarul actului *</Form.Label>
            <Form.Control
              type="text"
              name="idNumber"
              value={formData.idNumber}
              onChange={(e) =>
                setFormData(prev => ({ ...prev, idNumber: e.target.value.toUpperCase() }))
              }
              isInvalid={!!errors.idNumber}
              className="form-control-custom"
            />
            <Form.Control.Feedback type="invalid">{errors.idNumber}</Form.Control.Feedback>
          </Form.Group>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Data eliberarii *</Form.Label>
                <Form.Control
                  type="date"
                  name="issueDate"
                  value={formData.issueDate}
                  onChange={handleChange}
                  isInvalid={!!errors.issueDate}
                  className="form-control-custom"
                />
                <Form.Control.Feedback type="invalid">{errors.issueDate}</Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Data expirarii *</Form.Label>
                <Form.Control
                  type="date"
                  name="expiryDate"
                  value={formData.expiryDate}
                  onChange={handleChange}
                  isInvalid={!!errors.expiryDate}
                  className="form-control-custom"
                />
                <Form.Control.Feedback type="invalid">{errors.expiryDate}</Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>
              <FaUpload className="me-2" />
              Incarca poza act de identitate
            </Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="form-control-custom"
            />
            {formData.idPhoto && (
              <div className="mt-3 text-center">
                <img src={formData.idPhoto} alt="Preview" className="img-preview" />
              </div>
            )}
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer className="modal-footer-custom">
        <Button variant="secondary" onClick={onClose}>
          Anuleaza
        </Button>
        <Button variant="primary" onClick={handleSave}>
          {isEditing ? 'Salveaza Modificari' : 'Adauga Persoana'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PersonModal;
