import React, { useState } from 'react';
import styles from '../styles/pages/quiz.module.css';
import { IconArrowLeft } from '@tabler/icons-react'; // Import arrow icon
import icons from '../components/icons'; // Import icons

const Quiz = ({ quizData, onComplete }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [selectedOption, setSelectedOption] = useState(null);

    const handleOptionSelect = (option) => {
        setSelectedOption(option);
    };

    const handleNext = () => {
        if (selectedOption === null) {
            alert('Please select an option before proceeding.');
            return;
        }

        const updatedAnswers = [...answers];
        updatedAnswers[currentStep] = selectedOption;
        setAnswers(updatedAnswers);
        setSelectedOption(null);

        if (currentStep < quizData.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            onComplete(updatedAnswers);
        }
    };

    const handleBack = () => {
        if (currentStep > 0) {
            setSelectedOption(answers[currentStep - 1]); // Pre-fill the previously selected option
            setCurrentStep(currentStep - 1);
        }
    };

    return (
        <div>
            {currentStep < quizData.length ? (
                <>
                    <div className={styles.header}>
                        <button
                            className={styles.backButton}
                            onClick={handleBack}
                            disabled={currentStep === 0}
                        >
                            <IconArrowLeft size={24} />
                        </button>
                        <h2 className={styles.question}>{quizData[currentStep].question}</h2>
                    </div>
                    <p className={styles.subtitle}>Choose one option. 👇</p>
                    <div className={styles.optionsContainer}>
                        {quizData[currentStep].options.map((option, index) => (
                            <button
                                key={index}
                                className={`${styles.optionButton} ${
                                    selectedOption === option ? styles.selectedOption : ''
                                }`}
                                onClick={() => handleOptionSelect(option)}
                            >
                                {icons[option] && (
                                    <img
                                        src={icons[option]}
                                        alt={`${option} Icon`}
                                        style={{ width: 20, height: 20, marginRight: '10px' }}
                                    />
                                )}
                                {option}
                            </button>
                        ))}
                    </div>
                    <button
                        onClick={handleNext}
                        className={styles.nextButton}
                        disabled={selectedOption === null}
                    >
                        Next
                    </button>
                </>
            ) : (
                <div>
                    <h1 className={styles.endcardTitle}>Your new skills</h1>
                    <h2 className={styles.endcardSubtitle}>
                        Choose the skill that appeals most to you to start a new adventure. ✨
                    </h2>
                    <div className={styles.skillsContainer}>
                        {onComplete(answers).map((skill, index) => (
                            <p key={index} className={styles.skillItem}>
                                {skill}
                            </p>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Quiz;
