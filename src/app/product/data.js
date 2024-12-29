export const socialData = {
    instagram: [
      {
        id: "001",
        postId: "IG12345",
        content: "Summer vibes! #lifestyle",
        engagement: 1234,
        date: "2024-04-17T20:25:00",
        status: "Sent",
        type: "Broadcast",
        price: "100",
        quantity: "10",
        follower: "1000",
        age: "18",
        region: "usa",
        images: ["photo1.png", "photo2.png", "photo3.png", "photo4.png"],
      },
      {
        id: "002",
        postId: "IG12346",
        content: "New collection drop! #fashion",
        engagement: 2345,
        date: "2024-04-17T20:25:00",
        status: "Sent",
        type: "Broadcast",
        price: "100",
        quantity: "10",
        images: ["photo1.png", "photo2.png", "photo3.png", "photo4.png"],
        follower: "1000",
        age: "18",
        region: "usa",
      },
      // Add more Instagram posts...
    ],
    facebook: [
      {
        id: "101",
        postId: "FB45678",
        content: "Check out our latest updates!",
        reactions: 567,
        date: "2024-04-17T20:25:00",
        status: "Sent",
        type: "Broadcast",
        price: "100",
        quantity: "10",
        images: ["photo1.png", "photo2.png", "photo3.png", "photo4.png"],
        follower: "1000",
        age: "18",
        region: "usa",
      },
      // Add more Facebook posts...
    ],
    twitter: [
      {
        id: "201",
        tweetId: "TW89012",
        content: "What's happening? Reply with your thoughts!",
        retweets: 89,
        date: "2024-04-17T20:25:00",
        status: "Active",
        type: "Broadcast",
        price: "100",
        quantity: "10",
        images: ["photo1.png", "photo2.png", "photo3.png", "photo4.png"],
        follower: "1000",
        age: "18",
        region: "usa",
      },
      // Add more tweets...
    ],
    whatsapp: [
      {
        id: "301",
        messageId: "WA34567",
        content: "Special offer for our customers!",
        recipients: 150,
        date: "2024-04-17T20:25:00",
        status: "Sent",
        type: "Broadcast",
        price: "100",
        quantity: "10",
        images: ["photo1.png", "photo2.png", "photo3.png", "photo4.png"],
        follower: "1000",
        age: "18",
        region: "usa",
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