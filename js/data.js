// Food Data
const foodData = [
    // Pizza Category
    {
        id: 1,
        name: "Margherita Pizza",
        category: "pizza",
        price: 12.99,
        image: "https://i.pinimg.com/736x/03/b3/b1/03b3b1ebe9b5d4783773f5052af72cd0.jpg",
        description: "Classic Italian pizza with fresh mozzarella, tomatoes, and basil leaves",
        rating: 4.5,
        featured: true
    },
    {
        id: 2,
        name: "Pepperoni Pizza",
        category: "pizza",
        price: 14.99,
        image: "https://i.pinimg.com/1200x/06/8a/5f/068a5fdb39526f9b5bc7809aa837e972.jpg",
        description: "Traditional pizza topped with spicy pepperoni and mozzarella cheese",
        rating: 4.7,
        featured: true
    },
    {
        id: 3,
        name: "Hawaiian Pizza",
        category: "pizza",
        price: 13.99,
        image: "https://i.pinimg.com/736x/21/d3/7f/21d37f769d51cf55a607c8c94eaf0560.jpg",
        description: "Sweet and savory combination of ham, pineapple, and cheese",
        rating: 4.3,
        featured: false
    },
    {
        id: 4,
        name: "Veggie Supreme",
        category: "pizza",
        price: 13.49,
        image: "https://i.pinimg.com/736x/cc/18/c4/cc18c446b9c0cf894d79bc8f676a8aae.jpg",
        description: "Loaded with bell peppers, mushrooms, onions, olives, and tomatoes",
        rating: 4.6,
        featured: false
    },
    
    // Burger Category
    {
        id: 5,
        name: "Classic Beef Burger",
        category: "burger",
        price: 10.99,
        image: "https://i.pinimg.com/1200x/77/7e/d8/777ed8d70b122823c25a4fc851b437d5.jpg",
        description: "Juicy beef patty with lettuce, tomato, onion, and special sauce",
        rating: 4.8,
        featured: true
    },
    {
        id: 6,
        name: "Cheese Burger",
        category: "burger",
        price: 11.99,
        image: "https://i.pinimg.com/1200x/0c/ac/c9/0cacc9abcaa47092e06f6e6bc7cfece4.jpg",
        description: "Double cheese with beef patty, pickles, and our secret sauce",
        rating: 4.7,
        featured: true
    },
    {
        id: 7,
        name: "Chicken Burger",
        category: "burger",
        price: 9.99,
        image: "https://i.pinimg.com/736x/c9/c5/01/c9c5013a47c78dde12d22a8659cdb945.jpg",
        description: "Crispy chicken fillet with lettuce, tomato, and mayo",
        rating: 4.4,
        featured: false
    },
    {
        id: 8,
        name: "Veggie Burger",
        category: "burger",
        price: 8.99,
        image: "https://i.pinimg.com/1200x/b3/4e/d4/b34ed4b00a3dd297cd6c850133e3936c.jpg",
        description: "Plant-based patty with fresh vegetables and special sauce",
        rating: 4.2,
        featured: false
    },
    
    // Drinks Category
    {
        id: 9,
        name: "Fresh Orange Juice",
        category: "drinks",
        price: 3.99,
        image: "https://i.pinimg.com/736x/4b/10/72/4b10722fc7bcfff5be611a041e329af9.jpg",
        description: "Freshly squeezed orange juice, no added sugar",
        rating: 4.6,
        featured: true
    },
    {
        id: 10,
        name: "Coca Cola",
        category: "drinks",
        price: 2.99,
        image: "https://i.pinimg.com/1200x/0b/2b/e1/0b2be198990a75e8ba1aefd4749b6ce5.jpg",
        description: "Classic refreshing cola drink",
        rating: 4.3,
        featured: false
    },
    {
        id: 11,
        name: "Lemonade",
        category: "drinks",
        price: 3.49,
        image: "https://i.pinimg.com/1200x/27/81/5b/27815bdd1ebf5c78378f48d3b2ba3bde.jpg",
        description: "Fresh homemade lemonade with mint",
        rating: 4.5,
        featured: false
    },
    {
        id: 12,
        name: "Iced Coffee",
        category: "drinks",
        price: 4.99,
        image: "https://i.pinimg.com/1200x/d6/5c/12/d65c1259e064e9cb4053a98ed95ecadc.jpg",
        description: "Cold brew coffee with ice and your choice of milk",
        rating: 4.4,
        featured: false
    },
    
    // Dessert Category
    {
        id: 13,
        name: "Chocolate Cake",
        category: "dessert",
        price: 6.99,
        image: "https://i.pinimg.com/736x/9d/25/93/9d2593780fe22eba7acf1ea6e9e57110.jpg",
        description: "Rich moist chocolate cake with chocolate frosting",
        rating: 4.9,
        featured: true
    },
    {
        id: 14,
        name: "Ice Cream Sundae",
        category: "dessert",
        price: 5.99,
        image: "https://i.pinimg.com/1200x/c2/c4/16/c2c41697407c9849b425dfbf4237971c.jpg",
        description: "Vanilla ice cream with chocolate sauce, nuts, and cherry",
        rating: 4.7,
        featured: true
    },
    {
        id: 15,
        name: "Apple Pie",
        category: "dessert",
        price: 5.49,
        image: "https://i.pinimg.com/736x/b9/73/91/b97391fe5240302406beb20cf528c8f7.jpg",
        description: "Traditional apple pie with cinnamon and vanilla ice cream",
        rating: 4.6,
        featured: false
    },
    {
        id: 16,
        name: "Tiramisu",
        category: "dessert",
        price: 6.49,
        image: "https://i.pinimg.com/1200x/1d/ca/5e/1dca5e1686b145a0c0815cad454984d5.jpg",
        description: "Italian classic with coffee-soaked ladyfingers and mascarpone",
        rating: 4.8,
        featured: false
    },
    
    // Pasta Category
    {
        id: 17,
        name: "Spaghetti Carbonara",
        category: "pasta",
        price: 11.99,
        image: "https://i.pinimg.com/736x/f2/44/b7/f244b753c2be1552016afaa8314d7ad4.jpg",
        description: "Classic Roman pasta with eggs, cheese, and pancetta",
        rating: 4.7,
        featured: true
    },
    {
        id: 18,
        name: "Penne Arrabbiata",
        category: "pasta",
        price: 10.99,
        image: "https://i.pinimg.com/736x/05/44/ea/0544ea625e7846be0707afdec6c3c5b2.jpg",
        description: "Spicy tomato sauce with garlic and red chili peppers",
        rating: 4.4,
        featured: false
    },
    {
        id: 19,
        name: "Fettuccine Alfredo",
        category: "pasta",
        price: 12.49,
        image: "https://i.pinimg.com/1200x/75/21/0b/75210b4dfd2c10906b7f8893cf46316b.jpg",
        description: "Creamy parmesan sauce with fettuccine pasta",
        rating: 4.6,
        featured: false
    },
    
    // Salad Category
    {
        id: 20,
        name: "Caesar Salad",
        category: "salad",
        price: 8.99,
        image: "https://i.pinimg.com/1200x/06/8a/5f/068a5fdb39526f9b5bc7809aa837e972.jpg",
        description: "Romaine lettuce, parmesan, croutons, and Caesar dressing",
        rating: 4.5,
        featured: true
    },
    {
        id: 21,
        name: "Greek Salad",
        category: "salad",
        price: 9.49,
        image: "https://i.pinimg.com/736x/87/1b/08/871b089bf8a6153c9d41dfe9657c22fb.jpg",
        description: "Fresh vegetables with feta cheese and olives",
        rating: 4.3,
        featured: false
    }
];

// Get featured foods
function getFeaturedFoods() {
    return foodData.filter(food => food.featured);
}

// Get foods by category
function getFoodsByCategory(category) {
    if (category === 'all') {
        return foodData;
    }
    return foodData.filter(food => food.category === category);
}

// Search foods by name
function searchFoods(query) {
    return foodData.filter(food => 
        food.name.toLowerCase().includes(query.toLowerCase())
    );
}

// Get food by ID
function getFoodById(id) {
    return foodData.find(food => food.id === parseInt(id));
}

// Get random foods for recommendations
function getRandomFoods(count = 4) {
    const shuffled = [...foodData].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

// Generate star rating HTML
function generateStarRating(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let starsHTML = '';
    
    for (let i = 0; i < fullStars; i++) {
        starsHTML += '<i class="fas fa-star"></i>';
    }
    
    if (hasHalfStar) {
        starsHTML += '<i class="fas fa-star-half-alt"></i>';
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
        starsHTML += '<i class="far fa-star"></i>';
    }
    
    return starsHTML;
}
