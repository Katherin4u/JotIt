import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import OpenModalMenuItem from './OpenModalMenuItem';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';

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
            <div>
                <button className="profile-button" onClick={openMenu}>
                    <i className="fas fa-user-circle" />
                </button>
            </div>
            <div>
                <ul className={ulClassName} ref={ulRef} style={{ display: 'flex', flexDirection: "column", position: 'relative',alignItems: "center", backgroundColor: "#FFF", top: '-15px', right: '-178px', boxShadow: " 0px 0px 14px 0.5px rgba(221, 221, 221, 0.7)", borderRadius: "15px", padding: '15px 0px', listStyle: "none", width: '200px', overflow: "hidden", height: '11em' }}>
                    {user ? (
                        <div>
                            <li>{user.username}</li>
                            <li>{user.firstName} {user.lastName}</li>
                            <li>{user.email}</li>
                            <li>
                                <button onClick={logout}>Log Out</button>
                            </li>
                        </div>
                    ) : (
                        <>
                            <OpenModalMenuItem
                                itemText="Log In"
                                onItemClick={closeMenu}
                                modalComponent={<LoginFormModal />}
                            />
                            <OpenModalMenuItem
                                itemText="Sign Up"
                                onItemClick={closeMenu}
                                modalComponent={<SignupFormModal />}
                            />
                        </>
                    )}
                </ul>
            </div>
        </div>
    );
}

export default ProfileButton;