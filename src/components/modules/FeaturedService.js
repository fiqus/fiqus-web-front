import React, {useState, useEffect} from 'react';
import styled from 'styled-components'
import { useIntl, Link } from "gatsby-plugin-react-intl"
import data from '../../content/content.json'
import {Waypoint} from 'react-waypoint'
import Lottie from 'lottie-react'
import { AnchorLink } from 'gatsby-plugin-anchor-links'
import capacitacionAnimation from '../../images/animations/capacitacion.json'

const styles = data.styles

const FeaturedServiceContainer = styled.div`
    background: ${styles.colors.white};
    position: relative;
    min-height: 253px;
    margin-bottom: 0px;
    @media (min-width: ${styles.breakpoints.m}px) {
        min-height: 215px;
        padding: 0 20px;
    }
    
    ${props => {
        if (props.ishomepage) {
            return ` 
            flex-basis: 100%;
            max-width: 320px;
            border-radius: 14px;
            padding: 0px;
            min-height: unset;
            background: ${styles.colors.white};
            margin: 0px;
            @media (min-width: ${styles.breakpoints.m}px) {
                position: static;
                flex-basis: 50%;
                max-width: 330px;
                min-height: unset;
                width: 100%;
                margin: 0;
                padding: 0;
                border: none;
                box-shadow: none;
                &:hover {
                    outline: solid 3px ${styles.colors.purplePrimary};
                }
            }
            @media (min-width: ${styles.breakpoints.l}px) {
                flex-basis: 33.33%;
            }
            `
        }
    }}
`
const FeaturedServiceLink = styled(AnchorLink)`
    width: 100%;
    height: 100%;
    padding: 18px 20px 22px 20px;
    text-decoration: none;
    @media (min-width: ${styles.breakpoints.m}px) {
        padding: 15px 20px 25px 20px;
    }

`
const FeaturedServiceWrapper = styled.div`
    position: relative;
    position: absolute;
    left: 0;
    right: 0;
    margin: auto; 
    margin-top: -200px;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 320px;
    padding: 46px 22px 33px 22px;
    background: ${styles.colors.white};
    border: 2px solid ${styles.colors.purplePrimary};
    border-radius: 14px;
    box-shadow: 0px 6px 0px ${styles.colors.purplePrimary};
    @media (min-width: ${styles.breakpoints.m}px) {
        max-width: 946px;
        width: calc(100% - 40px);
        flex-direction: row;
        align-items: flex-start;;
        margin: 87px auto 80px auto;
        margin-top: -155px;
        padding: 0;
        background: ${styles.colors.transparent};
        border: 0;
        box-shadow: none;
    }
    ${props => {
        if (props.ishomepage) {
            return ` 
            position: static;
            max-width: 320px;
            margin: auto;
            box-shadow: none;
            border: none;
            background: ${styles.colors.unset};
            margin-top: 0px;
            padding: 0px;
            
            @media (min-width: ${styles.breakpoints.m}px) {
                max-width: unset;
                width: 100%;
                height: 100%;
                box-shadow: none;
                margin: 0;
                border: none;
                background: ${styles.colors.unset};
                flex-direction: column;
                align-items: center;
            }
            `
        }
    }}
`
const ImageContainer = styled.div`
    @media (min-width: ${styles.breakpoints.m}px) {
        position: relative;
        width: 387px;
        max-width: 387px;
        padding: 43px 74px 52px 55px;
        margin-bottom: 50px;
        background: ${styles.colors.white};
        border: 3px solid ${styles.colors.purplePrimary};
        border-radius: 14px;
        box-shadow: 12px 12px 0px ${styles.colors.purplePrimary};
    }
    ${props => {
        if (props.ishomepage) {
            return ` 
            @media (min-width: ${styles.breakpoints.m}px) {
                position: static;
                width: unset;
                max-width: unset;
                padding: unset;
                margin-bottom: unset;
                background: unset;
                border: none;
                border-radius: unset;
                box-shadow: none;
            }
            `
        }
    }}
`
const FeaturedServiceImage = styled.div`
    max-width: 210px;
    margin-bottom: 27px;
    @media (min-width: ${styles.breakpoints.m}px) {
        max-width: 258px;
        margin-bottom: 0;
        margin: 0 auto;
    }
    ${props => {
        if (props.ishomepage) {
            return ` 
            max-height: 120px;
            max-width: 100%;
            max-height: 160px;
            margin-bottom: 0;
            @media (min-width: ${styles.breakpoints.m}px) {
                max-height: 175px;
            }
            `
        }
    }}
`
const InfoContainer = styled.div`
    width: unset;
    right: 0;
    @media (min-width: ${styles.breakpoints.m}px) {
        position: absolute;
        top: 65px;
        right: 20px;
        z-index: 2;
        width: 100%;
        padding: 49px 47px 44px 47px;
        background: ${styles.colors.white};
        border: 3px solid ${styles.colors.purplePrimary};
        border-radius: 14px;
        box-shadow: 12px 12px 0px ${styles.colors.purplePrimary};
    }
    @media (min-width: ${styles.breakpoints.m}px) and (max-width: 875px) {
        max-width: 450px;
    }
    @media (min-width: 876px) and (max-width: 925px) {
        max-width: 500px;
    }
    @media (min-width: 926px) {
        max-width: 600px;
    }   
    @media (min-width: ${styles.breakpoints.l}px) {
        width: unset;
        padding: 49px 47px 44px 86px;
        right: 0;
    }
    ${props => {
        if (props.ishomepage) {
            return ` 
            @media (min-width: ${styles.breakpoints.m}px) {
                position: static;
                top: unset;
                right: unset;
                z-index: unset;
                width: unset;
                max-width: unset;
                padding: unset;
                background: unset;
                border: none;
                border-radius: unset;
                box-shadow: none;
            }
            `
        }
    }}
`
const FeaturedServiceTitle = styled.h3`
    font-size: 1.44em;
    margin-bottom: 11px;
    color: ${styles.colors.orangeMain};
    text-align: center;
    @media (min-width: ${styles.breakpoints.m}px) {
        margin-bottom: 20px;
        font-size: 2.1em;
        text-align: left;
    }
    ${props => {
        if (props.ishomepage) {
            return ` 
            color: ${styles.colors.purplePrimary};
            margin-bottom: 0;
            margin: 10px 0 0 0;
            @media (min-width: ${styles.breakpoints.m}px) {
                color: ${styles.colors.purplePrimary};
                font-size: 1.44em;
                text-align: center;
                margin: 10px 0 0 0;
            }
            `
        }
    }}
`
const FeaturedServiceDescription = styled.p`
    max-width: 463px;
    font-size: .88em;
    line-height: 22px;
    color: ${styles.colors.darkMainBg};
    @media (min-width: ${styles.breakpoints.m}px) {
        display: block;
        margin-bottom: auto;
        font-size: 1em;
        line-height: 1.44em;
    }
    ${props => {
        if (props.ishomepage) {
            return ` 
            display: none;
            margin-left: 0!important;
            @media (min-width: ${styles.breakpoints.m}px) {
                display: none;
                margin-left: 0!important;
            }
            `
        }
    }}
`

