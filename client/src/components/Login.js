import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import heart from '../img/Mail.png';
import lock from '../img/Lock.png';

// Styled components solved
const LoginContainer = styled.div`
  max-width: 400px;
  margin-top: 10%;
  margin-left: 37%;
  padding: 2rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: #f9f9f9;
`;

const Heading = styled.h2`
  margin-bottom: 1rem;
  font-size: 24px;
  text-align: center;
  color: #333;
`;

const Input = styled.input`
   width: 93%;
  padding: 0.8rem;
  padding-left: 25px;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 16px;
  margin-right: 10px;
  background: url("") no-repeat left;
  background-size: 20px;
`;

const Input2 = styled.input`
  width: 93%;
  padding: 0.8rem;
  padding-left: 25px;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 16px;
  margin-right: 10px;
  background: url("C:/Fullstack-test/my-appq/client/src/img/Lock.png") no-repeat left;
  background-size: 20px;
`;

const Button = styled.button`
  width: 100%;
  padding: 0.8rem;
  border: none;
  border-radius: 8px;
  background-color: #007bff;
  color: white;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const Icon = styled.img`
  height: 1.5rem;
  width: 1.5rem;
  position: absolute;
  box-sizing:border-box;
  top:40%;
  left:2px;
  transform: translateY(-50%);
`;
const Wrapper = styled.div`
  position:relative
`;

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const { email, password } = formData;

  const navigate = useNavigate(); // Hook for navigation

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/login', formData);
      localStorage.setItem('token', response.data.token);
      alert('Login successful');
      navigate('/dashboard'); // Redirect to the home page or desired route
    } catch (error) {
      alert('Error logging in');
    }
  };

  return (
    <LoginContainer>
      <Heading>Login</Heading>
      <form onSubmit={onSubmit}>
      <Wrapper>
      <Icon  className='imgheart'  src={heart} alt="heart" />
      <Input
          type="email"
          name="email"
          value={email}
          onChange={onChange}
          placeholder="Email"
          required
        />
      </Wrapper>  
      <Wrapper>
      <Icon  className='imgheart'  src={lock} alt="heart" />
        <Input2
          type="password"
          name="password"
          value={password}
          onChange={onChange}
          placeholder="Password"
          className="password-input"
          required
          
        />
      </Wrapper>
      <Button type="submit">Login</Button>
      </form>
      <p>Don't have an account? <Link to="/register">Register here</Link></p>
    </LoginContainer>
  );
};

export default Login;
