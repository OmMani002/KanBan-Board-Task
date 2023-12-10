import "./ProfileStatus.css";
export default function Profile({ active = false }) {
  return (
    <div className="profile-icon">
      <img
        src="https://avatars.githubusercontent.com/u/76935835?v=4"
        alt="profile"
        className="profile-image"
      />
      {active ? (
        <div className="profile-status-active" />
      ) : (
        <div className="profile-status-inactive" />
      )}
    </div>
  );
}
