const cookingPotRecipes = [
    {
        "identifer": "fastfooddelight:apple_sauce",
        "type": 'farmersdelight:cooking',
        "container": { "item": 'minecraft:bowl' },
        "time": 200,
        "priority": 0,
        "experience": 1.0,
        "ingredients": [
            { "item": 'minecraft:apple' },
            { "item": 'minecraft:apple' },
            { "item": 'minecraft:sugar' },
            { "item": 'minecraft:sugar' }
        ],
        "result": { "item": 'fastfooddelight:apple_sauce' }
    },
    {
        "identifer": "fastfooddelight:french_fries",
        "type": 'farmersdelight:cooking',
        "container": { "item": 'fastfooddelight:fries_bowl' },
        "time": 200,
        "priority": 0,
        "experience": 1.5,
        "ingredients": [
            { "item": 'minecraft:potato' }
        ],
        "result": { "item": 'fastfooddelight:french_fries' }
    },
    {
        "identifer": "fastfooddelight:cheese",
        "type": 'farmersdelight:cooking',
        "time": 200,
        "priority": 0,
        "experience": 2.0,
        "ingredients": [
            { "item": 'minecraft:milk_bucket' }
        ],
        "result": { "item": 'fastfooddelight:bucket_cheese' }
    },
    {
        "identifer": "fastfooddelight:beet_fries",
        "type": 'farmersdelight:cooking',
        "container": { "item": 'fastfooddelight:fries_bowl' },
        "time": 200,
        "priority": 0,
        "experience": 1.5,
        "ingredients": [
            { "item": 'minecraft:beetroot' }
        ],
        "result": { "item": 'fastfooddelight:beet_fries' }
    },
    {
        "identifer": "fastfooddelight:fried_onions",
        "type": 'farmersdelight:cooking',
        "container": { "item": 'fastfooddelight:fries_bowl' },
        "time": 200,
        "priority": 0,
        "experience": 1.5,
        "ingredients": [
            { "item": 'farmersdelight:onion' }
        ],
        "result": { "item": 'fastfooddelight:fried_onions' }
    },
    {
        "identifer": "fastfooddelight:carrot_fries",
        "type": 'farmersdelight:cooking',
        "container": { "item": 'fastfooddelight:fries_bowl' },
        "time": 200,
        "priority": 0,
        "experience": 1.5,
        "ingredients": [
            { "item": 'minecraft:carrot' }
        ],
        "result": { "item": 'fastfooddelight:carrot_fries' }
    }
];

export { cookingPotRecipes };