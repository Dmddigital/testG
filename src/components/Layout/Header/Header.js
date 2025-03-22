import React, { useState } from "react";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
import { useWallet } from "../../WalletContext";
import { variables } from "../../../assets/styles/variables";
import { routeConstants } from "../../../utils/route.constants";

// Import all the necessary images
import Logo from "../../../assets/images/logo.png";
import walletLogo from './../../../assets/images/wallet.png';
import diamondLogo from './../../../assets/images/diamond.png';
import DemiGodIcon from "../../../assets/images/demi-god.png";
import BattleIcon from "../../../assets/images/battle.png";
import BaseIcon from "../../../assets/images/base.png";
import SwapIcon from "../../../assets/images/swap.png";
import StakeIcon from "../../../assets/images/stake.png";
import ChartIcon from "../../../assets/images/chart.png";
import Marketplace from "../../../assets/images/marketplace.png";
import TelegramIcon from "../../../assets/images/telegram.png";
import InstagramIcon from "../../../assets/images/instagram.png";
import TwitterIcon from "../../../assets/images/twitter.png";
import DiscordIcon from "../../../assets/images/discord.png";

const HeaderWrapper = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: ${variables.BLACK_COLOR};
  box-shadow: 0 3px 16px 0 #1b1b1b;
  height: 7rem;
  z-index: 1000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 3rem;
`;

const LogoSection = styled.div`
  display: flex;
  align-items: center;
  
  img {
    height: 4rem;
    margin-right: 1.5rem;
  }
`;

const StatusIndicator = styled.div`
  display: flex;
  align-items: center;
  margin-left: 1.5rem;
  
  span {
    background-color: ${variables.GREEN_COLOR};
    display: inline-block;
    height: 0.8rem;
    width: 0.8rem;
    border-radius: 50%;
    margin-right: 0.6rem;
  }

  small {
    color: ${variables.GREY_COLOR_ONE};
    font-size: 1.4rem;
  }
`;

const NavSection = styled.div`
  display: flex;
  align-items: center;
`;

const GameInfoSection = styled.div`
  display: flex;
  align-items: center;
  margin-right: 3rem;
  
  .nft-details {
    background-color: ${variables.GREY_COLOR_TWO};
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin-right: 2rem;
    height: 4rem;
    padding: 0 1.5rem;
    border-radius: 0.4rem;

    span {
      color: ${variables.WHITE_COLOR};
      font-size: 1.4rem;
      margin-right: 1rem;
    }

    small {
      background-color: ${variables.RED_COLOR};
      color: ${variables.WHITE_COLOR};
      font-size: 1.3rem;
      padding: 0.5rem 0.8rem;
      border-radius: 0.3rem;
      border: 1px solid transparent;

      &.border-text {
        border-color: ${variables.RED_COLOR};
        background: none !important;
      }
    }
  }
`;

const MenuButton = styled.button`
  background: none;
  border: none;
  color: ${variables.GREY_COLOR};
  font-size: 1.8rem;
  cursor: pointer;
  padding: 0.5rem 1rem;
  display: flex;
  align-items: center;
  margin-right: 2rem;
  
  &:hover {
    color: ${variables.WHITE_COLOR};
  }
  
  svg {
    margin-right: 0.5rem;
  }
`;

const Dropdown = styled.div`
  position: absolute;
  top: 7rem;
  left: 0;
  background-color: ${variables.BLACK_COLOR};
  width: 28rem;
  box-shadow: 0 3px 16px 0 #1b1b1b;
  border-radius: 0 0 0.5rem 0.5rem;
  padding: 1rem 0;
  display: ${props => props.isOpen ? 'block' : 'none'};
  z-index: 1000;
  max-height: calc(100vh - 7rem);
  overflow-y: auto;
  
  &::-webkit-scrollbar-track {
    background-color: ${variables.BLACK_COLOR};
  }

  &::-webkit-scrollbar {
    background-color: ${variables.GREY_COLOR_THREE};
    width: 0.8rem;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${variables.GREY_COLOR_THREE};
    border: 0.2rem solid ${variables.GREY_COLOR_THREE};
    border-radius: 1rem;
  }
