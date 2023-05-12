// frontend/src/components/Navigation/index.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  return (
    <div className="navbar navbar-inverse navbar-fixed-left">
      <div className='home-profile-main-div'>
        <div className='home-and-profile'>
          <div>
            <NavLink className='home-link' exact to="/">Home</NavLink>
          </div>
        </div>
        <div className='home-and-profile'>
          {isLoaded && (
            <li className='profile-dropdown'>
              <ProfileButton user={sessionUser} />
            </li>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navigation;