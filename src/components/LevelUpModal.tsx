
import styles from '../styles/components/LevelUpModal.module.css';
import { useContext } from 'react';
import { ChallengesContext } from './../contexts/ChallengesContext';

export function LevelUpModal() {

    const { level, closeLevelUpMddal } = useContext(ChallengesContext);

    return (
        <div className={styles.overlay}>
            <div className={styles.container}>
                <header>{level}</header> 

                <strong>Parabéns</strong>
                <p>Você alcançou um novo level</p>

                <button type="button" onClick={closeLevelUpMddal}>
                    <img src="/icons/close.svg" alt="Fechar modal"/>
                </button>
            </div>  
        </div>   
    )
}