import React, { useContext, useEffect, useState } from 'react';
import GroupCard from '../components/GroupCard';
import { UserContext } from '../App';

const Home = () => {
    const [filterData, setFilterData] = useState([]);
    const [selectedArray, setSelectedArray] = useState([]);
    let storedGrouping = localStorage.getItem('grouping');
    const { grouping, ordering, data, users, status, priority } = useContext(UserContext);


    const findUserId = (userName) => {
        const user = data.users.find(user => user.name === userName);
        return user ? user.id : null;
    };

    const groupBy = (array, key) => {
        return array.reduce((result, item) => {
            (result[item[key]] = result[item[key]] || []).push(item);
            return result;
        }, {});
    };

    useEffect(() => {
        storedGrouping = localStorage.getItem('grouping') || 'status';
        if (storedGrouping === 'user')
            setFilterData(groupBy(data.tickets, 'userId'));
        else
            setFilterData(groupBy(data.tickets, storedGrouping));

        // Define the array based on the storedGrouping value
        switch (storedGrouping) {
            case 'user':
                setSelectedArray(users);
                break;
            case 'status':
                setSelectedArray(status);
                break;
            case 'priority':
                setSelectedArray(priority);
                break;
            default:
                setSelectedArray([]);
        }
    }, [grouping, ordering]);

    return (
        <section className='component-wrapper'>
            {selectedArray.map((item, index) => {
                if (grouping === 'user') {
                    let id = findUserId(item.ctitle);
                    return <GroupCard
                        ctitle={item.ctitle}
                        filterData={filterData[`${id}`]}
                        key={index}
                        img={item.img} />
                } else if (grouping === 'priority') {
                    if (item.ctitle === "No Priority") {
                        return <GroupCard
                            ctitle={item.ctitle}
                            filterData={filterData[0]}
                            key={index}
                            img={item.img} />
                    }
                    else if (item.ctitle === "Low") {
                        return <GroupCard
                            ctitle={item.ctitle}
                            filterData={filterData[1]}
                            key={index}
                            img={item.img} />
                    }
                    else if (item.ctitle === "Medium") {
                        return <GroupCard
                            ctitle={item.ctitle}
                            filterData={filterData[2]}
                            key={index}
                            img={item.img} />
                    }
                    else if (item.ctitle === "High") {
                        return <GroupCard
                            ctitle={item.ctitle}
                            filterData={filterData[3]}
                            key={index}
                            img={item.img} />
                    }
                    else {
                        return <GroupCard
                            ctitle={item.ctitle}
                            filterData={filterData[4]}
                            key={index}
                            img={item.img} />
                    }
                } else {
                    return <GroupCard
                        key={index}
                        ctitle={item.ctitle}
                        filterData={filterData[`${item.ctitle}`]}
                        img={item.img}
                    />
                }
            })}
        </section>
    );
};

export default Home;

