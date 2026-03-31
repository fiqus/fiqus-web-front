import React, {useState, useEffect} from 'react';
import styled from 'styled-components'
import data from '../../content/content.json'
import { useIntl, Link, IntlContextConsumer, changeLocale } from "gatsby-plugin-react-intl"

const styles = data.styles
const darkLogo = require('../../images/logo_dark.svg')
const lightLogo = require('../../images/logo_light.svg')
const lightIconToggler = require('../../images/icon_toggler.svg')
const darkIconToggler = require('../../images/icon_toggler_dark.svg')
const iconTogglerClose = require('../../images/icon_toggler_close.svg')

const NavWrapper = styled.nav`
    width: 100%;
    position: fixed;
    background-color: ${props => props.ishomepage === "true" ? styles.colors.white : styles.colors.purplePrimary};
    display: flex;
    padding: 8px 20px;
    justify-content: space-between;
    align-items: center;
    z-index: 10;
    @media (min-width: ${styles.breakpoints.xl}px) {
        padding: 16px 150px;
    }
`
const LinkLogo = styled(Link)`
    width: 83px;
    height: 32px;
    @media (min-width: ${styles.breakpoints.xl}px) {
        width: 117.1px;
        height: 44.22px;
        order: 1;
    }
`
const Logo = styled.img`
    width: 83px;
    height: 32px;
    @media (min-width: ${styles.breakpoints.xl}px) {
        width: 117.1px;
        height: 44.22px;
    }
`
const LangSelector = styled.nav`
    border: 2px solid ${props => props.ishomepage === "true" ? styles.colors.purplePrimary : styles.colors.white};
    margin-right: auto;
    margin-left: 10px;
    padding: 7px 10px;
    border-radius: 47px;
    max-width: 88px;
    max-height: 46px;
    display: flex;
    justify-content: center;
    align-items: center;
    @media (min-width: ${styles.breakpoints.xl}px) {
        order: 3;
        margin-right: unset;
        margin-left: 0;
    }
`
const LangList = styled.ul`
    display: flex;
`
const LangItem = styled.li`
    list-style-type: none;
    border-radius: 100%;
    background-color: ${props => props.isSelected ? styles.colors.greenMain : styles.colors.transparent};
    &:first-of-type {
        margin-right: 5px;
    }
`
const Lang = styled(Link)`
    text-decoration: none;
    padding: 5px 6px;
    display: block;
`

const NavToggler = styled.button`
    width: 32px;
    height: 30px;
    margin-left: auto;
    background: none;
    border: 0;
    box-shadow: 0;
    cursor: pointer;
    @media (min-width: ${styles.breakpoints.xl}px) {
        display: none;
    }
`
const NavTogglerIcon = styled.img`
    width: 32px;
    height: 30px;
`
const NavTogglerClose = styled.button`
    width: 32px;
    height: 30px;
    margin-left: auto;
    background: none;
    border: 0;
    box-shadow: 0;
    cursor: pointer;
    @media (min-width: ${styles.breakpoints.xl}px) {
        display: none;
    }
`
const NavTogglerCloseIcon = styled.img`
    width: auto;
    height: 30px;
    margin-left: auto;
`
const MainNavContainer = styled.div`
    width: 100%;
    height: 100vh;
    background: ${styles.colors.white};
    position: absolute;
    top: 0;
    left: 0; 
    flex-wrap: wrap;
    flex-direction: column;
    padding: 16px 18px;
    display: ${props => props.isNavOpen ? 'flex' : 'none'};
    @media (min-width: ${styles.breakpoints.xl}px) {
        width: unset;
        height: unset;
        background: ${styles.colors.transparent};
        position: static;
        display: block;
        padding: 0;
        order: 2;
        margin-left: auto;
    }
`
const MainNav = styled.nav`
    margin: 50px auto;
    width: 100%;
    @media (min-width: ${styles.breakpoints.xl}px) {
        margin: 0;
        ul li a {
        color: ${props => props.ishomepage === "true"? styles.colors.darkMainBg : styles.colors.white};
        }
    }
`
const NavLinks = styled.ul`
    text-align: center;
    @media (min-width: ${styles.breakpoints.xl}px) {
        display: flex;
        flex-direction: row;
    }
`
const NavItem = styled.li`
    list-style-type: none;
    margin: 0 0 17px 0;
    @media (min-width: ${styles.breakpoints.xl}px) {
        margin: 0 30px 0 0;
        &:last-of-type {
            margin-right: 21px;
        }
    }
`
const NavLink = styled(Link)`
    text-decoration: none;
    font-size: 1.44em;
    font-weight:${styles.fontWeight.bold};    
    display: block;
    color: ${styles.colors.purplePrimary};
    &:visited {
        ${styles.colors.purplePrimary};
    }
    &:hover,
    &:active{
        color: ${styles.colors.greenMain}!important;
    }
    ${props => props.active ? `color: ${styles.colors.greenMain}!important;` : '' }
    @media (min-width: ${styles.breakpoints.xl}px) {
        color: ${styles.colors.darkMainBg};
        text-transform: uppercase;
    }
`

