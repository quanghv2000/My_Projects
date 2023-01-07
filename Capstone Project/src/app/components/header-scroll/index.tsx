import React, { useState, useEffect } from 'react';
import { NavBar } from 'app/components/navbar';

export interface HeaderScrollProps {}

export const HeaderScroll = (props: HeaderScrollProps) => {
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(250);

  const controlNavbar = () => {
    if (typeof window !== 'undefined') {
      if (window.scrollY < 320) {
        // if scroll up show the navbar
        setShow(true);
      } else {
        // if scroll down hide the navbar
        setShow(false);
      }

      // remember current page location to use in the next move
      setLastScrollY(window.scrollY);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', controlNavbar);

      // cleanup function
      return () => {
        window.removeEventListener('scroll', controlNavbar);
      };
    }
  }, [lastScrollY]);

  return (
    <div className={`active ${show && 'hidden'}`}>
      <NavBar />
    </div>
  );
};
