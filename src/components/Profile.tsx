import styles from "../styles/components/Profile.module.css";
import { ChallengesContext } from './../contexts/ChallengesContext';
import { useContext } from 'react';

export function Profile() {
  const { level } = useContext(ChallengesContext);

  return (
    <div className={styles.profileContainer}>
      <img src="https://github.com/Vic-NG.png" alt="Victor Nimer" />
      <div>
        <strong>Victor Nimer</strong>
        <p>
          <img src="icons/level.svg" alt="" />
          Level {level}
        </p>
      </div>
    </div>
  );
}
