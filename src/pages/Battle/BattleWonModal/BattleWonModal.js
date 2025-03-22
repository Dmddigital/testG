import Modal from "../../../components/Modal/Modal";
import {
  ImgWrapper,
  TitleWrapper,
  DetailsWrapper,
  ButtonWrapper,
} from "./BattleWonModal.style";
import ImgSuccess from "./../../../assets/images/success.png";
import ImgLoss from "./../../../assets/images/loss.png";
import ImgDiamond from "./../../../assets/images/diamond.png";

const BattleWonModal = ({ isOpen, status, onClose }) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={onClose}>
      <ImgWrapper>
        <img src={status === "WON" ? ImgSuccess : ImgLoss} alt="icon" />
      </ImgWrapper>
      <TitleWrapper>
        <img src={ImgDiamond} alt="icon" />
        <h2>6,56587</h2>
      </TitleWrapper>
      <DetailsWrapper>
        <div className="col">
          <div className="label">Your Roll</div>
          <div>:</div>
          <div className="value">45</div>
        </div>
        <div className="col">
          <div className="label">Roll Needed</div>
          <div>:</div>
          <div className="value">57</div>
        </div>
        <div className="col">
          <div className="label">Tx Hash</div>
          <div>:</div>
          <div className="value">x0hdjsks</div>
        </div>
      </DetailsWrapper>
      <ButtonWrapper status={status}>
        <button onClick={() => onClose()}>
          Battle {status === "WON" ? "Won" : "Loss"}
        </button>
      </ButtonWrapper>
    </Modal>
  );
};

export default BattleWonModal;
