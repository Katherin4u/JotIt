import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import OpenModalMenuItem from './OpenModalMenuItem';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import './Navigation.css'

function ProfileButton({ user }) {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {
            if (!ulRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const closeMenu = () => setShowMenu(false);

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
        closeMenu();
    };

    const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

    return (
        <div>
            <div className="main-button-div">
                <button onClick={openMenu} className="profile-btn">
                    {user ? (
                        <div className="profile-arrow">
                            <img className="profile-image" src={user.imgUrl}></img>
                            <i class="fa-sharp fa-solid fa-angle-down"></i>
                        </div>
                    ) : (
                        <div className="profile-arrow" >
                            <i className="fas fa-user-circle" />
                            <i class="fa-sharp fa-solid fa-angle-down"></i>
                        </div>
                    )
                    }
                </button>
            </div>
            <div>
                <ul className={ulClassName} ref={ulRef} style={{ paddingLeft:'0px', margin: '10px'}}>
                    <div className="list-profile-dropdown">
                        {user ? (
                            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: "center"}}>
                                <div className="main-container-user-info">
                                    <div className="username">{user.username}</div>
                                    {/* <div className="firstname">{user.firstName} {user.lastName}</div> */}
                                    <div className="email">{user.email}</div>
                                </div>
                                <div>
                                    <button className="logout-button" onClick={logout}>Log Out</button>
                                </div>
                            </div>
                        ) : (
                            <div>
                                <div style={{ paddingBottom: "5px"}}>

                                <div className="Login-main-container">
                                    <OpenModalMenuItem
                                        itemText="Log In"
                                        onItemClick={closeMenu}
                                        modalComponent={<LoginFormModal />}
                                    />
                                </div>
                                </div>
                                <div className="signup-main-container">

                                    <OpenModalMenuItem
                                        itemText="Sign Up"
                                        onItemClick={closeMenu}
                                        modalComponent={<SignupFormModal />}
                                    />
                                </div>
                            </div>
                        )}

                    </div>
                </ul>
            </div>
        </div>
    );
}

export default ProfileButton;