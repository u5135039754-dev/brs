import './TopBar.scss';
import { Link } from 'react-router';
import headerImage from '../../assets/icons/Window controls.svg';
import close from '../../assets/icons//Close icon.svg';
import big from '../../assets/icons/Maximize icon.svg';
import small from '../../assets/icons/Minimize icon.svg';
import React from 'react';

export const TopBar: React.FC = () => {
  return (
    <div className="top-bar favourites__top">
      <div className="nav menu-nav">
        <Link to="#">
          <img className="top-bar__logo" src={headerImage} alt="Logo" />
        </Link>
      </div>
      <span className="header__vsc">
        borys-portfolio — Visual Studio Code
      </span>
      <span className="header__vectors">
        <div className="header__vector-wrap">
          <img src={small} alt="" className="header__vector" />
        </div>
        <div className="header__vector-wrap">
          <img src={big} alt="" className="header__vector" />
        </div>
        <div className="header__vector-wrap">
          <img src={close} alt="" className="header__vector" />
        </div>
      </span>
    </div>
  );
};
