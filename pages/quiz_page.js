import { useState } from 'react';
import { useRouter } from 'next/router';
import { Title, Stack, Text } from '@mantine/core';
import Quiz from '../components/Quiz';
import { recommendSkills } from '../utils/RecommendSkills';
import quizData from '../data/quizData_en.json';
import styles from '../styles/pages/quiz.module.css';

const QuizPage = () => {
    const [results, setResults] = useState(null);
    const router = useRouter();

    const handleQuizComplete = (answers) => {
        const recommendedSkills = recommendSkills(answers);
        setResults(recommendedSkills);
    };

    const handleSkillClick = (skill) => {
        router.push('/ProposedProfiles');
    };

    return (
        <div className={styles.backgroundGradient}>
            <div className={styles.container}>
                {results ? (
                    <div>
                        <h1 className={styles.endcardTitle}>Your new skills</h1>
                        <h2 className={styles.endcardSubtitle}>
                            Choose the skill that appeals most to you to start a new adventure. ✨
                        </h2>
                        <div className={styles.skillsContainer}>
                            {results.map((skill, index) => (
                                <Text
                                    key={index}
                                    className={styles.skillItem}
                                    onClick={() => handleSkillClick(skill)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    {skill}
                                </Text>
                            ))}
                        </div>
                    </div>
                ) : (
                    <>
                        <Quiz quizData={quizData} onComplete={handleQuizComplete} />
                    </>
                )}
            </div>
        </div>
    );
};

export default QuizPage;