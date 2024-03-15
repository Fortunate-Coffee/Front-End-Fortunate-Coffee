export const categories = [
    {image: "Limited Offer.jpg", name: "Limited Offer", slug: "Limited Offer"},
    {image: "Fortunate Bread.jpeg", name: "Fortunate Bread", slug: "Fortunate Bread"},
    {image: "Asian Cuisine.jpeg", name: "Asian Cuisine", slug: "Asian Cuisine"},
    {image: "Spaghetti.jpg", name: "Spaghetti", slug: "Spaghetti"},
    {image: "Fortunate Rice.jpg", name: "Fortunate Rice", slug: "Fortunate Rice"},
    {image: "Fast Food.png", name: "Fast Food", slug: "Fast Food"},
    {image: "Miscellaneous.jpg", name: "Miscellaneous", slug: "Miscellaneous"},
    {image: "Fortunate Coffee.jpeg", name: "Fortunate Coffee", slug: "Fortunate Coffee"},
    {image: "Fortunate Tea.jpeg", name: "Fortunate Tea", slug: "Fortunate Tea"},
    {image: "Fresh Juice.webp", name: "Fresh Juice", slug: "Fresh Juice"},
    {image: "Fresh Mocktail.jpeg", name: "Fresh Mocktail", slug: "Fresh Mocktail"},
    {image: "Fortunate Dessert.jpg", name: "Fortunate Dessert", slug: "Fortunate Dessert"},
];

export const menuData = {
    "Limited Offer": {
        title: "Limited Offer",
        items: [
            { name: "Grilled Cheesy Rice", price: 42000},
            { name: "Mentai Cheesy Rice", price: 47000},
            { name: "Delightful Rice", price: 42000}
        ]
    },

    "Fortunate Bread": {
        title: "Fortunate Bread",
        items: [
            { name: "Sesame Bun", price: 13000},
            { name: "Coffee Bread", price: 21000},
            { name: "Nuts Bread", price: 26000},
            { name: "Wheat Toast", price: 36000},
            { name: "Chocolate Almond Bread", price: 51000}
        ]
    },

    "Asian Cuisine": {
        title: "Asian Cuisine",
        items: [
            { name: "Korean Casual Rice", price: 13000},
            { name: "Japanese Miso Mie", price: 21000},
            { name: "Korean Spicy Lamie", price: 26000},
            { name: "Teriyaki Rice", price: 36000}
        ]
    },

    "Spaghetti": {
        title: "Spaghetti",
        items: [
            { name: "S/F Blackpepper", price: 42000},
            { name: "S/F Carbonara", price: 42000},
            { name: "Mashed Potato", price: 38000},
            { name: "S/F Marinade", price: 42000},
            { name: "S/F Aglio Olio", price: 42000}
        ]
    },

    "Fortunate Rice": {
        title: "Fortunate Rice",
        items: [
            { name: "Grilled Kampoeng Rice", price: 30000},
            { name: "Grateful Rice", price: 42000},
            { name: "Lucky Rice", price: 26000},
            { name: "Joyful Rice", price: 26000},
            { name: "Grilled Curry Rice", price: 30000}
        ]
    },

    "Fast Food": {
        title: "Fast Food",
        items: [
            { name: "Burger Special", price: 32000},
            { name: "Wakame Salad", price: 38000},
            { name: "Ostreatus Satay", price: 29000},
            { name: "Edamame", price: 19000},
            { name: "Crispy Tofu", price: 23000}
        ]
    },

    "Miscellaneous": {
        title: "Miscellaneous",
        items: [
            { name: "Roasted Nori", price: 34000},
            { name: "Vegan Chocolate Cookies", price: 34000},
            { name: "Vegan Matcha Cookies", price: 50000},
            { name: "Roejak", price: 36000},
            { name: "Fruid Platter", price: 48000}
        ]
    },

    "Fortunate Coffee": {
        title: "Fortunate Coffee",
        items: [
            { name: "Soy Coffee (Cold)", price: 32000},
            { name: "Soy Cocoa (Cold)", price: 32000},
            { name: "Espresso White (Hot)", price: 20000},
            { name: "Black Coffee (Hot)", price: 22000},
            { name: "Chocolate (Cold)", price: 32000}
        ]
    },

    "Fortunate Tea": {
        title: "Fortunate Tea",
        items: [
            { name: "Ice Tea Tong", price: 10000},
            { name: "Green Tea", price: 18000},
            { name: "Jasmine", price: 18000},
            { name: "Earl Grey", price: 18000},
            { name: "Peppermint", price: 18000}
        ]
    },

    "Fresh Juice": {
        title: "Fresh Juice",
        items: [
            { name: "Carrot", price: 22000},
            { name: "Cucumber", price: 22000},
            { name: "Melon", price: 22000},
            { name: "Watermelon", price: 30000},
            { name: "Kiwi", price: 34000}
        ]
    },

    "Fresh Mocktail": {
        title: "Fresh Mocktail",
        items: [
            { name: "Lemongrass", price: 25000},
            { name: "Meryminty", price: 28000},
            { name: "Kimono", price: 32000},
            { name: "Sunrise", price: 36000},
            { name: "Punch", price: 38000}
        ]
    },

    "Fortunate Dessert": {
        title: "Fortunate Dessert",
        items: [
            { name: "Cocoa Ice Cream", price: 22000},
            { name: "Coffee Ice Cream", price: 22000},
            { name: "Brownies", price: 10000},
            { name: "Summer Brown", price: 28000},
            { name: "Greeting Waffle", price: 32000}
        ]
    },

};

export const categoryFiles = categories.map(category => ({
    ...category,
    ...menuData[category.slug]
}));