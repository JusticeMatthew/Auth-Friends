import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const initialFormValues = {
  username: '',
  password: '',
};

export default function Login({ history }) {
  const [formValues, setFormValues] = useState(initialFormValues);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:5000/api/login', formValues)
      .then((res) => {
        localStorage.setItem('token', res.data.payload);
        history.push('/friends');
      })
      .catch((err) => {
        setError(err.response.data.error);
      });
  };

  return (
    <Container>
      <h1>Got Friends?</h1>
      <form className='login-form' onSubmit={handleSubmit}>
        <label htmlFor='username'>Username:</label>
        <br />
        <input
          name='username'
          type='text'
          onChange={handleChange}
          value={formValues.username}
        />
        <br />
        <label htmlFor='password'>Password:</label>
        <br />
        <input
          name='password'
          type='text'
          onChange={handleChange}
          value={formValues.password}
        />
        <br />
        <button>Log in</button>
      </form>
      {error && (
        <>
          <h2>Error: {error}</h2>
        </>
      )}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  .login-form {
    display: flex;
    flex-direction: column;
    width: 200px;
    text-align: center;
  }

  button {
    margin: 15px 0;
  }
`;