const LangContent = styled.abbr`
    text-decoration: none;
    text-transform: uppercase;
    font-size: 1em;
    font-weight:${styles.fontWeight.bold};
    color: ${props => {
        if ((props.ishomepage === "true" && !props.isSelected) || (props.ishomepage === "false" && props.isSelected) || props.isSelected) {
            return styles.colors.purplePrimary
        } else {
            if ((props.ishomepage === "false" && !props.isSelected)) {
                return styles.colors.white
            } else {
                return styles.colors.purplePrimary
            }
        }
    }
    };
    `

const Header = (props) => {
    const [isNavOpen, setIsNavOpen] = useState(false);
    const [activeLink, setActiveLink] = useState('/');
    const intl = useIntl();
    const languageNames = {
        "en": "English",
        "es": "Español"
    }

    useEffect(() => {
        let active;
        props.menuLinks.forEach(menuLink => {
           if (menuLink.link !== '/' && props.location.pathname.includes(menuLink.link.toLowerCase())) {
                active = menuLink.link;
            } 
        });
        if (!active) active = '/';

        setActiveLink(active)

    }, [props.location])

    if (props.minimal) {
        return (
            <NavWrapper ishomepage="true">
                <LinkLogo to="/">
                    <Logo src={darkLogo.default} alt={intl.formatMessage({id: "header.logoAlt"})} />
                </LinkLogo>
            </NavWrapper>
        );
    }

    return (
        <NavWrapper ishomepage={props.ishomepage}>
            <LinkLogo to="/">
                {
                    props.ishomepage === "true"? 
                    <Logo src={darkLogo.default} alt={intl.formatMessage({id: "header.logoAlt"})} /> : 
                    <Logo src={lightLogo.default} alt={intl.formatMessage({id: "header.logoAlt"})} />
                }
            </LinkLogo>
            <LangSelector ishomepage={props.ishomepage}>
                <IntlContextConsumer>
                {({ languages, language: currentLocale }) =>
                    languages.map(language => (
                        <LangItem key={language} 
                            isSelected={currentLocale === language}
                            onClick={() => changeLocale(language)}
                            >
                            <Lang href="#">
                                <LangContent 
                                    isSelected={currentLocale === language} 
                                    ishomepage={props.ishomepage} 
                                    lang={language} 
                                    title={languageNames[language]}>
                                    {language}
                                </LangContent>
                            </Lang>
                        </LangItem>
                    ))
                }
                </IntlContextConsumer>
            </LangSelector>
            <NavToggler onClick={() => {setIsNavOpen(true)}}>
                {
                    props.ishomepage === "true" ? 
                    <NavTogglerIcon src={lightIconToggler.default} alt={intl.formatMessage({id: "header.iconTogglerAlt" })} />
                    : <NavTogglerIcon src={darkIconToggler.default} alt={intl.formatMessage({id: "header.iconTogglerAlt" })} />
                }
            </NavToggler>
            <MainNavContainer isNavOpen={isNavOpen} >
                <NavTogglerClose onClick={() => {setIsNavOpen(false)}}>
                    <NavTogglerCloseIcon src={iconTogglerClose.default} alt={intl.formatMessage({id: "header.iconTogglerCloseAlt"})} />
                </NavTogglerClose>
                <MainNav ishomepage={props.ishomepage}>
                    <NavLinks>
                        {
                            props.menuLinks && props.menuLinks.map((menuLink)=> {
                                return (
                                    <NavItem key={menuLink.name} onClick={() => {setIsNavOpen(false)}}>
                                        <NavLink to={menuLink.link} active={activeLink === menuLink.link ? 1 : 0}>
                                            {intl.formatMessage({id:menuLink.name})}
                                        </NavLink>
                                    </NavItem>)
                                })
                        }     
                    </NavLinks>
                </MainNav>
            </MainNavContainer>
        </NavWrapper>
    );
};

export default Header;
