import pageStructure from '../data/page_structure.json';

function getRandomItems(array, count) {
    return array.sort(() => 0.5 - Math.random()).slice(0, count);
}

function getLeafNodes(nodes) {
    let leaves = [];

    for (let node of nodes) {
        if (node.children && node.children.length > 0) {
            leaves.push(...getLeafNodes(node.children));
        } else {
            leaves.push(node.name);
        }
    }

    return leaves;
}

function getAllSkillsFromPageStructure(pageStructure) {
    let allSkills = [];
    for (let category in pageStructure) {
        const nodes = pageStructure[category];
        allSkills.push(...getLeafNodes(nodes));
    }
    return allSkills;
}

export function recommendSkills(answers) {
    let skills = [];

    // Map answers to categories
    const answerToCategories = {
        // First Question
        "Sports activity": ["Sports and Fitness", "Outdoor Activities"],
        "Admiring art": ["Art", "Design"],
        "Staying at home with a book": ["Culinary", "Handicrafts and DIY", "Languages"],

        // Second Question
        "Outdoors": ["Outdoor Activities", "Sports and Fitness"],
        "Indoors": ["Technology", "Art", "Culinary", "Handicrafts and DIY"],

        // Third Question
        "Physical": ["Physical Training", "Martial Arts"],
        "Mental": ["Technology", "Languages", "Professional Skills"],
        "Creative": ["Art", "Music", "Design", "Handicrafts and DIY", "Beauty and Makeup"]
    };

    // For each answer, select categories
    for (let answer of answers) {
        const categories = answerToCategories[answer] || [];
        if (categories.length > 0) {
            // Select 2 random categories from the mapped categories
            const selectedCategories = getRandomItems(categories, 2);

            for (let categoryName of selectedCategories) {
                // Get the nodes under this category
                const categoryNodes = pageStructure[categoryName];
                if (categoryNodes) {
                    // Get all subcategories (children) under this category
                    const subcategories = categoryNodes.filter(node => node.children && node.children.length > 0);
                    const subcategoryNames = subcategories.map(node => node.name);

                    // If subcategories exist, pick 2 random subcategories
                    if (subcategoryNames.length > 0) {
                        const selectedSubcategoryNames = getRandomItems(subcategoryNames, 2);

                        for (let subcategoryName of selectedSubcategoryNames) {
                            // Get the subcategory node
                            const subcategoryNode = subcategories.find(node => node.name === subcategoryName);

                            if (subcategoryNode) {
                                // Get all leaf skills under this subcategory
                                const skillsInSubcategory = getLeafNodes([subcategoryNode]);
                                // Randomly select 1 skill from the subcategory
                                const selectedSkill = getRandomItems(skillsInSubcategory, 1);
                                skills.push(...selectedSkill);
                            }
                        }
                    } else {
                        // If no subcategories, use the category itself to get skills
                        const skillsInCategory = getLeafNodes(categoryNodes);
                        // Randomly select 1 skill from the category
                        const selectedSkill = getRandomItems(skillsInCategory, 1);
                        skills.push(...selectedSkill);
                    }
                }
            }
        }
    }

    // Remove duplicates
    let uniqueSkills = [...new Set(skills)];

    // Now select 2 random skills from the entire skill set
    const allSkills = getAllSkillsFromPageStructure(pageStructure);
    const randomSkills = getRandomItems(allSkills, 2);

    // Combine the skills
    uniqueSkills.push(...randomSkills);

    // Remove duplicates again in case random skills were already included
    uniqueSkills = [...new Set(uniqueSkills)];

    // If we have less than 8 skills, add more random skills to reach 8
    while (uniqueSkills.length < 8) {
        const additionalSkill = getRandomItems(allSkills, 1)[0];
        if (!uniqueSkills.includes(additionalSkill)) {
            uniqueSkills.push(additionalSkill);
        }
    }

    // If we have more than 8 skills, slice to 8
    return uniqueSkills.slice(0, 8);
}