const FeaturedService = (props) => {
    const [renderLottie, setRenderLottie] = useState(false)
    const [pauseAnimation, setPauseAnimation] = useState(true)
    const intl = useIntl();

    useEffect(() => {
        setPauseAnimation(renderLottie)
    }, [renderLottie])

    const startLottie = () => {
        setPauseAnimation(false)
    }

    const pauseLottie = () => {
        setPauseAnimation(true)
    }

    return (
        props.ishomepage ? 
        <FeaturedServiceContainer ishomepage={props.ishomepage} onMouseEnter={startLottie} onMouseLeave={pauseLottie}> 
            <FeaturedServiceWrapper ishomepage={props.ishomepage}> 
                <FeaturedServiceLink
                    ishomepage={props.ishomepage}
                    to={intl.formatMessage({id: "service_subsection.link"})}
                >
                    <ImageContainer ishomepage={props.ishomepage}>
                        <FeaturedServiceImage
                            alt={intl.formatMessage({id: "service_subsection.featuredServiceImageAlt"})}
                            ishomepage={props.ishomepage}
                        >

                            <Lottie
                                animationData={capacitacionAnimation}
                                loop
                                autoPlay={!pauseAnimation}
                                style={{width: '100%'}}
                            />
                        </FeaturedServiceImage>
                    </ImageContainer>
                    <InfoContainer ishomepage={props.ishomepage}>
                            <FeaturedServiceTitle ishomepage={props.ishomepage}>{intl.formatMessage({id: "service_subsection.title"})}</FeaturedServiceTitle>
                            <FeaturedServiceDescription ishomepage={props.ishomepage}>{intl.formatMessage({id: "service_subsection.description"})}</FeaturedServiceDescription>
                    </InfoContainer>
                </FeaturedServiceLink>
            </FeaturedServiceWrapper>
        </FeaturedServiceContainer>
        :
        <FeaturedServiceContainer ishomepage={props.ishomepage}> 
            <FeaturedServiceWrapper id="capacitacion" ishomepage={props.ishomepage}>
                    <Waypoint onEnter={() => { setRenderLottie(true) }} onLeave={()=>{setRenderLottie(false)}} />
                <ImageContainer ishomepage={props.ishomepage}>
                    <FeaturedServiceImage
                        alt={intl.formatMessage({id: "service_subsection.featuredServiceImageAlt"})}
                        ishomepage={props.ishomepage}>
                        <Lottie
                            animationData={capacitacionAnimation}
                            loop
                            autoPlay={!pauseAnimation}
                            style={{width: '100%'}}
                        />
                    </FeaturedServiceImage>
                </ImageContainer>
                <InfoContainer ishomepage={props.ishomepage}>
                        <FeaturedServiceTitle ishomepage={props.ishomepage}>{intl.formatMessage({id: "service_subsection.title"})}</FeaturedServiceTitle>
                        <FeaturedServiceDescription ishomepage={props.ishomepage}>{intl.formatMessage({id: "service_subsection.description"})}</FeaturedServiceDescription>
                </InfoContainer>
            </FeaturedServiceWrapper>
        </FeaturedServiceContainer>
    );
};

export default FeaturedService;