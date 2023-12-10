import "./Card.css";
import Button from "./Button";
import Marker from "./Marker";
import ProfileCard from "./ProfileStatus";
export default function Card({ card, user = [] }) {
  // console.log(card);
  if (card) {
    return (
      <div>
        <div className="card">
          <div className="card-header">
            <div className="card-header-title">{card.id}</div>
            <ProfileCard active={user?.available ?? false} />
          </div>
          <div className="card-body">
            <div className="card-title">{card.title}</div>
          </div>
          <div className="card-footer">
            <Marker
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  strokeWidth={1.8}
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
                    clipRule="evenodd"
                  />
                </svg>
              }
            />
            {card.tag.map((tag, index) => {
              return (
                <Button
                  key={index}
                  prefix_icon={
                    <svg xmlns="http://www.w3.org/2000/svg" version="1.0">
                      <circle cx="8" cy="8" r="8" fill="#555555" />
                    </svg>
                  }
                  label={tag}
                />
              );
            })}
          </div>
        </div>
      </div>
    );
  } else {
    return <>Loading...</>;
  }
}
