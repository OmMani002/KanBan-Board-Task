const groupByEnum = {
    status: "status",
    priority: "priority",
    user: "user",
  };
  const orderByEnum = {
    priority: "priority",
    title: "title",
  };
  
  export { groupByEnum, orderByEnum, statusStateEnum, priorityStateEnum };
  
  const priorityStateEnum = {
    4: "Urgent",
  
    3: "High",
  
    2: "Medium",
  
    1: "Low",
  
    0: "NoPriority",
  };
  
  const statusStateEnum = {
    Todo: "Todo",
  
    "In progress": "In progress",
  
    Backlog: "Backlog",
    Done: "Done",
    Canceled: "Canceled",
  };