import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import heart from '../img/Mail.png';
import lock from '../img/Lock.png';
import user from '../img/user.png';

// Styled components
const RegisterContainer = styled.div`
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

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const { name, email, password } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/register', formData);
      alert('Registration successful');
    } catch (error) {
      alert('Error registering');
    }
  };

  return (
    <RegisterContainer>
      <Heading>Register</Heading>
      <form onSubmit={onSubmit}>
        <Wrapper>
        <Icon  className='imgheart'  src={user} alt="heart" />
        <Input
            type="text"
            name="name"
            value={name}
            onChange={onChange}
            placeholder="Name"
            required
          />
        </Wrapper>
        
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
        <Input
            type="password"
            name="password"
            value={password}
            onChange={onChange}
            placeholder="Password"
            required
          />
      </Wrapper>
       
        <Button type="submit">Register</Button>
      </form>
      <p>Already have an account? <Link to="/login">Login here</Link></p>
    </RegisterContainer>
  );
};

export default Register;
