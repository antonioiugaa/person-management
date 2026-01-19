import React, { useCallback } from 'react';
import { Form } from 'react-bootstrap';
import { FaSearch, FaUser } from 'react-icons/fa';
import '../styles/PersonList.css';

const PersonList = ({
  persons,
  searchTerm,
  onSearchChange,
  selectedPerson,
  onSelectPerson,
  onEditPerson,
  onDeletePerson,
  isIdExpired,
}) => {
  const getInitials = useCallback((firstName, lastName) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  }, []);

  return (
    <div className="card-list shadow-sm h-100">
      <div className="card-header-custom pb-0">
        <Form.Group className="search-group mb-0">
          <Form.Control
            size="lg"
            type="text"
            placeholder="Cauta dupa nume, CNP sau seria actului..."
            value={searchTerm}
            onChange={onSearchChange}
            className="search-input"
          />
          <FaSearch className="search-icon" />
        </Form.Group>
      </div>

      <div className="persons-list">
        {persons.length === 0 ? (
          <div className="empty-state">
            <FaUser className="empty-icon" />
            <p>Nicio persoana gasita</p>
          </div>
        ) : (
          <div className="list-container">
            {persons.map(person => (
              <div
                key={person._id}
                className={`person-item ${selectedPerson?._id === person._id ? 'active' : ''}`}
                onClick={() => onSelectPerson(person)}
              >
                <div className="person-avatar">
                  {getInitials(person.firstName, person.lastName)}
                </div>
                <div className="person-info flex-grow-1">
                  <div className="person-name">
                    {person.firstName} {person.lastName}
                  </div>
                  <div className="person-cnp">CNP: {person.cnp}</div>
                </div>
                <div className="person-actions" onClick={(e) => e.stopPropagation()}>
                  <button
                    className="btn-action btn-edit"
                    onClick={() => onEditPerson(person)}
                    title="Editeaza"
                  >
                    ✏️
                  </button>
                  <button
                    className="btn-action btn-delete"
                    onClick={() => onDeletePerson(person)}
                    title="Sterge"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PersonList;
