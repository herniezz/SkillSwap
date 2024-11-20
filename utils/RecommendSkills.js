import skillDataEn from '../data/plaska_lista/lista_en.json';
import skillDataPl from '../data/plaska_lista/lista_pl.json';

function getRandomSkills(skills, count) {
    return skills.sort(() => 0.5 - Math.random()).slice(0, count);
}

export function recommendSkills(answers, language = "en") {
    const skillData = language === "pl" ? skillDataPl : skillDataEn;
    let skills = [];

    // odpowiedzi procesowanie ich w sumie
    if (answers[0] === "Sports activity" || answers[0] === "Aktywność sportowa") {
        const sportsSkills = skillData.filter(item => item.category === "Sports");
        skills.push(...getRandomSkills(sportsSkills, 2));
    } else if (answers[0] === "Admiring art" || answers[0] === "Podziwiać sztukę") {
        const artSkills = skillData.filter(item => item.category === "Art");
        skills.push(...getRandomSkills(artSkills, 2));
    } else if (answers[0] === "Staying at home with a book" || answers[0] === "Zanurzyć się w domu z książką") {
        const culinarySkills = skillData.filter(item => item.category === "Culinary");
        skills.push(...getRandomSkills(culinarySkills, 2));
    }

    // trzymaj se odpowiedzi

    // zwroc skille w jezyku
    const uniqueSkills = [...new Set(skills.map(skill => skill.skill))];
    return uniqueSkills;
}
