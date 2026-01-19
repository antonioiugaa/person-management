import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Container, Row, Col, Alert } from 'react-bootstrap';
import { FaCheckCircle, FaPlus } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { personAPI } from '../utils/api';
import PersonList from '../components/PersonList';
import PersonDetails from '../components/PersonDetails';
import PersonModal from '../components/PersonModal';
import DeleteConfirmModal from '../components/DeleteConfirmModal';
import Header from '../components/Header';
import '../styles/Dashboard.css';

const DashboardPage = () => {
  const { user, logout } = useAuth();
  const [persons, setPersons] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [personToDelete, setPersonToDelete] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copyMessage, setCopyMessage] = useState('');

  // useEffect 1: Fetch persons on mount
  useEffect(() => {
    fetchPersons();
  }, []);

  const fetchPersons = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await personAPI.getAll();
      setPersons(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // useMemo: Filter persons based on search term
  const filteredPersons = useMemo(() => {
    if (!searchTerm) return persons;
    
    return persons.filter(person =>
      `${person.firstName} ${person.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      person.cnp.includes(searchTerm) ||
      person.idNumber.includes(searchTerm)
    );
  }, [persons, searchTerm]);

  const isIdExpired = useCallback((expiryDate) => {
    return new Date(expiryDate) < new Date();
  }, []);

  const handleAddPerson = () => {
    setSelectedPerson(null);
    setIsEditing(false);
    setShowModal(true);
  };

  const handleEditPerson = (person) => {
    setSelectedPerson(person);
    setIsEditing(true);
    setShowModal(true);
  };

  const handleSavePerson = async (formData) => {
    try {
      setError(null);
      if (isEditing) {
        const updatedPerson = await personAPI.update(selectedPerson._id, formData);
        setPersons(persons.map(p => (p._id === updatedPerson._id ? updatedPerson : p)));
        setSelectedPerson(updatedPerson);
      } else {
        const newPerson = await personAPI.create(formData);
        setPersons([newPerson, ...persons]);
      }
      setShowModal(false);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeletePerson = (person) => {
    setPersonToDelete(person);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    try {
      setError(null);
      await personAPI.delete(personToDelete._id);
      setPersons(persons.filter(p => p._id !== personToDelete._id));
      setShowDeleteConfirm(false);
      setPersonToDelete(null);
      if (selectedPerson?._id === personToDelete._id) {
        setSelectedPerson(null);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const copyPersonalData = () => {
    if (!selectedPerson) return;

    const text = `Persoana ${selectedPerson.firstName} ${selectedPerson.lastName} s-a nascut in ziua de ${new Date(selectedPerson.birthDate).toLocaleDateString('ro-RO')} in orasul ${selectedPerson.birthPlace}. Identificata cu actul de identitate seria ${selectedPerson.idNumber}, eliberat la data de ${new Date(selectedPerson.issueDate).toLocaleDateString('ro-RO')}, care expira in ${new Date(selectedPerson.expiryDate).toLocaleDateString('ro-RO')}.`;

    navigator.clipboard.writeText(text).then(() => {
      setCopyMessage('Datele au fost copiate in clipboard!');
      setTimeout(() => setCopyMessage(''), 3000);
    });
  };

  return (
    <div className="app-wrapper">
      <Header user={user} onLogout={logout} />

      <Container fluid className="py-5 main-content">
        {error && (
          <Alert variant="danger" className="mb-4">
            {error}
          </Alert>
        )}

        {copyMessage && (
          <Alert variant="success" className="mb-4 alert-message">
            <FaCheckCircle className="me-2" />
            {copyMessage}
          </Alert>
        )}

        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <Row className="g-4">
            <Col lg={7}>
              <PersonList
                persons={filteredPersons}
                searchTerm={searchTerm}
                onSearchChange={(e) => setSearchTerm(e.target.value)}
                selectedPerson={selectedPerson}
                onSelectPerson={setSelectedPerson}
                onEditPerson={handleEditPerson}
                onDeletePerson={handleDeletePerson}
                isIdExpired={isIdExpired}
              />
            </Col>

            <Col lg={5}>
              <PersonDetails
                person={selectedPerson}
                onCopy={copyPersonalData}
                onEdit={() => handleEditPerson(selectedPerson)}
                onDelete={() => handleDeletePerson(selectedPerson)}
                isIdExpired={isIdExpired}
                copyMessage={copyMessage}
              />
            </Col>
          </Row>
        )}
      </Container>

      <PersonModal
        show={showModal}
        isEditing={isEditing}
        person={selectedPerson}
        onSave={handleSavePerson}
        onClose={() => setShowModal(false)}
      />

      <DeleteConfirmModal
        show={showDeleteConfirm}
        person={personToDelete}
        onConfirm={confirmDelete}
        onCancel={() => setShowDeleteConfirm(false)}
      />

      {/* Add Person Button */}
      <button
        className="btn-floating-add"
        onClick={handleAddPerson}
        title="Adauga Persoana Noua"
      >
        <FaPlus />
      </button>
    </div>
  );
};

export default DashboardPage;
