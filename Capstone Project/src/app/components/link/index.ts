import styled from 'styled-components/macro';
import { Link as RouterLink } from 'react-router-dom';

export const Link = styled(RouterLink)`
  color: ${(p) => p.theme.primary};
  text-decoration: none;

  &:hover {
    text-decoration: none;
    opacity: 0.8;
  }

  &:active {
    opacity: 0.4;
  }
`;
