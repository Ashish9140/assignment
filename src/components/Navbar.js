import React, { useState, useContext, useRef, useEffect } from 'react'
import { UserContext } from '../App';

const Navbar = ({ setThemeDark, themeDark }) => {
    const [isSwitch, setIsSwitch] = useState(false);
    const { setOrdering,
        setGrouping,
        grouping,
        ordering } = useContext(UserContext);

    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target) && !event.target.classList.contains('display-switch')) {
                setIsSwitch(false);
            }
        };
    
        window.addEventListener('click', handleClickOutside);
    
        return () => {
            window.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const handleGroupingChange = (event) => {
        let newGrouping = event.target.value;
        setGrouping(event.target.value);
        localStorage.setItem('grouping', newGrouping);
    };

    const handleOrderingChange = (event) => {
        let newOrdering = event.target.value;
        setOrdering(newOrdering);
        localStorage.setItem('ordering', newOrdering);
    };

    const handleTheme = () => {
        if (themeDark)
            setThemeDark(false);
        else
            setThemeDark(true);
    }

    return (
        <section className="navbar-main">
            <nav>
                <div className="display-switch-wrapper">
                    <div className="display-switch" onClick={(e) => { e.stopPropagation(); setIsSwitch(!isSwitch) }}>
                        <div className="switch-icon">
                            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 16 16" className="icon" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M3.5 2h-1v5h1V2zm6.1 5H6.4L6 6.45v-1L6.4 5h3.2l.4.5v1l-.4.5zm-5 3H1.4L1 9.5v-1l.4-.5h3.2l.4.5v1l-.4.5zm3.9-8h-1v2h1V2zm-1 6h1v6h-1V8zm-4 3h-1v3h1v-3zm7.9 0h3.19l.4-.5v-.95l-.4-.5H11.4l-.4.5v.95l.4.5zm2.1-9h-1v6h1V2zm-1 10h1v2h-1v-2z"></path>
                            </svg>
                        </div>
                        Display
                        <div className={`dropdown-icon ${isSwitch ? "rotate" : ''}`}>
                            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                <path fill="none" d="M0 0h24v24H0V0z"></path>
                                <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"></path>
                            </svg>
                        </div>
                    </div>
                    <section ref={dropdownRef} className={`dropdown-main ${isSwitch ? "show" : ''}`}>
                        <div className="dropdown-item grouping">
                            <span>Grouping</span>
                            <select name="grouping" id="grouping" value={grouping} onChange={handleGroupingChange}>
                                <option value="status">status</option>
                                <option value="user">user</option>
                                <option value="priority">priority</option>
                            </select>
                        </div>
                        <div className="dropdown-item ordering">
                            <span>Ordering</span>
                            <select name="ordering" id="ordering" value={ordering} onChange={handleOrderingChange}>
                                <option value="priority">priority</option>
                                <option value="title">Title</option>
                            </select>
                        </div>
                    </section>
                </div>
                <button className="theme-switch" type="button" onClick={handleTheme}>
                    {
                        themeDark ?
                            <i className="fa-solid fa-sun" style={{ color: "white" }}></i>
                            :
                            <i className="fa-solid fa-moon" />
                    }
                </button>
            </nav>
        </section>
    )
}

export default Navbar