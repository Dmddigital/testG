import React from "react";
import styled from "styled-components";
import { layoutVariables, variables } from "../../../assets/styles/variables";
import { Link, useLocation } from "react-router-dom";
import { routeConstants } from "../../../utils/route.constants";

import Logo from "../../../assets/images/logo.png";
import DemiGodIcon from "../../../assets/images/demi-god.png";
import BattleIcon from "../../../assets/images/battle.png";
import BaseIcon from "../../../assets/images/base.png";
import DemiGodActiveIcon from "../../../assets/images/demi-god-active.png";
import BattleActiveIcon from "../../../assets/images/battle-active.png";
import BaseActiveIcon from "../../../assets/images/base-active.png";
import TelegramIcon from "../../../assets/images/telegram.png";
import InstagramIcon from "../../../assets/images/instagram.png";
import TwitterIcon from "../../../assets/images/twitter.png";
import DiscordIcon from "../../../assets/images/discord.png";
import SwapIcon from "../../../assets/images/swap.png";
import StakeIcon from "../../../assets/images/stake.png";
import ChartIcon from "../../../assets/images/chart.png";
import Marketplace from "../../../assets/images/marketplace.png";

const SidebarContainer = styled.div`
  background-color: ${variables.BLACK_COLOR};
  width: ${layoutVariables.SIDEBAR_WIDTH};
  box-shadow: 0 3px 16px 0 #1b1b1b;
  height: 100vh;
  overflow-y: auto;
  position: fixed;
  top: 0;
  left: 0;

  &::-webkit-scrollbar-track{
    background-color: ${variables.BLACK_COLOR};
  }

  &::-webkit-scrollbar{
    background-color: ${variables.GREY_COLOR_THREE};
    width: 0.8rem;
  }

  &::-webkit-scrollbar-thumb{
    background-color: ${variables.GREY_COLOR_THREE};
    border: 0.2rem solid ${variables.GREY_COLOR_THREE};
    border-radius: 1rem;
  }

  .sidebar-brand-logo {
    display: block;
    width: 21rem;
    margin: 4rem 0 7rem 4.2rem;
  }

  .sidebar-navigation {
    border-bottom: 1px solid ${variables.BLACK_COLOR_TWO};
    margin-bottom: 3rem;

    li {
      list-style: none;
      margin-bottom: 2rem;
      padding-left: 3rem;

      a {
        &.active {
          background-color: rgba(255, 255, 255, 0.16);
          color: ${variables.RED_COLOR};
        }

        &:hover {
          background-color: rgba(255, 255, 255, 0.16);
        }

        img {
          vertical-align: middle;
          margin-right: 2.4rem;
          width: 2rem;
        }
      }
    }
  }

  .without-icon-link {
    border-bottom: 1px solid ${variables.BLACK_COLOR_TWO};

    li {
      padding: 2rem;

      a {
        &:hover {
          background-color: rgba(255, 255, 255, 0.16);
        }
      }
    }
  }
`;

const SubTitle = styled.span`
  color: ${variables.GREY_COLOR};
  text-transform: uppercase;
  display: block;
  margin-bottom: 3.5rem;
  font-size: 1.6rem;
  padding-left: 4.2rem;
`;

const SidebarLink = styled(Link)`
  color: ${variables.GREY_COLOR};
  cursor: pointer;
  text-decoration: none;
  display: flex;
  align-items: center;
  padding: 1.2rem 2rem;
  font-size: 1.8rem;
`;

const Sidebar = () => {
  //assigning location variable
  const location = useLocation();

  //destructuring pathname from location
  const { pathname } = location;

  //Javascript split method to get the name of the path in array
  const splitLocation = pathname.split("/");

  return (
    <SidebarContainer>
      <img src={Logo} className="sidebar-brand-logo" />
      <SubTitle>Main Game</SubTitle>
      <ul className="sidebar-navigation">
        <li>
          <SidebarLink
            to={`/${routeConstants.DEMI_GOD}`}
            className={
              splitLocation[1] === routeConstants.DEMI_GOD ? "active" : ""
            }
          >
            <img
              src={
                splitLocation[1] === routeConstants.DEMI_GOD
                  ? DemiGodActiveIcon
                  : DemiGodIcon
              }
            />
            Demi God
          </SidebarLink>
        </li>
        <li>
          <SidebarLink
            to={`/${routeConstants.BATTLE}`}
            className={
              splitLocation[1] === routeConstants.BATTLE ? "active" : ""
            }
          >
            <img
              src={
                splitLocation[1] === routeConstants.BATTLE
                  ? BattleActiveIcon
                  : BattleIcon
              }
            />
            Battle
          </SidebarLink>
        </li>
        <li>
          <SidebarLink
            to={`/${routeConstants.BASE}`}
            className={splitLocation[1] === routeConstants.BASE ? "active" : ""}
          >
            <img
              src={
                splitLocation[1] === routeConstants.BASE
                  ? BaseActiveIcon
                  : BaseIcon
              }
            />
            Base
          </SidebarLink>
        </li>
      </ul>

      <ul className="sidebar-navigation">
        <li>
          <SidebarLink
            to="/base"
          >
            <img
              src={SwapIcon}
            />
            Swap
          </SidebarLink>
        </li>
        <li>
          <SidebarLink
            to="/base"
          >
            <img
              src={StakeIcon}
            />
            Stake
          </SidebarLink>
        </li>
        <li>
          <SidebarLink
            to="/base"
          >
            <img
              src={ChartIcon}
            />
            Chart
          </SidebarLink>
        </li>
        <li>
          <SidebarLink
            to="/base"
          >
            <img
              src={Marketplace}
            />
            Marketplace
          </SidebarLink>
        </li>

      </ul>

      <SubTitle>Social</SubTitle>
      <ul className="sidebar-navigation MB-0">
        <li>
          <SidebarLink to="/base">
            <img src={TelegramIcon} />
            Telegram
          </SidebarLink>
        </li>
        <li>
          <SidebarLink to="/base">
            <img src={InstagramIcon} />
            Instagram
          </SidebarLink>
        </li>
        <li>
          <SidebarLink to="/base">
            <img src={TwitterIcon} />
            Twitter
          </SidebarLink>
        </li>
        <li>
          <SidebarLink to="/base">
            <img src={DiscordIcon} />
            Discord
          </SidebarLink>
        </li>
      </ul>

      <ul className="without-icon-link">
        <li>
          <SidebarLink to="/base">Whitepaper</SidebarLink>
        </li>
      </ul>

      <ul className="without-icon-link">
        <li>
          <SidebarLink to="/base">Medium</SidebarLink>
        </li>
      </ul>
    </SidebarContainer>
  );
};

export default Sidebar;
