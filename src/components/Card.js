import React, { useContext } from 'react'
import { UserContext } from '../App';

const Card = ({ id, title, ctitle, userId, cpriority }) => {
    const { data, users, priority, status } = useContext(UserContext);
    let grouping = localStorage.getItem('grouping');

    const findImg = (ctitle) => {
        const statusItem = status.find(item => item.ctitle === ctitle);
        return statusItem ? statusItem.img : null;
    };
    const findName = (userId) => {
        const user = data.users.find(user => user.id === userId);
        return user ? user.name : null;
    };
    const findUserImg = (name) => {
        const statusItem = users.find(item => item.ctitle === name);
        return statusItem ? statusItem.img : null;
    };
    
    return (
        <div>
            <div className="card">
                <div className="card-top">
                    <span>{id}</span>
                    {grouping !== "user" &&
                         <img className='st-icon' src={`/images/${findUserImg(findName(userId))}`}></img>
                    }
                </div>
                <div className="card-middle">
                    {grouping !== "status" &&
                        <img className='st-icon' src={`/images/${findImg(ctitle)}`}></img>
                    }
                    <p>{title}</p>
                </div>
                <div className="card-bottom">
                    {
                        grouping !== 'priority' &&
                        <img className='st-icon' src={`/images/${priority[cpriority].img}`}></img>
                    }
                    <div className="tag-wrapper">
                        <div className="tag"><div>
                            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 256 256" className="icon" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" style={{ color: "gray" }}>
                                <path d="M232,128A104,104,0,1,1,128,24,104.13,104.13,0,0,1,232,128Z" />
                            </svg>
                        </div>
                            <span>Feature Request</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card