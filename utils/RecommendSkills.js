import pageStructure from '../data/page_structure.json';

/** Utility to shuffle an array and pick the first N items */
function getRandomItems(array, count) {
    return array.sort(() => 0.5 - Math.random()).slice(0, count);
}

/** Recursively get all leaf node names (i.e., the final skills) */
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

/** Gather every skill from the entire page structure */
function getAllSkillsFromPageStructure(pageStructure) {
    let allSkills = [];
    for (let category in pageStructure) {
        const nodes = pageStructure[category];
        allSkills.push(...getLeafNodes(nodes));
    }
    return allSkills;
}

/**
 * This version will:
 *   - Pick 1 skill per answer (up to 3 answers → 3 skills).
 *   - Then pick 2 random skills from the entire set.
 *   - Finally, ensure exactly 5 unique skills are returned.
 */
export function recommendSkills(answers) {
    let skills = [];

    // Map of answers to possible categories
    // Adjust this to fit your own categories as needed
    const answerToCategories = {
        // First Question
        'Sports activity':           ['Sports and Fitness', 'Outdoor Activities'],
        'Admiring art':             ['Art', 'Design'],
        'Staying at home with a book': ['Culinary', 'Handicrafts and DIY', 'Languages'],

        // Second Question
        'Outdoors': ['Outdoor Activities', 'Sports and Fitness'],
        'Indoors':  ['Technology', 'Art', 'Culinary', 'Handicrafts and DIY'],

        // Third Question
        'Physical': ['Physical Training', 'Martial Arts'],
        'Mental':   ['Technology', 'Languages', 'Professional Skills'],
        'Creative': ['Art', 'Music', 'Design', 'Handicrafts and DIY', 'Beauty and Makeup']
    };

    // 1) For each answer, pick 1 skill
    //    (If you have exactly 3 answers, you'll end up with exactly 3 skills from answers.)
    for (let answer of answers) {
        const categories = answerToCategories[answer] || [];
        if (categories.length > 0) {
            // Pick 1 random category for this answer
            const selectedCategory = getRandomItems(categories, 1)[0];

            // Get the array of pageStructure nodes for this category
            const categoryNodes = pageStructure[selectedCategory];
            if (categoryNodes) {
                // Filter out subcategories (those with children)
                const subcategories = categoryNodes.filter(
                    (node) => node.children && node.children.length > 0
                );

                if (subcategories.length > 0) {
                    // Pick 1 random subcategory
                    const subcategoryName = getRandomItems(
                        subcategories.map((sc) => sc.name),
                        1
                    )[0];

                    // Find the subcategory node
                    const subcategoryNode = subcategories.find(
                        (sc) => sc.name === subcategoryName
                    );

                    // Get all leaf skills under that subcategory
                    const skillsInSubcategory = getLeafNodes([subcategoryNode]);
                    // Randomly pick 1 skill
                    const selectedSkill = getRandomItems(skillsInSubcategory, 1);
                    skills.push(...selectedSkill);
                } else {
                    // If there are no subcategories, pick directly from the category
                    const skillsInCategory = getLeafNodes(categoryNodes);
                    const selectedSkill = getRandomItems(skillsInCategory, 1);
                    skills.push(...selectedSkill);
                }
            }
        }
    }

    // 2) Pick 2 random skills from the entire skill set
    const allSkills = getAllSkillsFromPageStructure(pageStructure);
    skills.push(...getRandomItems(allSkills, 2));

    // 3) Remove duplicates
    let uniqueSkills = [...new Set(skills)];

    // 4) If we have fewer than 5 (e.g., answers do not map to enough categories), fill up
    while (uniqueSkills.length < 5) {
        const randomSkill = getRandomItems(allSkills, 1)[0];
        if (!uniqueSkills.includes(randomSkill)) {
            uniqueSkills.push(randomSkill);
        }
    }

    // 5) Return exactly 5
    return uniqueSkills.slice(0, 5);
}
