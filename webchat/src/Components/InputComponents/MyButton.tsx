import "./MyButton.scss";

interface MyButtonProps {
  title: string;
  id: string;
  handleClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const MyButton = ({ title, id, handleClick }: MyButtonProps) => {
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
