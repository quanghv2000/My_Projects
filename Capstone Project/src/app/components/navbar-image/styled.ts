import styled from 'styled-components/macro';
import { Link } from 'app/components/link';

export const WrapperNav = styled.nav`
  display: flex;
  margin-right: -1rem;
  margin-right: 10px;
`;

export const LinkItem = styled(Link)`
  color: ${p => p.theme.primary};
  cursor: pointer;
  text-decoration: none;
  display: flex;
  padding: 0.25rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  align-items: center;

  &:hover {
    opacity: 0.8;
    text-decoration: none;
  }

  &:active {
    opacity: 0.4;
  }

  .icon {
    margin-right: 0.25rem;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const TitleLink = styled(Link)`
  font-size: 1.25rem;
  color: ${p => p.theme.text};
  font-weight: bold;
  margin-right: 1rem;
  &:hover {
    text-decoration: none;
  }
`;

export const Description = styled.div`
  font-size: 1.1rem;
  color: ${p => p.theme.textSecondary};
  font-weight: normal;
`;
