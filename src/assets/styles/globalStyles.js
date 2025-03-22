import { createGlobalStyle } from "styled-components";
import { variables } from "./variables";

const GlobalStyles = createGlobalStyle`
    *{
        margin: 0;
        padding: 0;
        box-shadow: border-box;
        // font-family: 'Montserrat', sans-serif;
        font-family: 'Quantico', sans-serif;
        font-size: 10px;

        @media (min-width: 1025px) and (max-width: 1440px) {
            font-size: 8px;
        }

        @media (min-width: 1441px) and (max-width: 1600px) {
            font-size: 9px;
        }
    }

    body{
        background-color: ${variables.BLACK_COLOR_ONE};
    }

    .hover-effect {
        color: ${variables.WHITE_COLOR};
        height: 30px;
        width: 30px;
        display: inline-block;
        cursor: pointer;
        border-radius: 50%;
        text-align: center;
        position: relative;
        text-decoration: none;
        z-index: 1;
    }
    .hover-effect:after {
        pointer-events: none;
        position: absolute;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        content:'';
        -webkit-box-sizing: content-box;
        -moz-box-sizing: content-box;
        box-sizing: content-box;
    }
    .hover-effect:before {
        speak: none;
        font-size: 48px;
        line-height: 90px;
        font-style: normal;
        font-weight: normal;
        font-variant: normal;
        text-transform: none;
        display: block;
        -webkit-font-smoothing: antialiased;
    }
     .hover-effect.effect {
        background: rgba(193, 0, 0, 0.5);
        -webkit-transition: background 0.2s, color 0.2s;
        -moz-transition: background 0.2s, color 0.2s;
        transition: background 0.2s, color 0.2s;
    }
    .white-border{
        border: 1px solid rgba(255,255,255,0.6);
        height: 12px;
        width: 12px;
        display: inline-block;
        border-radius: 50%;
        left: 8px;
        top: 8px;
        position: absolute;
    }
    .hover-effect.effect:after {
        top: -7px;
        left: -7px;
        padding: 7px;
        -webkit-transition: -webkit-transform 0.2s, opacity 0.2s;
        -webkit-transform: scale(.8);
        -moz-transition: -moz-transform 0.2s, opacity 0.2s;
        -moz-transform: scale(.8);
        -ms-transform: scale(.8);
        transition: transform 0.2s, opacity 0.2s;
        transform: scale(.8);
        opacity: 0;
    }
     .hover-effect.effect.sub-a:hover {
        background: ${variables.RED_COLOR_ONE};
        color: #41ab6b;
    }
    .hover-effect.effect.sub-a:hover:after {
        -webkit-transform: scale(1);
        -moz-transform: scale(1);
        -ms-transform: scale(1);
        transform: scale(1);
        opacity: 1;
    }
     .hover-effect.effect.sub-b:hover {
        background: ${variables.RED_COLOR_ONE};
        color: #41ab6b;
    }
    .hover-effect.effect.sub-b:hover i {
        color: #41ab6b;
    }
    .hover-effect.effect:hover .white-border{
        display: none;
    }
    .effect-character:hover .character-info{
        display: inline-block !important;
    }
    .hover-effect.effect.sub-b:after {
        -webkit-transform: scale(1.2);
        -moz-transform: scale(1.2);
        -ms-transform: scale(1.2);
        transform: scale(1.2);
    }
    .hover-effect.effect.sub-b:hover:after {
        -webkit-transform: scale(1);
        -moz-transform: scale(1);
        -ms-transform: scale(1);
        transform: scale(1);
        opacity: 1;
    }
    .effect-character{
        position: absolute;
        display: flex;
        align-items: flex-start;
        left: 35%;
        top: 40%;

        &--second{
            left: 61%;
            top: 32%;
        }

        &--third{
            left: 9.5%;
            top: 38%;
        }

        &--fourth{
            left: 89.5%;
            top: 40%;

            .character-info{
                margin-left: -42rem;
            }
        }
    }

    .character-info{
        box-shadow: 0 10px 16px 0 rgba(255, 255, 255, 0.1);
        background-color: rgba(17, 17, 17, 0.8);
        position: relative;
        display: none;
        padding: 2.5rem;
        border-radius: 2rem;
        width: 30rem;
        margin-left: 4rem;
        z-index: 5;

        &:after{
            position: absolute;
            left: -4px;
            top: -4px;
            width: 100%;
            height: 100%;
            content:'';
            border-radius: 2.5rem;
            z-index: 0;
        }

        div > div{
            margin-bottom: 1rem;

            &:last-child{
                margin-bottom: 0;
            }
        }

        span{
            color: ${variables.WHITE_COLOR};
            display: inline-flex;
            width: 12rem;
            font-size: 1.8rem;
        }
    }
    .MB-0{
        margin-bottom: 0 !important;
    }
`;

export default GlobalStyles;
