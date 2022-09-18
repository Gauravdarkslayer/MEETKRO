import React from 'react';
import styled from 'styled-components';


import Button from '@mui/material/Button';


const Header = () => {
  let current = new Date();
  console.log(current);
  current = current.toDateString();

  

  const HeaderOptions = ({ title, tooltip }) => {
    return (
      <Button
        style={{ width: 'fit-content', padding: '5px 0', marginLeft: '5px' }}
      >
        <span className='material-icons-outlined' style={{ color: '#63676c' }}>
          {title}
        </span>
      </Button>
    );
  };

  return (
    <HeaderContainer>
      <h2 style={{marginLeft: '110px', marginTop: '85px', fontWeight: '400', fontSize: '40px'}}>Meet Karo</h2>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 15px 10px 15px;
  height: 5%;
`;

const HeaderIcon = styled.img`
  object-fit: contain;
  height: 35px;
  width: auto;

  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;

const HeaderContent = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const HeaderContentLeft = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  color: #63676c;
  > h3 {
    font-weight: 100;
    margin-right: 10px;
  }
  margin-right: 30px;
`;

const HeaderContentRight = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const RoundImg = styled.img`
  object-fit: contain;
  height: 35px;
  width: auto;
  border-radius: 50%;
  cursor: pointer;
  margin-left: 10px;
  &:hover {
    opacity: 0.8;
  }
`;

;
export default Header;
