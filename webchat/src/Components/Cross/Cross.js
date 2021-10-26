import { ReactComponent as CrossIcon } from "../../Assets/Cross.svg";
const Cross = ({ handleCross }) => {
  return (
    <CrossIcon
      style={{
        width: "12px",
        height: "12px",
        position: "absolute",
        right: "2%",
        bottom: "50%",
        cursor: "pointer",
      }}
      onClick={handleCross}
    />
  );
};

export default Cross;
