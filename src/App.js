import { useEffect, useState, createContext } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";

const users = [
  { ctitle: "Anoop sharma", img: "Anoop.png" },
  { ctitle: "Yogesh", img: "Yogesh.png" },
  { ctitle: "Suresh", img: "Suresh.png" },
  { ctitle: "Shankar Kumar", img: "Shankar.png" },
  { ctitle: "Ramesh", img: "Ramesh.png" }
];
const status = [
  { ctitle: "Backlog", img: "circle-loading.png" },
  { ctitle: "Todo", img: "circle.png" },
  { ctitle: "In progress", img: "work-in-progress.png" },
  { ctitle: "Done", img: "done.png" },
  { ctitle: "Cancelled", img: "cancel.png" }
];
const priority = [
  { ctitle: "No Priority", img: "dotted-line.png" },
  { ctitle: "Low", img: "low-signal.png" },
  { ctitle: "Medium", img: "phone.png" },
  { ctitle: "High", img: "signal.png" },
  { ctitle: "Urgent", img: "warning.png" }
];

export const UserContext = createContext();

function App() {
  const [data, setData] = useState(null);
  const [loader, setLoader] = useState(true);
  const [grouping, setGrouping] = useState('');
  const [ordering, setOrdering] = useState('');
  const [themeDark, setThemeDark] = useState(false);
  const apiUrl = 'https://tfyincvdrafxe7ut2ziwuhe5cm0xvsdu.lambda-url.ap-south-1.on.aws/ticketAndUsers';

  useEffect(() => {
    // fetch local storage
    setGrouping(localStorage.getItem('grouping'));
    setOrdering(localStorage.getItem('ordering'));
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json();
        console.log(result);
        setData(result);
        setLoader(false);
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };
    fetchData();
  }, []);

  return (
    loader ?
      <div>Loading</div>
      :
      <UserContext.Provider
        value={{
          data, users, status, priority,
          setGrouping, grouping,
          setOrdering, ordering
        }}
      >
        <div className={themeDark ? 'dark' : ''} >
          <Navbar setThemeDark={setThemeDark} themeDark={themeDark} />
          <main>
            <Home />
          </main>
        </div>
      </UserContext.Provider>
  );
}

export default App;
