import { groupByEnum } from "../utils/enums";
import "./KanbanBoard.css";
import Card from "./block/Card";
import Profile from "./block/ProfileStatus";
import { useEffect, useState } from "react";
import { orderByEnum } from "../utils/enums";
export default function Kanban({
  label = [],
  options = {},
  mode,
  users = [],
  stateOrderBy,
}) {
  const [tickets, setTickets] = useState();

  useEffect(() => {
    if (stateOrderBy === orderByEnum.priority) {
      const sortedValues = [];
      Object.keys(options).forEach((labelsKey) => {
        sortedValues[labelsKey] = options[labelsKey].sort((a, b) => {
          return b.priority - a.priority;
        });
      });
      setTickets({ ...sortedValues });

      return;
    }
    if (stateOrderBy === orderByEnum.title) {
      const sortedValues = [];
      Object.keys(options).forEach((labelsKey) => {
        sortedValues[labelsKey] = options[labelsKey].sort((a, b) => {
          return a.title.localeCompare(b.title);
        });
      });
      setTickets({ ...sortedValues });

      return;
    }
  }, [options, stateOrderBy]);

  return (
    <div className="kanban">
      {label.map((value, index) => {
        return (
          <div key={index} className="kanban-containers">
            <div className="kanban-header">
              <div className="kanban-header-profile">
                <span>
                  {mode === groupByEnum.user ? (
                    <Profile
                      active={
                        users.find((user) => {
                          return user.name === value;
                        })?.available ?? false
                      }
                    />
                  ) : null}
                </span>
                {value}
                <span>{options[value].length}</span>
              </div>

              <div className="kanban-action">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z"
                    clipRule="evenodd"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                  />
                </svg>
              </div>
            </div>
            <div key={index} className="kanban-item">
              {tickets &&
                tickets[value]?.map((item, index) => {
                  return (
                    <Card
                      card={item}
                      key={index}
                      user={users.find((user) => {
                        return user.id === item.userId;
                      })}
                    />
                  );
                })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
