import React, { useState, useEffect } from 'react'
import Card from './Card'
import { UserContext } from '../App'

const GroupCard = ({ ctitle, filterData, img }) => {
    const [sortedData, setSortedData] = useState([]);
    let storedOrdering = localStorage.getItem('ordering');

    const sortBy = (array, key) => {
        const clonedArray = [...array];
    
        clonedArray.sort((a, b) => {
            if (key === 'priority') {
                return b[key] - a[key]; // Sort priority in descending order
            } else if (key === 'title') {
                return a[key].localeCompare(b[key]); // Sort title in ascending order
            } else {
                // Handle other cases or throw an error for unknown keys
                return 0;
            }
        });
    
        return clonedArray;
    };
    

    useEffect(() => {
        filterData && setSortedData(sortBy(filterData, storedOrdering));
    }, [filterData])


    return (
        <div className='group-card'>
            <div className="container-main">
                <div className="left">
                    <div className="icon-wrapper">
                        <div>
                            <img className='st-icon' src={`/images/${img}`}></img>
                        </div>
                    </div>
                    <span className="status">
                        {ctitle}
                    </span>
                    <span style={{ color: "gray" }}>{sortedData.length}</span>
                </div>
                <div className="right">
                    <div className="icon-wrapper">
                        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" className="icon" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" style={{ color: "gray" }}>
                            <path fill="none" d="M0 0h24v24H0z"></path>
                            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z">
                            </path>
                        </svg>
                    </div>
                    <div className="icon-wrapper">
                        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 16 16" className="icon" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" style={{ color: "gray" }}>
                            <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"></path>
                        </svg>
                    </div>
                </div>
            </div>

            <div className='ticket-container'>
                {
                    sortedData.map((item, index) => {
                        return <Card
                            key={index}
                            id={item.id}
                            title={item.title}
                            userId={item.userId}
                            cpriority={item.priority}
                            ctitle={item.status}
                        />
                    })
                }
            </div>
        </div>
    )
}

export default GroupCard