import "./MyButton.scss";

interface MyButtonProps {
  title: string;
  id: string;
  handleClick?: (e: any) => void;
}

const MyButton: React.FC<MyButtonProps> = ({ title, id, handleClick }) => {
  return (
    <div
      className={"myButton " + (id === "1" ? " oneButton" : " twoButton")}
      onClick={handleClick}
    >
      {title}
    </div>
  );
};

export default MyButton;