`;

const DropdownSection = styled.div`
  padding: 1rem 0;
  border-bottom: 1px solid ${variables.BLACK_COLOR_TWO};
  
  &:last-child {
    border-bottom: none;
  }
`;

const DropdownTitle = styled.h3`
  color: ${variables.GREY_COLOR};
  font-size: 1.4rem;
  margin: 0 0 1rem 2rem;
  text-transform: uppercase;
`;

const NavItem = styled(Link)`
  display: flex;
  align-items: center;
  padding: 1rem 2rem;
  color: ${variables.GREY_COLOR};
  text-decoration: none;
  font-size: 1.6rem;
  transition: background-color 0.2s ease;
  
  &:hover, &.active {
    background-color: rgba(255, 255, 255, 0.05);
  }
  
  &.active {
    color: ${variables.RED_COLOR};
  }
  
  img {
    width: 2rem;
    margin-right: 1.5rem;
  }
`;

const ExternalLink = styled.a`
  display: flex;
  align-items: center;
  padding: 1rem 2rem;
  color: ${variables.GREY_COLOR};
  text-decoration: none;
  font-size: 1.6rem;
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.05);
  }
  
  img {
    width: 2rem;
    margin-right: 1.5rem;
  }
`;

const WalletSection = styled.div`
  display: flex;
  align-items: center;
  padding-right: 35px;
`;

const WalletButton = styled.a`
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  position: relative;
  background-color: ${variables.BLACK_COLOR_TWO};
  border-radius: 0.5rem;
  padding: 0.8rem 1.5rem;
  margin-right: 1.5rem;
  
  img {
    width: 2rem;
    margin-right: 1rem;
    transition: transform 0.2s ease;
  }
  
  &:hover img {
    transform: scale(1.1);
  }
  
  ${props => props.connected && `
    &:before {
      content: '';
      position: absolute;
      width: 0.8rem;
      height: 0.8rem;
      background-color: #4cd964;
      border-radius: 50%;
      top: 0.8rem;
      right: 0.8rem;
    }
  `}
`;

const DiamondButton = styled.a`
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: ${variables.BLACK_COLOR_TWO};
  border-radius: 0.5rem;
  padding: 0.8rem;
  
  img {
    width: 2rem;
    transition: transform 0.2s ease;
  }
  
  &:hover img {
    transform: scale(1.1);
  }
`;

const ConnectingIndicator = styled.div`
  display: inline-block;
  width: 1.4rem;
  height: 1.4rem;
  border: 2px solid ${variables.GREY_COLOR};
  border-top-color: transparent;
  border-radius: 50%;
  margin-left: 0.5rem;
  animation: spin 1s linear infinite;
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

