import React, { useState, useEffect } from "react";
import "./Kanban.css";
import Navbar from "./NavBar";
import {
  groupByEnum,
  statusStateEnum,
  priorityStateEnum,
} from "../utils/enums";
import KanbanBoard from "./KanbanBoard";

function KanbanApp({ tickets, users, displayState, setDisplayState }) {
  const [label, setLabel] = useState([]);
  const [labelData, setLabelData] = useState({});

  // comment tiz while deploying.
  useEffect(() => {
    const loadKanbanBoard = () => {
      if (displayState.groupBy === groupByEnum.status) {
        const labelKeydata = Object.keys(statusStateEnum);
        setLabel(labelKeydata);
        const dataArray = [];
        labelKeydata.forEach((label) => {
          const data = tickets.filter((ticket) => ticket.status === label);
          dataArray[label] = data;
        });
        setLabelData({ ...dataArray });
        return;
      }
      if (displayState.groupBy === groupByEnum.priority) {
        const labelKeydata = Object.values(priorityStateEnum);
        setLabel(labelKeydata);
        const dataArray = [];
        labelKeydata.forEach((label) => {
          const data = tickets.filter(
            (ticket) => priorityStateEnum[ticket.priority] === label
          );

          dataArray[label] = data;
        });
        setLabelData({ ...dataArray });
        return;
      }
      if (displayState.groupBy === groupByEnum.user) {
        const labelKeydata = users.map((user) => user.name);
        setLabel(labelKeydata);
        const dataArray = [];
        labelKeydata.forEach((label) => {
          const data = tickets.filter(
            (ticket) =>
              users.find((user) => {
                return user.id === ticket.userId;
              }).name === label
          );
          dataArray[label] = data;
        });
        setLabelData({ ...dataArray });
        return;
      }
    };
    loadKanbanBoard();
    // eslint-disable-next-line react-hooks/exhaustive-deps, no-sparse-arrays
  }, [displayState, users, setLabel, , tickets]);

  return (
    <React.Fragment>
      <Navbar displayState={displayState} setDisplayState={setDisplayState} />
      <div className="margin-x-20">
        <KanbanBoard
          label={label}
          options={labelData}
          mode={displayState.groupBy}
          stateOrderBy={displayState.orderBy}
          users={users}
        />
      </div>
    </React.Fragment>
  );
}

export default KanbanApp;
