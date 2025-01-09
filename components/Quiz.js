import React, { useState } from 'react';
import styles from '../styles/pages/quiz.module.css';
import { IconArrowLeft } from '@tabler/icons-react'; // Import arrow icon
import icons from '../components/icons'

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
              {option === "Sports activity" && (
                <img
                  src="https://skillswapp.s3.eu-north-1.amazonaws.com/1736438212454-sport.png" 
                  alt="Sport Icon"
                  style={{ width: 20, height: 20, marginRight: '10px' }} 
                />
              )}
              {option === "Technical news" && (
                <img
                  src="https://skillswapp.s3.eu-north-1.amazonaws.com/1736438292590-tech.png" 
                  alt="Tech Icon"
                  style={{ width: 20, height: 20, marginRight: '10px' }} 
                />
              )}
              {option === "Admiring art" && (
                <img
                  src="https://skillswapp.s3.eu-north-1.amazonaws.com/1736438009062-art.png" 
                  alt="Art Icon"
                  style={{ width: 20, height: 20, marginRight: '10px' }}
                />
              )}
               {option === "Fashion, latest trends" && (
                <img
                  src="https://skillswapp.s3.eu-north-1.amazonaws.com/1736438254146-style.png" 
                  alt="Style Icon"
                  style={{ width: 20, height: 20, marginRight: '10px' }}
                />
              )}
              {option === "Travel, interesting places" && (
                <img
                  src="https://skillswapp.s3.eu-north-1.amazonaws.com/1736438350596-travel.png"
                  alt="Travel Icon"
                  style={{ width: 20, height: 20, marginRight: '10px' }}
                />
              )}
              {option === "Meeting new people" && (
                <img
                  src="https://skillswapp.s3.eu-north-1.amazonaws.com/1736438183199-meet.png"
                  alt="Meet Icon"
                  style={{ width: 20, height: 20, marginRight: '10px' }}
                />
              )}
              {option === "Mind-calming activities" && (
                <img
                  src="https://skillswapp.s3.eu-north-1.amazonaws.com/1736438135676-calm.png" 
                  alt="Calm Icon"
                  style={{ width: 20, height: 20, marginRight: '10px' }}
                />
              )}
              {option === "Technology-related topics" && (
                <img
                  src="https://skillswapp.s3.eu-north-1.amazonaws.com/1736438320775-tech1.png"
                  alt="Tech1 Icon"
                  style={{ width: 20, height: 20, marginRight: '10px' }}
                />
              )}
                {option === "Staying at home with a book" && (
                    <img
                      src="https://skillswapp.s3.eu-north-1.amazonaws.com/1736438081295-book.png"
                      alt="Book Icon"
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
