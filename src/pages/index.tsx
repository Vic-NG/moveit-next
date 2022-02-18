import Head from "next/head";
import { useState, useEffect } from 'react';
import { GetServerSideProps } from "next";
import Cookies from 'js-cookie';

import { ExperienceBar } from "./../components/ExperienceBar";
import { Profile } from "./../components/Profile";
import { CompletedChallenges } from "./../components/CompletedChallenges";
import { Countdown } from "./../components/Countdown";
import { ChallengeBox } from "./../components/ChallengeBox";
import { CountdownProvider } from "./../contexts/CountdownContext";
import { ChallengesProvider } from "../contexts/ChallengesContext";

import styles from "../styles/Pages/Home.module.css";

interface HomeProps {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
}

export default function Home(props) {

  const [darkTheme, setDarkTheme] = useState(undefined);
  const toggleTheme = (event) => {
    setDarkTheme(event.target.checked);
  }

  useEffect(() => {
    const root = window.document.documentElement;
    const initialColorTheme = root.style.getPropertyValue(
      "--initial-color-mode",
    );
    setDarkTheme(initialColorTheme === "dark");
  }, []);

  useEffect(() => {
		if (darkTheme !== undefined) {
			if (darkTheme) {
				document.documentElement.setAttribute("data-theme", "dark");
				window.localStorage.setItem("theme", "dark");
			} else {
				document.documentElement.removeAttribute("data-theme");
				window.localStorage.setItem("theme", "light");
			}
		}
	}, [darkTheme]);

  return (
      <ChallengesProvider 
        level={props.level}
        currentExperience={props.currentExperience}
        challengesCompleted={props.challengesCompleted}
      >
       {darkTheme !== undefined && (
            <label>
              <input
                type="checkbox"
                checked={darkTheme}
                onChange={toggleTheme}
              />
              {" "}
              Dark mode
            </label>
          )}
        <div className={styles.container}>
          <Head>
            <title>Inicio | MovieIt</title>
            <link rel="icon" type="image/png" href="/favicon.png" />
          </Head>
          <ExperienceBar />
          <CountdownProvider>
            <section>
              <div>
                <Profile />
                <CompletedChallenges />
                <Countdown />
              </div>
              <div>
                <ChallengeBox />
              </div>
            </section>
          </CountdownProvider>
        </div>
      </ChallengesProvider>
  );
}


export const getServerSideProps: GetServerSideProps = async (ctx) => {

  // chamada api
  const user = {
    level: 1,
    currentExperience: 50,
    challengesCompleted: 2,
  }

  const { level, currentExperience, challengesCompleted, darkTheme } = ctx.req.cookies;

  return {
    props: {
      level: Number(level),
      currentExperience: Number(currentExperience),
      challengesCompleted: Number(challengesCompleted),
      darkTheme: String(darkTheme)
    }
  }
}

