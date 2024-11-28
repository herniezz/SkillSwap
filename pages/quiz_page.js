import { useState } from 'react';
import { Button, Title, Stack, Text } from '@mantine/core';
import Quiz from '../components/Quiz';
import { recommendSkills } from '../utils/recommendSkills';
import quizDataEn from '../data/quizData_en.json';
import quizDataPl from '../data/quizData_pl.json';
import styles from '../styles/pages/quiz.module.css';

const QuizPage = () => {
    const [language, setLanguage] = useState("en");
    const [results, setResults] = useState(null);

    const handleQuizComplete = (answers) => {
        const recommendedSkills = recommendSkills(answers);
        setResults(recommendedSkills);
    };

    const quizData = language === "pl" ? quizDataPl : quizDataEn;

    return (
        <div className={styles.backgroundGradient}>
            <div className={styles.container}>
                <Title order={3} className={styles.title}>
                    {language === "pl" ? "Hej, wybierzmy rekomendowane skille 👋" : "Hi, let's choose what we would like to recommend you 👋"}
                </Title>
                <div className={styles.buttonStack}>
                    <Button variant="light" color="violet" onClick={() => setLanguage("en")}>English</Button>
                    <Button variant="light" color="violet" onClick={() => setLanguage("pl")}>Polski</Button>
                </div>

                {results ? (
                    <Stack spacing="xs">
                        {results.map((skill, index) => (
                            <Text key={index} className={styles.optionButton}>
                                {skill}
                            </Text>
                        ))}
                    </Stack>
                ) : (
                    <Quiz quizData={quizData} onComplete={handleQuizComplete}/>
                )}
            </div>
        </div>
    );
};

export default QuizPage;
