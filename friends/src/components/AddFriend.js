import React, { useState } from 'react';
import styled from 'styled-components';
import { axiosDev } from '../utils/axiosDev';

const initialFormValues = {
  name: '',
  age: '',
  email: '',
};

export default function AddFriend({ history }) {
  const [formValues, setFormValues] = useState(initialFormValues);

  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const addFriend = () => {
    axiosDev()
      .post('/friends', formValues)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <Container>
      <h2>Add Friend: </h2>
      <form className='add-friend-form' onSubmit={addFriend}>
        <label htmlFor='name'>Name:</label>
        <br />
        <input
          name='name'
          type='text'
          onChange={handleChange}
          value={formValues.name}
        />
        <br />
        <label htmlFor='age'>Age:</label>
        <br />
        <input
          name='age'
          type='text'
          onChange={handleChange}
          value={formValues.age}
        />
        <br />
        <label htmlFor='email'>Email:</label>
        <br />
        <input
          name='email'
          type='email'
          onChange={handleChange}
          value={formValues.email}
        />
        <br />
        <button>Add Friend</button>
      </form>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  button {
    margin: 15px auto;
  }
`;
