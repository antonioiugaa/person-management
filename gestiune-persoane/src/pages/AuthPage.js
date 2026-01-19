import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert, Tabs, Tab } from 'react-bootstrap';
import { FaSignInAlt, FaUserPlus, FaEnvelope, FaLock, FaUser } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../styles/Auth.css';

const AuthPage = () => {
  const { login, register, error, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('login');
  const [loading, setLoading] = useState(false);

  // Login form state
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
  });

  // Register form state
  const [registerForm, setRegisterForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [formErrors, setFormErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const validateLoginForm = () => {
    const errors = {};
    if (!loginForm.email) errors.email = 'Email is required';
    if (!loginForm.password) errors.password = 'Password is required';
    return errors;
  };

  const validateRegisterForm = () => {
    const errors = {};
    if (!registerForm.firstName) errors.firstName = 'First name is required';
    if (!registerForm.lastName) errors.lastName = 'Last name is required';
    if (!registerForm.email) errors.email = 'Email is required';
    if (!registerForm.password) errors.password = 'Password is required';
    if (registerForm.password !== registerForm.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    return errors;
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginForm(prev => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterForm(prev => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log('Login form submitted');
    const errors = validateLoginForm();

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setLoading(true);
    try {
      await login(loginForm.email, loginForm.password);
      setSuccessMessage('Login successful! Redirecting...');
      setTimeout(() => navigate('/dashboard'), 1000);
    } catch (err) {
      setFormErrors({ submit: err.message });
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    console.log('Register form submitted with:', registerForm);
    const errors = validateRegisterForm();

    if (Object.keys(errors).length > 0) {
      console.log('Form errors:', errors);
      setFormErrors(errors);
      return;
    }

    setLoading(true);
    try {
      console.log('Calling register...');
      await register(
        registerForm.firstName,
        registerForm.lastName,
        registerForm.email,
        registerForm.password,
        registerForm.confirmPassword
      );
      setSuccessMessage('Registration successful! Redirecting...');
      setTimeout(() => navigate('/dashboard'), 1000);
    } catch (err) {
      setFormErrors({ submit: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col md={6} lg={5}>
            <Card className="auth-card shadow-lg">
              <Card.Header className="auth-header">
                <div className="auth-header-content">
                  <h2>Gestiune Persoane</h2>
                  <p>Administrare date identitare</p>
                </div>
              </Card.Header>

              <Card.Body className="auth-body">
                {successMessage && (
                  <Alert variant="success" className="mb-4">
                    {successMessage}
                  </Alert>
                )}

                {(error || formErrors.submit) && (
                  <Alert variant="danger" className="mb-4">
                    {error || formErrors.submit}
                  </Alert>
                )}

                <Tabs
                  id="auth-tabs"
                  activeKey={activeTab}
                  onSelect={(k) => {
                    setActiveTab(k);
                    setFormErrors({});
                  }}
                  className="mb-4 auth-tabs"
                >
                  <Tab
                    eventKey="login"
                    title={<><FaSignInAlt className="me-2" /> Login</>}
                  >
                    <Form onSubmit={handleLogin}>
                      <Form.Group className="mb-3">
                        <Form.Label>
                          <FaEnvelope className="me-2" /> Email Address
                        </Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          value={loginForm.email}
                          onChange={handleLoginChange}
                          isInvalid={!!formErrors.email}
                          placeholder="your@email.com"
                          className="form-control-auth"
                        />
                        <Form.Control.Feedback type="invalid">
                          {formErrors.email}
                        </Form.Control.Feedback>
                      </Form.Group>

                      <Form.Group className="mb-4">
                        <Form.Label>
                          <FaLock className="me-2" /> Password
                        </Form.Label>
                        <Form.Control
                          type="password"
                          name="password"
                          value={loginForm.password}
                          onChange={handleLoginChange}
                          isInvalid={!!formErrors.password}
                          placeholder="Your password"
                          className="form-control-auth"
                        />
                        <Form.Control.Feedback type="invalid">
                          {formErrors.password}
                        </Form.Control.Feedback>
                      </Form.Group>

                      <Button
                        variant="primary"
                        type="submit"
                        className="w-100 btn-auth"
                        disabled={loading}
                      >
                        {loading ? 'Logging in...' : 'Login'}
                      </Button>
                    </Form>
                  </Tab>

                  <Tab
                    eventKey="register"
                    title={<><FaUserPlus className="me-2" /> Register</>}
                  >
                    <Form onSubmit={handleRegister}>
                      <Row>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>
                              <FaUser className="me-2" /> First Name
                            </Form.Label>
                            <Form.Control
                              type="text"
                              name="firstName"
                              value={registerForm.firstName}
                              onChange={handleRegisterChange}
                              isInvalid={!!formErrors.firstName}
                              placeholder="John"
                              className="form-control-auth"
                            />
                            <Form.Control.Feedback type="invalid">
                              {formErrors.firstName}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                              type="text"
                              name="lastName"
                              value={registerForm.lastName}
                              onChange={handleRegisterChange}
                              isInvalid={!!formErrors.lastName}
                              placeholder="Doe"
                              className="form-control-auth"
                            />
                            <Form.Control.Feedback type="invalid">
                              {formErrors.lastName}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                      </Row>

                      <Form.Group className="mb-3">
                        <Form.Label>
                          <FaEnvelope className="me-2" /> Email Address
                        </Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          value={registerForm.email}
                          onChange={handleRegisterChange}
                          isInvalid={!!formErrors.email}
                          placeholder="your@email.com"
                          className="form-control-auth"
                        />
                        <Form.Control.Feedback type="invalid">
                          {formErrors.email}
                        </Form.Control.Feedback>
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>
                          <FaLock className="me-2" /> Password
                        </Form.Label>
                        <Form.Control
                          type="password"
                          name="password"
                          value={registerForm.password}
                          onChange={handleRegisterChange}
                          isInvalid={!!formErrors.password}
                          placeholder="Your password"
                          className="form-control-auth"
                        />
                        <Form.Control.Feedback type="invalid">
                          {formErrors.password}
                        </Form.Control.Feedback>
                      </Form.Group>

                      <Form.Group className="mb-4">
                        <Form.Label>
                          <FaLock className="me-2" /> Confirm Password
                        </Form.Label>
                        <Form.Control
                          type="password"
                          name="confirmPassword"
                          value={registerForm.confirmPassword}
                          onChange={handleRegisterChange}
                          isInvalid={!!formErrors.confirmPassword}
                          placeholder="Confirm password"
                          className="form-control-auth"
                        />
                        <Form.Control.Feedback type="invalid">
                          {formErrors.confirmPassword}
                        </Form.Control.Feedback>
                      </Form.Group>

                      <Button
                        variant="success"
                        type="submit"
                        className="w-100 btn-auth"
                        disabled={loading}
                      >
                        {loading ? 'Registering...' : 'Register'}
                      </Button>
                    </Form>
                  </Tab>
                </Tabs>
              </Card.Body>
            </Card>

            <div className="auth-footer mt-4 text-center text-muted">
              <small>Demo Credentials: demo@example.com / password123</small>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AuthPage;
