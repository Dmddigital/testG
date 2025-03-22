import ReactModal from "react-modal";
import { variables } from "./../../assets/styles/variables";

const modalStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: variables.BLACK_COLOR_ONE,
    border: 0,
    padding: 20,
    width: "48rem",
    textAlign: "center",
    color: variables.WHITE_COLOR,
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
};

const Modal = (props) => {
  return (
    <ReactModal style={modalStyles} {...props}>
      {props.children}
    </ReactModal>
  );
};

export default Modal;
