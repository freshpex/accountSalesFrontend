export const socialData = {
    instagram: [
      {
        id: "001",
        username: "IN34567",
        about: "Special offer for our customers!",
        type: "instagram",
        status: "sold",
        price: 1000,
        images: ["photo1.png", "photo2.png", "photo3.png", "photo4.png"],
        follower: 1000,
        age: 18,
        region: "usa",
        engagement: 1000,
      },
      {
        id: "002",
        username: "IN34567",
        about: "Special offer for our customers!",
        type: "instagram",
        status: "available",
        price: 1000,
        images: ["photo1.png", "photo2.png", "photo3.png", "photo4.png"],
        follower: 1000,
        age: 18,
        region: "usa",        
        engagement: 1000,
      },
      // Add more Instagram posts...
    ],
    facebook: [
      {
        id: "101",
        username: "FA34567",
        about: "Special offer for our customers!",
        type: "facebook",
        status: "sold",
        price: 1000,
        images: ["photo1.png", "photo2.png", "photo3.png", "photo4.png"],
        follower: 1000,
        age: 18,
        region: "usa",
        engagement: 1000,
      },
      // Add more Facebook posts...
    ],
    twitter: [
      {
        id: "201",
        username: "TW34567",
        about: "Special offer for our customers!",
        type: "twitter",
        status: "available",
        price: 1000,
        images: ["photo1.png", "photo2.png", "photo3.png", "photo4.png"],
        follower: 1000,
        age: 18,
        region: "usa",
        engagement: 1000,
      },
      // Add more tweets...
    ],
    whatsapp: [
      {
        id: "301",
        username: "WA34567",
        about: "Special offer for our customers!",
        type: "whatsapp",
        status: "sold",
        price: 1000,
        images: ["photo1.png", "photo2.png", "photo3.png", "photo4.png"],
        follower: 1000,
        age: 18,
        region: "usa",
        engagement: 1000,
      },
      // Add more WhatsApp messages...
    ]
  };

export const tabCounts = {
    instagram: 50,
    facebook: 26,
    twitter: 121,
    whatsapp: 21
};


  export const products = [
    {
      id: 1,
      sku: "12345",
      name: "Sneaker 1",
      size: "42",
      color: "Red",
      category: "Sneakers",
      price: "100",
      quantity: "10",
      status: "In Stock",
      images: ["photo1.png", "photo2.png", "photo3.png", "photo4.png"],
    },
  ];
  
  export const fetchProducts = () => products;
  
  export const addProduct = (newProduct) => {
    products.push({ id: products.length + 1, ...newProduct });
  };
  
  export const editProduct = (id, updatedProduct) => {
    const index = products.findIndex((product) => product.id === id);
    if (index !== -1) {
      products[index] = { id, ...updatedProduct };
    }
  };