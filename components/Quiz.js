
import React, { useState } from 'react';
import styles from '../styles/pages/quiz.module.css';

const Quiz = ({ quizData, onComplete }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState([]);

    const handleOptionSelect = (answer) => {
        setAnswers([...answers, answer]);
        if (currentStep < quizData.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            onComplete(answers);
        }
    };

    return (
        <div>
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
        </div>
    );
};

export default Quiz;
