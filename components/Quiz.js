import React, { useState } from 'react';
import styles from '../styles/pages/quiz.module.css';
import { recommendSkills } from '../utils/recommendSkills.js';

const Quiz = ({ quizData, onComplete, language = "pl" }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [recommendedSkills, setRecommendedSkills] = useState([]);

    const handleOptionSelect = (answer) => {
        const updatedAnswers = [...answers, answer];
        setAnswers(updatedAnswers);

        if (currentStep < quizData.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            const skills = recommendSkills(updatedAnswers, language); // Use selected language
            setRecommendedSkills(skills);
            onComplete(updatedAnswers);
        }
    };

    return (
        <div>
            {currentStep < quizData.length ? (
                <>
                    <h2>{quizData[currentStep].question}</h2>
                    {quizData[currentStep].options.map((option, index) => (
                        <button
                            key={index}
                            className={styles.optionButton}
                            onClick={() => handleOptionSelect(option)}
                        >
                            {option}
                        </button>
                    ))}
                </>
            ) : (
                <div>
                    <h2>Recommended Skills</h2>
                    {recommendedSkills.map((skill, index) => (
                        <p key={index}>{skill}</p>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Quiz;
