import { registerUser } from '../slices/AuthSlices'; 
import { useNavigate } from 'react-router-dom'; 
import { useDispatch,useSelector } from 'react-redux';
import { useState } from 'react';
import Joi from 'joi';

function Register() {
    const navigate = useNavigate(); 
    const dispatch = useDispatch(); 
    const [formData, setFormData] = useState({
      username: '',
      email: '',
      password: ''
    });

  const [errors, setErrors] = useState({});
  const authError=useSelector((state)=>{
    return state.auth.error;
  })
  // Define Joi schema
  const schema = Joi.object({
    username: Joi.string().min(3).max(30).required().messages({
      'string.empty': 'Username is required',
      'string.min': 'Username must be at least 3 characters long',
      'string.max': 'Username must not exceed 30 characters'
    }),
    email: Joi.string().email({ tlds: { allow: false } }).required().messages({
      'string.empty': 'Email is required',
      'string.email': 'Email must be a valid email address'
    }),
    password: Joi.string()
      .min(8)
      .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])'))
      .required()
      .messages({
        'string.empty': 'Password is required',
        'string.min': 'Password must be at least 8 characters long',
        'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character (!@#$%^&*)'
      })
  });

  // Password strength checks
  const getPasswordStrength = (password) => {
    return {
      hasMinLength: password.length >= 8,
      hasUpperCase: /[A-Z]/.test(password),
      hasLowerCase: /[a-z]/.test(password),
      hasNumber: /[0-9]/.test(password),
      hasSpecialChar: /[!@#$%^&*]/.test(password)
    };
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error for the field being edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const handleSubmit = (e) => {
    const redirect = () => {
      navigate('/login')
    }
    e.preventDefault();
    // Validate form data
    const { error } = schema.validate(formData, { abortEarly: false });
    
    if (error) {
      // Map errors to field names
      const validationErrors = {};
      error.details.forEach((detail) => {
        validationErrors[detail.path[0]] = detail.message;
      });
      setErrors(validationErrors);
    } else {
      // Validation passed
      console.log('Form Data:', formData);
      const payload = {
        userName: formData.username,
        email: formData.email,
        password: formData.password
      };
      dispatch(registerUser({formData: payload, redirect})); 
      setErrors({});
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ padding: '20px', maxWidth: '400px', width: '100%', margin: '0 auto' }}>
        <h1>Register Page</h1>
        {authError && <p style={{ color: 'red' }}>{authError}</p>}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <div>
            <label htmlFor="username" style={{ display: 'block', marginBottom: '5px', textAlign: 'left' }}>
              Username:
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              style={{ 
                width: '100%', 
                padding: '8px', 
                fontSize: '14px',
                borderRadius: '4px',
                border: errors.username ? '1px solid red' : '1px solid #ccc'
              }}
            />
            {errors.username && (
              <span style={{ color: 'red', fontSize: '12px', display: 'block', marginTop: '5px', textAlign: 'left' }}>
                {errors.username}
              </span>
            )}
          </div>

          <div>
            <label htmlFor="email" style={{ display: 'block', marginBottom: '5px', textAlign: 'left' }}>
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              style={{ 
                width: '100%', 
                padding: '8px', 
                fontSize: '14px',
                borderRadius: '4px',
                border: errors.email ? '1px solid red' : '1px solid #ccc'
              }}
            />
            {errors.email && (
              <span style={{ color: 'red', fontSize: '12px', display: 'block', marginTop: '5px', textAlign: 'left' }}>
                {errors.email}
              </span>
            )}
          </div>

          <div>
            <label htmlFor="password" style={{ display: 'block', marginBottom: '5px', textAlign: 'left' }}>
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              style={{ 
                width: '100%', 
                padding: '8px', 
                fontSize: '14px',
                borderRadius: '4px',
                border: errors.password ? '1px solid red' : '1px solid #ccc'
              }}
            />
            {errors.password && (
              <span style={{ color: 'red', fontSize: '12px', display: 'block', marginTop: '5px', textAlign: 'left' }}>
                {errors.password}
              </span>
            )}
            
            {formData.password && (
              <div style={{ 
                marginTop: '10px', 
                padding: '10px', 
                backgroundColor: '#f5f5f5', 
                borderRadius: '4px',
                border: '1px solid #e0e0e0'
              }}>
                <div style={{ fontSize: '13px', fontWeight: 'bold', marginBottom: '8px', textAlign: 'left' }}>
                  Password Requirements:
                </div>
                {(() => {
                  const strength = getPasswordStrength(formData.password);
                  return (
                    <div style={{ fontSize: '12px', textAlign: 'left' }}>
                      <div style={{ marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ color: strength.hasMinLength ? 'green' : '#999' }}>
                          {strength.hasMinLength ? '✓' : '○'}
                        </span>
                        <span style={{ color: strength.hasMinLength ? 'green' : '#666' }}>
                          At least 8 characters ({formData.password.length}/8)
                        </span>
                      </div>
                      <div style={{ marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ color: strength.hasUpperCase ? 'green' : '#999' }}>
                          {strength.hasUpperCase ? '✓' : '○'}
                        </span>
                        <span style={{ color: strength.hasUpperCase ? 'green' : '#666' }}>
                          One uppercase letter (A-Z)
                        </span>
                      </div>
                      <div style={{ marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ color: strength.hasLowerCase ? 'green' : '#999' }}>
                          {strength.hasLowerCase ? '✓' : '○'}
                        </span>
                        <span style={{ color: strength.hasLowerCase ? 'green' : '#666' }}>
                          One lowercase letter (a-z)
                        </span>
                      </div>
                      <div style={{ marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ color: strength.hasNumber ? 'green' : '#999' }}>
                          {strength.hasNumber ? '✓' : '○'}
                        </span>
                        <span style={{ color: strength.hasNumber ? 'green' : '#666' }}>
                          One number (0-9)
                        </span>
                      </div>
                      <div style={{ marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ color: strength.hasSpecialChar ? 'green' : '#999' }}>
                          {strength.hasSpecialChar ? '✓' : '○'}
                        </span>
                        <span style={{ color: strength.hasSpecialChar ? 'green' : '#666' }}>
                          One special character (!@#$%^&*)
                        </span>
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}
          </div>

          <button 
            type="submit" 
            style={{ 
              padding: '10px', 
              fontSize: '16px', 
              backgroundColor: '#646cff', 
              color: 'white', 
              border: 'none', 
              borderRadius: '4px', 
              cursor: 'pointer',
              marginTop: '10px'
            }}
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;