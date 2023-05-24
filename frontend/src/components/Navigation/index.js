// frontend/src/components/Navigation/index.js
import React, { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import OpenModalMenuItem from './OpenModalMenuItem';
import CreateTasks from '../CreateTask';
import CreateNotebook from '../CreateNotebook';
import AllNotebooks from '../Notebooks'

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  // open menu logic
  const openCloseMenu = () => {
    // if (showMenu) return;
    setShowMenu(!showMenu);
  };

  // return component
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
          <div style={{ paddingTop: '1px' }}>
            <div className='notebooklink-main-div'>
              <button style={{ all: 'unset', cursor: 'pointer', color: 'white' }} onClick={openCloseMenu} className='notebooks-link' exact to='/notebooks'>Notebooks
                {showMenu ? (
                  <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: "center" }}>
                    {/* <div className="main-container-user-info">
                      <div className="username">hello</div>
                    </div> */}
                    <AllNotebooks />
                    <i class="fa-sharp fa-solid fa-angle-up"></i>
                  </div>
                ) : (
                  <div className="profile-arrow" >
                    <i class="fa-sharp fa-solid fa-angle-down"></i>
                  </div>
                )
                }
              </button>
            </div>
          </div>
          <div style={{ paddingTop: '2px' }}>
            <OpenModalMenuItem
              itemText='Create Notebook'
              modalComponent={<CreateNotebook />}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navigation;