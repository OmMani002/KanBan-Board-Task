import React, { useState, useEffect } from "react";
import { fetchTickets } from "./utils/api";
import "./App.css";
import KanbanApp from "./components/Kanban";
import { groupByEnum, orderByEnum } from "./utils/enums";
function App() {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [displayState, setDisplayState] = useState({
    groupBy: groupByEnum.status,
    orderBy: orderByEnum.priority,
  });
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const result = await fetchTickets();
      console.log(result);
      if (result) {
        setUsers(result.users);
        setTickets(result.tickets);
      }
      loadUserConfig();
      setLoading(false);
    };
    const loadUserConfig = async () => {
      const localConfig = localStorage.getItem("userConfig");
      if (localConfig) {
        const config = JSON.parse(localConfig);
        setDisplayState({
          groupBy: config.groupBy,
          orderBy: config.orderBy,
        });
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="loader-parent">
        <div class="loader"></div>{" "}
      </div>
    );
  }
  return (
    <div className="container">
      <KanbanApp
        tickets={tickets}
        users={users}
        displayState={displayState}
        setDisplayState={setDisplayState}
      />
    </div>
  );
}

export default App;
