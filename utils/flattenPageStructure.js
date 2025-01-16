/**
 * Recursively traverses the entire JSON (with categories as top-level keys).
 * Produces an array of objects: { category, name, tags } for each node.
 * Skips any top-level category if it's empty, and skips any item if its name
 * is empty OR it has zero tags.
 */
export function flattenPageStructure(pageStructure) {
    const results = [];

    // For each top-level category like "Technology", "Culinary", etc.
    for (const [categoryName, items] of Object.entries(pageStructure)) {
        // Skip if categoryName is empty or whitespace
        if (!categoryName || !categoryName.trim()) {
            continue;
        }

        for (const item of items) {
            traverseItem(item, categoryName);
        }
    }

    function traverseItem(item, category) {
        // Gather this item’s tag names
        const tagNames = (item.tags || []).map((tagObj) => tagObj.name);

        // 1) Skip if item.name is empty or whitespace
        if (!item.name || !item.name.trim()) {
            return;
        }

        // 2) Skip if no tags
        if (tagNames.length === 0) {
            return;
        }

        // Otherwise, add to results
        results.push({
            category,
            name: item.name,
            tags: tagNames,
        });

        // Recurse into children
        if (Array.isArray(item.children) && item.children.length > 0) {
            for (const child of item.children) {
                traverseItem(child, category);
            }
        }
    }

    return results;
}
