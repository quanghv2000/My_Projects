import React from 'react';
import styled from 'styled-components/macro';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

export const P = styled.p`
  font-size: 1rem;
  line-height: 1.5;
  color: ${p => p.theme.textSecondary};
  color: #333333;
  margin: 0.625rem 0 1.5rem 0;
`;

export function NotFoundPage() {
  return (
    <React.Fragment>
      <Helmet>
        <title>404 Page Not Found</title>
        <meta name="description" content="Page not found" />
      </Helmet>
      <Wrapper>
        <Title>
          4
          <span role="img" aria-label="Crying Face">
            😢
          </span>
          4
        </Title>
        <P>Page not found.</P>
        <Link to="/resume">Go to Resume Page</Link>
      </Wrapper>
    </React.Fragment>
  );
}

const Wrapper = styled.div`
  height: calc(100vh);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  min-height: 320px;
  overflow-x: hidden;
  background: url('https://res.cloudinary.com/dtjin3cf6/image/upload/v1667398736/My%20Projects/My%20Resume/my_resume_bg_bnagqa.png');
`;

const Title = styled.div`
  margin-top: -8vh;
  font-weight: bold;
  color: ${p => p.theme.text};
  color: #333333;
  font-size: 3.375rem;

  span {
    font-size: 3.125rem;
  }
`;
