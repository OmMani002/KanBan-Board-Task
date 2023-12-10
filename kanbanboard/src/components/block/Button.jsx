import "./Button.css";
export default function Button({
  prefix_icon = null,
  label,
  postfix_icon = null,
  onClickHandler = () => {},
}) {
  return (
    <>
      <div className="view-btn" onClick={onClickHandler}>
        {prefix_icon && <span className="view-icon"> {prefix_icon} </span>}
        {typeof label == "string" && <span>{label}</span>}
        {postfix_icon && (
          <span className="view-icon-arrow"> {postfix_icon} </span>
        )}
      </div>
    </>
  );
}
