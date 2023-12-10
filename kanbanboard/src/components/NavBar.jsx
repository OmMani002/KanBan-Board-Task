import "./NavBar.css";
import React, { useState } from "react";
import Button from "./block/Button";
import Modal from "./block/Modal";
import { groupByEnum, orderByEnum } from "../utils/enums";
export default function Navbar({ displayState, setDisplayState }) {
  const [displayModal, setDisplayModal] = useState(false);
  const handleGroupBy = (e) => {
    const value = e.target.value;
    localStorage.setItem(
      "userConfig",
      JSON.stringify({
        ...displayState,
        groupBy: groupByEnum[value],
      })
    );
    setDisplayState({ ...displayState, groupBy: groupByEnum[value] });
  };

  const handleOrderBy = (e) => {
    const value = e.target.value;
    localStorage.setItem(
      "userConfig",
      JSON.stringify({
        ...displayState,
        orderBy: orderByEnum[value],
      })
    );
    setDisplayState({ ...displayState, orderBy: orderByEnum[value] });
  };

  return (
    <div className="navbar">
      <div className="margin-x-20">
        <Button
          label={"Display"}
          prefix_icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.8}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
              />
            </svg>
          }
          postfix_icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
              />
            </svg>
          }
          onClickHandler={() => {
            setDisplayModal(!displayModal);
          }}
        />
        <div>
          <Modal open={displayModal} setOpen={setDisplayModal}>
            <div className="dropdown-content">
              <div className="dropdown-item">
                <span>Grouping </span>
                <select
                  name="grouping"
                  id="grouping"
                  onChange={handleGroupBy}
                  defaultValue={displayState.groupBy}
                >
                  {Object.keys(groupByEnum).map((key, index) => {
                    return (
                      <option value={key} key={index} className="capitalize">
                        {groupByEnum[key]}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="dropdown-item">
                <span>Ordering </span>
                <select
                  name="order"
                  id="order"
                  onChange={handleOrderBy}
                  defaultValue={displayState.orderBy}
                >
                  {Object.keys(orderByEnum).map((key, index) => {
                    return (
                      <option value={key} key={index} className="capitalize">
                        {orderByEnum[key]}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
}
