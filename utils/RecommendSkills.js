import skillDataEn from '../data/plaska_lista/lista_en.json';
import skillDataPl from '../data/plaska_lista/lista_pl.json';


function getRandomSkills(skills, count) {
    return skills.sort(() => 0.5 - Math.random()).slice(0, count);
}

export function recommendSkills(answers, language = "en") {
    // wybierz odpowiednie odpowiedzi na podstawie jezyka
    const skillData = language === "pl" ? skillDataPl : skillDataEn;
    let skills = [];

    console.log("Answers received:", answers);

    // pytanie 1
    if (answers[0] === "Sports activity" || answers[0] === "Aktywność sportowa") {
        const sportsSkills = skillData.filter(item => item.category === "Sports");
        console.log("Sports skills found:", sportsSkills);
        skills.push(...getRandomSkills(sportsSkills, 2));
    } else if (answers[0] === "Admiring art" || answers[0] === "Podziwiać sztukę") {
        const artSkills = skillData.filter(item => item.category === "Art");
        console.log("Art skills found:", artSkills);
        skills.push(...getRandomSkills(artSkills, 2));
    } else if (answers[0] === "Staying at home with a book" || answers[0] === "Zanurzyć się w domu z książką") {
        const culinarySkills = skillData.filter(item => item.category === "Culinary");
        console.log("Culinary skills found:", culinarySkills);
        skills.push(...getRandomSkills(culinarySkills, 2));
    } else {
        console.error("brak pasującej kategorii dla odpowiedzi - NAPRAAAAW[0]:", answers[0]);
    }

    // pytanie 2
    if (answers[1] === "Technology-related topics" || answers[1] === "Nowinki techniczne") {
        const technologySkills = skillData.filter(item => item.category === "Technology");
        console.log("Technology skills found:", technologySkills);
        skills.push(...getRandomSkills(technologySkills, 2));
    } else if (answers[1] === "Fashion, latest trends" || answers[1] === "Moda, najnowsze trendy") {
        const fashionSkills = skillData.filter(item => item.category === "Fashion");
        console.log("Fashion skills found:", fashionSkills);
        skills.push(...getRandomSkills(fashionSkills, 2));
    } else if (answers[1] === "Traveling, interesting places" || answers[1] === "Podróże, inne ciekawe miejsca") {
        const travelSkills = skillData.filter(item => item.category === "Travel");
        console.log("Travel skills found:", travelSkills);
        skills.push(...getRandomSkills(travelSkills, 2));
    } else {
        console.error("brak pasującej kategorii dla odpowiedzi - NAPRAAAAW[1]:", answers[1]);
    }

    // pytanie 3
    if (answers[2] === "Technology-related things" || answers[2] === "Rzeczy technologiczne") {
        const techSkills = skillData.filter(item => item.category === "Technology");
        console.log("Technology skills found:", techSkills);
        skills.push(...getRandomSkills(techSkills, 2));
    } else if (answers[2] === "Exploring the world" || answers[2] === "Poznawaniu świata") {
        const geographySkills = skillData.filter(item => item.category === "Geography");
        console.log("Geography skills found:", geographySkills);
        skills.push(...getRandomSkills(geographySkills, 2));
    } else if (answers[2] === "Mind-calming activities" || answers[2] === "Rzeczy uspokajające umysł") {
        const mindfulnessSkills = skillData.filter(item => item.category === "Mindfulness");
        console.log("Mindfulness skills found:", mindfulnessSkills);
        skills.push(...getRandomSkills(mindfulnessSkills, 2));
    } else {
        console.error("brak pasującej kategorii dla odpowiedzi - NAPRAAAAW [2]:", answers[2]);
    }

    // Fallback - Jeśli nie wybrano żadnych umiejętności, dodaj losowe umiejętności ze wszystkich dostępnych kategorii
    if (skills.length === 0) {
        const allSkills = skillData.map(item => item.skill);
        skills = getRandomSkills(allSkills, 6);
        console.warn("Brak sensownych odpowiedzi, zwroc losowe zeby zawsze cos zwracalo:", skills);
    }

    // usuwanie duplikatów i przywracanie unikalnych skillow
    const uniqueSkills = [...new Set(skills)];
    console.log("Final recommended skills:", uniqueSkills);
    return uniqueSkills;
}
