import React from 'react';
import styled from 'styled-components';

import { axiosDev } from '../utils/axiosDev';
import Friend from './Friend';
import AddFriend from './AddFriend';

class FriendList extends React.Component {
  state = {
    friends: [],
  };

  componentDidMount() {
    axiosDev()
      .get('/friends')
      .then((res) => {
        this.setState({
          friends: res.data,
        });
      })
      .catch((err) => console.log(err));
  }

  render() {
    console.log(this.state.friends);
    return (
      <Container>
        {this.state.friends.length > 1 ? (
          <>
            <AddFriend />
            <div className='friend-container'>
              <h1>Friends:</h1>
              {this.state.friends.map((friend) => (
                <Friend key={friend.id} friend={friend} />
              ))}
            </div>
          </>
        ) : (
          <Loader />
        )}
      </Container>
    );
  }
}

export default FriendList;

const Container = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-direction: row;
  align-items: center;
`;

const Loader = styled.div`
  border: 16px solid #f3f3f3;
  border-top: 16px solid #3498db;
  border-radius: 50%;
  width: 75px;
  height: 75px;
  animation: spin 1s linear infinite;
  margin: 20px;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
