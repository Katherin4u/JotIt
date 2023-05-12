// frontend/src/components/Navigation/index.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);


  console.log(sessionUser)

  return (
    <div className="navbar navbar-inverse navbar-fixed-left">
      <div className='home-profile-main-div'>
        <div className='home-and-profile'>
          <div className='home-and-profile'>
            {isLoaded && (
              <div className='profile-dropdown'>
                <ProfileButton user={sessionUser} />
              </div>
            )}
          </div>
          <div className='homelink-main-div'>
            <NavLink className='home-link' style={{ all: 'unset' }} exact to="/">Home</NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navigation;