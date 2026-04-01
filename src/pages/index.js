import React from "react";
import styled from "styled-components";
import { styles } from "../content/content.json";
const githubIcon = require("../images/icon_github.svg");

const Main = styled.main`
  min-height: calc(100vh - 62px);
  background: linear-gradient(
    180deg,
    ${styles.colors.purplePrimary} 0%,
    #2e003d 100%
  );
  color: ${styles.colors.white};
  padding: 42px 20px 64px;

  @media (min-width: ${styles.breakpoints.m}px) {
    min-height: calc(100vh - 76px);
    padding: 72px 32px 80px;
  }
`;

const Container = styled.section`
  max-width: 980px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 2.1rem;
  line-height: 1.08;
  margin-bottom: 22px;

  @media (min-width: ${styles.breakpoints.m}px) {
    font-size: 3.1rem;
    margin-bottom: 30px;
  }
`;

const Body = styled.p`
  font-size: 1.05rem;
  line-height: 1.65;
  max-width: 880px;
  margin-bottom: 18px;

  @media (min-width: ${styles.breakpoints.m}px) {
    font-size: 1.18rem;
    margin-bottom: 20px;
  }
`;

const LinksGrid = styled.div`
  display: grid;
  grid-template-columns: auto;
  gap: 14px;
  margin: 12px 0 18px;
  justify-content: center;

  @media (min-width: ${styles.breakpoints.s}px) {
    grid-template-columns: auto auto;
  }
`;

const CoopLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 460px;
  min-height: 94px;
  padding: 10px 12px;
  transition: transform 150ms ease, opacity 150ms ease;

  &:hover,
  &:focus {
    transform: translateY(-2px);
    opacity: 0.9;
    outline: none;
  }
`;

const CoopLogo = styled.img`
  display: block;
  width: auto;
  max-width: 100%;
  max-height: 50px;
  object-fit: contain;
  object-position: center center;
  margin: 0 auto;
  padding-right: 100px;
`;

const GithubLink = styled.a`
  color: ${styles.colors.greenMain};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-left: 8px;
  vertical-align: middle;
`;

const GithubIcon = styled.img`
  width: 38px;
  height: 38px;
  filter: brightness(0) invert(1);
`;

const Index = () => {
  return (
    <Main>
      <Container>
        <Title>FIQUS inicia una nueva etapa</Title>
        <Body>
          Tras años de trabajo conjunto, Fiqus cierra un ciclo y da lugar a dos
          nuevas cooperativas:
        </Body>
        <LinksGrid>
          <CoopLink
            href="https://farox.coop"
            target="_blank"
            rel="noopener noreferrer"
          >
            <CoopLogo src="/coop-logos/LOGO%20FAROX.png" alt="Farox" />
          </CoopLink>
          <CoopLink
            href="https://lawal.coop"
            target="_blank"
            rel="noopener noreferrer"
          >
            <CoopLogo src="/coop-logos/lawal-logo.png" alt="Lawal" />
          </CoopLink>
        </LinksGrid>
        <Body>
          Ambas llevan en su origen la experiencia, los vínculos y los valores
          construidos durante este recorrido, y seguirán aportando al desarrollo
          de tecnología con compromiso social.
        </Body>
        <Body>
          Agradecemos a todas las personas e instituciones que han acompañado
          nuestra historia y que continuarán formando parte de esta red, ahora
          con nuevos caminos y más oportunidades de colaboración.
        </Body>
        <Body>
          Pueden encontrar los desarrollos que hicimos en Fiqus, en nuestro
          GitHub
          <GithubLink
            href="https://github.com/fiqus"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GithubIcon src={githubIcon.default} alt="GitHub de Fiqus" />
          </GithubLink>
        </Body>
      </Container>
    </Main>
  );
};

export default Index;