const WalletText = styled.span`
  color: ${variables.GREY_COLOR};
  font-size: 1.4rem;
`;

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const { pathname } = location;
  const splitLocation = pathname.split("/");
  
  const { 
    connected, 
    walletAddress, 
    tokenBalance, 
    connectWallet,
    isLoading
  } = useWallet();

  const handleConnectWallet = async () => {
    if (!connected && !isLoading) {
      await connectWallet();
    }
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <HeaderWrapper>
        <LogoSection>
          <MenuButton onClick={toggleMenu}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 12H21M3 6H21M3 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Menu
          </MenuButton>
          <Link to="/">
            <img src={Logo} alt="B.E.T.A" />
          </Link>
          <StatusIndicator>
            <span></span>
            <small>Active</small>
          </StatusIndicator>
        </LogoSection>
        
        <GameInfoSection>
          <div className="nft-details">
            <span>Mine NFT</span>
            <small>Pay 4.28 BTC</small>
          </div>
          <div className="nft-details">
            <span>Current Battle Power</span>
            <small className="border-text">0/238 MP</small>
          </div>
        </GameInfoSection>
        
        <WalletSection>
          <WalletButton 
            onClick={handleConnectWallet}
            connected={connected}
          >
            <img src={walletLogo} alt="Wallet" />
            {connected ? (
              <WalletText>
                {tokenBalance ? parseFloat(tokenBalance).toFixed(2) : '0'} AURA
              </WalletText>
            ) : (
              <WalletText>
                {isLoading ? <ConnectingIndicator /> : 'Connect'}
              </WalletText>
            )}
          </WalletButton>
          
          
        </WalletSection>
      </HeaderWrapper>
      
      <Dropdown isOpen={menuOpen}>
        <DropdownSection>
          <DropdownTitle>Main Game</DropdownTitle>
          <NavItem 
            to={`/${routeConstants.DEMI_GOD}`}
            className={splitLocation[1] === routeConstants.DEMI_GOD ? "active" : ""}
            onClick={() => setMenuOpen(false)}
          >
            <img src={DemiGodIcon} alt="Demi God" />
            Demi God
          </NavItem>
          <NavItem 
            to={`/${routeConstants.BATTLE}`}
            className={splitLocation[1] === routeConstants.BATTLE ? "active" : ""}
            onClick={() => setMenuOpen(false)}
          >
            <img src={BattleIcon} alt="Battle" />
            Battle
          </NavItem>
          <NavItem 
            to={`/${routeConstants.BASE}`}
            className={splitLocation[1] === routeConstants.BASE ? "active" : ""}
            onClick={() => setMenuOpen(false)}
          >
            <img src={BaseIcon} alt="Base" />
            Base
          </NavItem>
        </DropdownSection>
        
        <DropdownSection>
          <DropdownTitle>Tools</DropdownTitle>
          <NavItem to="/swap" onClick={() => setMenuOpen(false)}>
            <img src={SwapIcon} alt="Swap" />
            Swap
          </NavItem>
          <NavItem to="/stake" onClick={() => setMenuOpen(false)}>
            <img src={StakeIcon} alt="Stake" />
            Stake
          </NavItem>
          <NavItem to="/chart" onClick={() => setMenuOpen(false)}>
            <img src={ChartIcon} alt="Chart" />
            Chart
          </NavItem>
          <NavItem to="/marketplace" onClick={() => setMenuOpen(false)}>
            <img src={Marketplace} alt="Marketplace" />
            Marketplace
          </NavItem>
        </DropdownSection>
        
        <DropdownSection>
          <DropdownTitle>Social</DropdownTitle>
          <ExternalLink href="https://t.me/yourprojectgroup" target="_blank" rel="noopener noreferrer">
            <img src={TelegramIcon} alt="Telegram" />
            Telegram
          </ExternalLink>
          <ExternalLink href="https://instagram.com/yourproject" target="_blank" rel="noopener noreferrer">
            <img src={InstagramIcon} alt="Instagram" />
            Instagram
          </ExternalLink>
          <ExternalLink href="https://twitter.com/yourproject" target="_blank" rel="noopener noreferrer">
            <img src={TwitterIcon} alt="Twitter" />
            Twitter
          </ExternalLink>
          <ExternalLink href="https://discord.gg/yourproject" target="_blank" rel="noopener noreferrer">
            <img src={DiscordIcon} alt="Discord" />
            Discord
          </ExternalLink>
        </DropdownSection>
        
        <DropdownSection>
          <NavItem to="/whitepaper" onClick={() => setMenuOpen(false)}>
            Whitepaper
          </NavItem>
        </DropdownSection>
        
        <DropdownSection>
          <NavItem to="/medium" onClick={() => setMenuOpen(false)}>
            Medium
          </NavItem>
        </DropdownSection>
      </Dropdown>
    </>
  );
};

export default Header;