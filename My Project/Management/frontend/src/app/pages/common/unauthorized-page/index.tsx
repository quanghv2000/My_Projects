import React from 'react';
import styled from 'styled-components/macro';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

type IProps = {};

export const UnauthorizedPage: React.FC<IProps> = () => {
  return (
    <React.Fragment>
      <Helmet>
        <title>401 Unauthorized</title>
        <meta name="description" content="Page not found" />
      </Helmet>
      <Wrapper>
        <Title>
          4
          <span role="img" aria-label="Crying Face">
            😢
          </span>
          1
        </Title>
        <P>Unauthorized</P>
        <Link to="/home">Go to Home Page</Link>
      </Wrapper>
    </React.Fragment>
  );
};

const Wrapper = styled.div`
  height: calc(100vh);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  min-height: 320px;
`;

const Title = styled.div`
  margin-top: -8vh;
  font-weight: bold;
  color: ${p => p.theme.text};
  font-size: 3.375rem;

  span {
    font-size: 3.125rem;
  }
`;

const P = styled.p`
  font-size: 1rem;
  line-height: 1.5;
  color: ${p => p.theme.textSecondary};
  margin: 0.625rem 0 1.5rem 0;
`;
