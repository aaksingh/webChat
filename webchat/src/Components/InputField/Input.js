import "./Input.scss";
const Input = ({ id, placeholder, value, onChange }) => {
  return (
    <>
      {id === "1" && (
        <div className="inputField">
          <img src="https://img.icons8.com/ios-filled/50/000000/user.png" />

          <input
            placeholder={placeholder}
            type="text"
            value={value}
            onChange={onChange}
          />
        </div>
      )}

      {id === "2" && (
        <div className="inputField">
          <img src="https://img.icons8.com/ios-filled/50/000000/lock.png" />
          <input
            placeholder={placeholder}
            type="password"
            value={value}
            onChange={onChange}
          />
        </div>
      )}
    </>
  );
};

export default Input;
