import React from 'react';
import { Container, Row, Col, Button, Navbar, Nav } from 'react-bootstrap';
import { FaUser, FaSignOutAlt, FaHome } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import '../styles/Header.css';

const Header = ({ user, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  return (
    <div className="header-section">
      <Container fluid className="py-3">
        <Row className="align-items-center">
          <Col md={6}>
            <div className="d-flex align-items-center gap-3">
              <div className="header-icon">
                <FaHome />
              </div>
              <div>
                <h1 className="mb-0">Gestiune Persoane</h1>
                <small className="text-muted">Administrare date personal identitare</small>
              </div>
            </div>
          </Col>
          <Col md={6} className="text-end">
            {user && (
              <div className="d-flex align-items-center justify-content-end gap-3">
                <div className="user-info">
                  <div className="user-name">
                    <FaUser className="me-2" />
                    {user.firstName} {user.lastName}
                  </div>
                  <small className="text-muted">{user.email}</small>
                </div>
                <Button
                  variant="outline-light"
                  size="sm"
                  onClick={handleLogout}
                  className="btn-logout"
                >
                  <FaSignOutAlt className="me-2" />
                  Logout
                </Button>
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Header;
