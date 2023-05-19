// frontend/src/components/Navigation/index.js
import React, { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import OpenModalMenuItem from './OpenModalMenuItem';
import CreateTasks from '../CreateTask';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

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
            <NavLink className='home-link' exact to="/">Home</NavLink>
          </div>
          <div style={{ paddingTop: '1px' }}>
            <div className='tasklink-main-div'>
              <NavLink className='task-link' exact to='/tasks'>Tasks</NavLink>
            </div>

          </div>
          <div style={{ paddingTop: '2px' }}>
            <OpenModalMenuItem
              itemText='Create Task'
              modalComponent={<CreateTasks />}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navigation;