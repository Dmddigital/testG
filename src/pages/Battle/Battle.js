import React, { useState } from "react";
import BattleWonModal from "./BattleWonModal/BattleWonModal";
import { Heading, Container, CardWrapper, Main, Divider } from "./Battle.style";
import ImgBattle from "../../assets/images/battle-white.png";

const Battle = () => {
  const [isModalOpen, setIsModalOpen] = useState("");

  return (
    <>
      <Main>
        <Heading>Battle</Heading>
        <Container>
          <div className="battle-width">
          {Array(8)
            .fill(0)
            .map((e, inx) => (
              <CardWrapper bottom={inx % 2 ? true : false} key={inx}>
                <div className="box-wrapper">
                  <Divider>
                    <div className="circle">
                    <img src={ImgBattle} alt="icon" />
                    </div>
                    <hr className="divider" />
                  </Divider>
                  <h2 className="title">GIANTS</h2>
                  <h4 className="sub-title">(100 MP Required)</h4>
                  <div className="details-wrapper">
                    <div className="leftside">
                      <div className="name">Aura</div>
                      <div className="description">Estimated Reward</div>
                    </div>
                    <div className="divider" />
                    <div className="rightside">
                      <div className="name">60%</div>
                      <div className="description">Total Success rate</div>
                    </div>
                  </div>
                  <div className="image-wrapper">
                    <img src={require(`../../assets/images/battle${inx + 1}.png`).default} alt="Battle" />
                  </div>
                  <div className="button-wrapper">
                    <button
                      onClick={() => setIsModalOpen(inx % 2 ? "WON" : "LOSS")}
                    >
                      Battle
                    </button>
                  </div>
                </div>
              </CardWrapper>
            ))}
          <Divider />
          </div>
        </Container>
      </Main>
      <BattleWonModal
        isOpen={isModalOpen ? true : false}
        onClose={() => setIsModalOpen("")}
        status={isModalOpen}
      />
    </>
  );
};

export default Battle;
