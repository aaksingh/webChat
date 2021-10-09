import "./Input.scss";

interface InputProps {
  id: string;
  value: string;
  onChange: () => void;
}

const Input = ({ id, value, onChange }: InputProps) => {
  return (
    <div className="customField">
      {id === "1" ? (
        <div className="input">
          <img src="https://img.icons8.com/ios-glyphs/30/000000/user.png" />
          <input
            type="text"
            placeholder="Username"
            value={value}
            onChange={onChange}
          />
        </div>
      ) : (
        <div className="input">
          <img src="https://img.icons8.com/ios-glyphs/30/000000/lock--v2.png" />
          <input
            type="password"
            placeholder="Password"
            value={value}
            onChange={onChange}
          />
        </div>
      )}
    </div>
  );
};

export default Input;
