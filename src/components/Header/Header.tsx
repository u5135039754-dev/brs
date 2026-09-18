import './Header.scss';
import React from 'react';
import { TopBar } from '../TopBar/TopBar';

type Props = {};

export const Header: React.FC<Props> = () => {

  return (
    <header id="top" className="header">
      <div className="header__container">
        <TopBar/>
      </div>
    </header>
  );
};
