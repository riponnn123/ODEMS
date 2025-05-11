import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_ENDPOINTS } from '../../config/api';
import '../../styles/main.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'student' // Default role
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //console.log(formData);
      const response = await axios.post(API_ENDPOINTS.AUTH.LOGIN, formData);
      //console.log(response);
      
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('role', response.data.role);
      
      // Navigate based on role
      switch(response.data.role) {
        case 'student':
          navigate('/student/dashboard');
          break;
        case 'faculty':
          navigate('/faculty/dashboard');
          break;
        case 'admin':
          navigate('/admin/dashboard');
          break;
        default:
          navigate('/');
      }
    } catch (error) {
      setError(error.response?.data?.error || 'Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="card" style={{ maxWidth: '400px', margin: '0 auto' }}>
      <h2 className="text-center mb-2">Login</h2>
      {error && <div className="error-message mb-2" style={{ color: 'red' }}>{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label" htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-input"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            className="form-input"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="role">Role</label>
          <select
            id="role"
            name="role"
            className="form-input"
            value={formData.role}
            onChange={handleChange}
            required
          >
            <option value="student">Student</option>
            <option value="faculty">Faculty</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
          Login
        </button>
      </form>
      <p className="text-center mt-2">
        Don't have an account? <a href="/register">Register here</a>
      </p>
    </div>
  );
};

export default Login; 