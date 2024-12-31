const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const mailjet = require('node-mailjet').connect(process.env.MJ_APIKEY, process.env.MJ_SECRETKEY);
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const cors = require('cors');
const axios = require('axios');
const app = express();


// middleware
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 5000;

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.uamkr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', '*'],
    credentials: true
}));

// Temporarily bypass authorization
const verifyToken = (req, res, next) => {
    req.decoded = { email: 'pj944944@gmail.com', role: 'admin' };
    next();
};

const verifyAdmin = async (req, res, next) => {
    next();
};

// send email 
const sendEmail = (data) => {
    const { _id, senderAccount, statement, deposit, withdraw, date, balance, email } = data;
    const request = mailjet.post("send", {'version': 'v3.1'}).request({
        "Messages":[
            {
                "From": {
                    "Email": "pj944944@gmail.com",
                    "Name": "Social Store"
                },
                "To": [
                    {
                        "Email": email,
                        "Name": `Dear Customer ${email}`,
                    }
                ],
                "Subject": `Hello Dear, Your Account ${senderAccount} Have ${statement}`,
                "TextPart": `Your current Balance ${balance}`,
                "HTMLPart": `
                <div style="padding: 20px ;">
                    <h1 class="font-size: 30px ;">Online <span style="color: green;">Bank BD</span></h1>
                    <h2 style="color: green; margin:10px;">Hello Dare!</h2>
                    <p style="font-size: 20px; margin:10px;">Your ${statement} Transaction Completed in ${date}</p>
                    <p style="margin:10px;">That's Your Money Transaction Amount: <strong>${deposit || withdraw} $USD.</strong>. <span style="text-decornation: underline">${_id}</span></p>
                    <a href="http://localhost:3000/dashboard/statement" style="margin:10px 10px; padding: 5px 7px; border:2px solid green;border-radius: 7px; color: green; text-decoration: none; font-weight:600;">Go to More</a>
                    <button style="background-color:green; padding:10px 25px; outline:none; border:0px; border-radius: 7px; color: white; letter-spacing: 1px; cursor: pointer;">Subscribe Now</button>
                </div>
                `
            }
        ]
    });
    request.then((result) => {
        console.log(result.body);
    }).catch((err) => {
        console.error("Error sending email:", err);
    });
};

const sendWelcomeEmail = (email, displayName) => {
  const request = mailjet.post("send", { 'version': 'v3.1' }).request({
    "Messages": [
      {
        "From": {
          "Email": "pj944944@gmail.com",
          "Name": "Social Store"
        },
        "To": [
          {
            "Email": email,
            "Name": displayName
          }
        ],
        "Subject": "Welcome to Social Store",
        "TextPart": `Welcome to Social Store, ${displayName}. We are glad to have you with us.`,
        "HTMLPart": `
        <div style="padding: 20px;">
          <h1 style="font-size: 30px;">Welcome to <span style="color: green;">Online Bank BD</span></h1>
          <p style="font-size: 20px;">We are glad to have you with us, ${displayName}.</p>
        </div>
        `
      }
    ]
  });
  request.then((result) => {
    console.log(result.body);
  }).catch((err) => {
    console.error("Error sending email:", err);
  });
};

const sendSigninAlert = (email, displayName) => {
  if (!email || !displayName) {
    console.error("Invalid email or displayName");
    return;
  }
  const request = mailjet.post("send", { 'version': 'v3.1' }).request({
    "Messages": [
      {
        "From": {
          "Email": "pj944944@gmail.com",
          "Name": "Online Bank BD"
        },
        "To": [
          {
            "Email": email,
            "Name": displayName
          }
        ],
        "Subject": "Recent Signin Alert",
        "TextPart": `Hello ${displayName}, there was a recent signin to your account.`,
        "HTMLPart": `
        <div style="padding: 20px;">
          <h1 style="font-size: 30px;">Recent Signin Alert</h1>
          <p style="font-size: 20px;">Hello ${displayName}, there was a recent signin to your account.</p>
        </div>
        `
      }
    ]
  });
  request.then((result) => {
    console.log(result.body);
  }).catch((err) => {
    console.error("Error sending email:", err);
  });
};

const run = async () => {
    try {

        await client.connect();

        const usersCollection = client.db("SocialStore").collection("Users");
        const accountsCollection = client.db("SocialStore").collection("accounts");
        const statementCollection = client.db("SocialStore").collection("Transaction");
        const feedbackCollection = client.db("SocialStore").collection("Feedback");
        const smebankingCollection = client.db("SocialStore").collection("SmeSocial");
        const blogsCollection = client.db("SocialStore").collection("blogs");
        const profilesCollection = client.db("SocialStore").collection("Profiles");
        const contactCollection = client.db("SocialStore").collection("contact")
        const productsCollection = client.db("SocialStore").collection("products");
        const customersCollection = client.db("SocialStore").collection("customers");
        const notificationCollection = client.db("SocialStore").collection("notification")
        const messageCollection = client.db("SocialStore").collection("message")
        const helpCollection = client.db("SocialStore").collection("help")
        const salescollection = client.db("SocialStore").collection("sales")

        // Make pj944944@gmail.com an admin user
        const email = 'pj944944@gmail.com';
        const filter = { email: email };
        const options = { upsert: true };
        const updateDoc = {
            $set: { role: 'admin' }
        };
        await usersCollection.updateOne(filter, updateDoc, options);

        // Flutterwave payment endpoint
        app.post('/flutterwave-payment', async (req, res) => {
          const { amount, email, phone, name } = req.body;

          const paymentData = {
            tx_ref: `tx-${Date.now()}`,
            amount: amount,
            currency: 'USD',
            redirect_url: `${process.env.REACT_APP_CLIENT}/dashboard/deposit`,
            payment_options: 'card, mobilemoney, ussd',
            customer: {
              email: email,
              phonenumber: phone,
              name: name,
            },
            customizations: {
              title: 'Deposit Payment',
              description: 'Depositing into your account',
              logo: 'https://th.bing.com/th/id/OIP.uSR0Q4Mp3udYxX2_9c97vQHaEK?w=281&h=180&c=7&r=0&o=5&dpr=1.2&pid=1.7',
            },
          };

          try {
            const response = await axios.post('https://api.flutterwave.com/v3/payments', paymentData, {
              headers: {
                Authorization: `Bearer ${process.env.FLUTTERWAVE_SECRET_KEY}`,
                'Content-Type': 'application/json',
              },
            });

            res.json(response.data);
          } catch (error) {
            console.error('Error creating Flutterwave payment:', error);
            res.status(500).json({ error: 'Failed to create Flutterwave payment' });
          }
        });

        // post user by email
        app.put('/user/:email', async (req, res) => {
            const email = req.params.email;
            const user = req.body;
            const filter = { email: email };
            const options = { upsert: true };
            const updateDoc = {
                $set: user
            };
            const result = await usersCollection.updateOne(filter, updateDoc, options);
            const token = jwt.sign({ email: email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' });
            res.send({ result, accessToken: token });
        })


        // get users
        app.get('/users', async (req, res) => {
            const query = {};
            const cursor = usersCollection.find(query);
            const users = await cursor.toArray();
            res.send(users)
        })


        // delete an user
        app.delete('/user/:id', verifyToken, async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await usersCollection.deleteOne(query);
            res.send(result)
        })

        // post admin by email
        app.put('/user/admin/:email', verifyToken, async (req, res) => {
            const email = req.params.email;
            const filter = { email: email };
            const options = { upsert: true };
            const updateDoc = {
                $set: { role: 'admin' }
            };
            const result = await usersCollection.updateOne(filter, updateDoc, options);
            res.send(result);
        })

        //get admin api 
        app.get("/user/isAdmin/:email", async (req, res) => {
            const email = req.params.email;
            const query = { email: email }
            const adminUser = await usersCollection.findOne(query);
            const isAdmin = adminUser.role === "admin"
            res.send({ role: isAdmin })
        })


        // remove admin by email
        app.put('/user/admin/remove/:email', verifyToken, async (req, res) => {
            const email = req.params.email;
            const filter = { email: email };
            const options = { upsert: true };
            const updateDoc = {
                $set: { role: '' }
            };
            const result = await usersCollection.updateOne(filter, updateDoc, options);
            res.send(result);
        })

        // get admin
        app.get('/user/admin/:email', async (req, res) => {
            const email = req.params.email;
            const user = await usersCollection.findOne({ email: email });
            const isAdmin = user?.role === 'admin';
            res.send({ admin: isAdmin });
        })

        //  post blogs api data
        app.post("/blog", async (req, res) => {
            const blog = req.body;
            const blogPost = await blogsCollection.insertOne(blog);
            res.send(blogPost)
        })

        // get blogs data api 
        app.get("/blogs", async (req, res) => {
            const query = {}
            const blogs = await blogsCollection.find(query).toArray();
            res.send(blogs)
        })

        // get blog api data 
        app.get("/blog/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const blog = await blogsCollection.findOne(query);
            res.send(blog)
        })

        // update blog API        
        app.put("/blog/:id", async (req, res) => {
            const id = req.params.id;
            const blog = req.body;
            const filter = { _id: ObjectId(id) };
            const options = { upsert: true };
            const updateDoc = {
                $set: {
                    title: blog.title,
                    category: blog.category,
                    description: blog.description,
                    picture: blog.picture,
                    date: blog.date
                }
            };
            const result = await blogsCollection.updateOne(filter, updateDoc, options);
            res.send(result);
        });

        // Statement
        app.post('/statement', async (req, res) => {
            const transaction = req.body;
            const result = await statementCollection.insertOne(transaction);
            sendEmail(transaction);
            res.send(result);
        })


        // feedback post **
        app.post('/feedback', async (req, res) => {
            const feedback = req.body;
            const result = await feedbackCollection.insertOne(feedback);
            res.send(result);
        })

        // feedback get **
        app.get('/feedbacks', async (req, res) => {
            const query = {};
            const cursor = feedbackCollection.find(query);
            const feedback = await cursor.toArray();
            res.send(feedback)
        })

        // feedback get by email**
        app.get('/feedbacks/:email', async (req, res) => {
            const email = req.params.email;
            const query = { email: email };
            const cursor = feedbackCollection.find(query);
            const feedback = await cursor.toArray();
            res.send(feedback)
        })

        // Delete api feedback **
        app.delete('/feedback/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await feedbackCollection.deleteOne(query);
            res.send(result);

        })

        // blog delete API 
        app.delete("/blog/:id", async (req, res) => {
            const id = req.params.id
            const query = { _id: ObjectId(id) }
            const deleteBlog = await blogsCollection.deleteOne(query)
            res.send(deleteBlog)
        })


        app.patch("/blog/comment/:id", async (req, res) => {
            const id = req.params.id;
            const filter = { _id: ObjectId(id) }
            const comment = req.body;
            const updateDoc = {
                $set: {
                    comment: comment
                }
            }
            const result = await blogsCollection.updateOne(filter, updateDoc)
            res.send(result)
        })

        // Edit api Feedback **
        app.patch('/feedback/:id', async (req, res) => {
            const id = req.params.id;
            const feedback = req.body;
            const filter = { _id: ObjectId(id) };
            const options = { upsert: true };
            const updateDoc = {
                $set: feedback
            }
            const result = await feedbackCollection.updateOne(filter, updateDoc, options);
            res.send(result)
        })

        //Sme Banking loan details
        app.get('/smebanking', async (req, res) => {
            const query = {};
            const cursor = smebankingCollection.find(query);
            const result = await cursor.toArray();
            res.send(result)
        })

        app.get('/smebanking/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await smebankingCollection.findOne(query);
            res.send(result);
        })

        // post profile by email
        app.put('/profile/:email', verifyToken, async (req, res) => {
            const email = req.params.email;
            const profile = req.body;
            const filter = { email: email };
            const options = { upsert: true };
            const updatedDoc = {
                $set: profile,
            };
            const result = await profilesCollection.updateOne(filter, updatedDoc, options);
            res.send(result);
        })

        // profile image upload
        app.put('/profile/image/:email', verifyToken, async (req, res) => {
            const email = req.params.email;
            const image = req.body.url;
            const filter = { email: email };
            const options = { upsert: true }
            const updatedDoc = {
                $set: {
                    image: image,
                    email: email
                }
            };
            const result = await profilesCollection.updateOne(filter, updatedDoc, options);
            res.send(result);
        })


        // get profile by email
        app.get('/profile/:email', async (req, res) => {
            const email = req.params.email;
            const query = { email: email }
            const profile = await profilesCollection.findOne(query);
            res.send(profile);
        })


        // Contact us emails
        app.post('/contact', async (req, res) => {
            const contact = req.body;
            const result = await contactCollection.insertOne(contact);
            res.send(result);
        })

        // contact get api
        app.get('/contacts', async (req, res) => {
            const query = {};
            const cursor = contactCollection.find(query);
            const feedback = await cursor.toArray();
            res.send(feedback)
        })

        // notice Put API
        app.post("/notification", async (req, res) => {
            const notice = req.body;
            const newNotice = await notificationCollection.insertOne(notice);
            res.send(newNotice);
        })
        // all notice get API
        app.get("/allNotification", async (req, res) => {
            const query = {}
            const allNotice = await notificationCollection.find(query).toArray()
            res.send(allNotice);
        })
        // user read api patch
        app.patch("/notification/read/:id", async (req, res) => {
            const id = req.params.id
            const readUsers = req.body;
            const filter = { _id: ObjectId(id) }
            const updateDoc = {
                $set: {
                    readUsers: readUsers
                }
            }
            const result = await notificationCollection.updateOne(filter, updateDoc);
            res.send(result)
        })

        app.post('/send-welcome-email', (req, res) => {
          const { email, displayName } = req.body;
          sendWelcomeEmail(email, displayName);
          res.send({ success: true });
        });

        app.post('/send-signin-alert', (req, res) => {
          const { email, displayName } = req.body;
          sendSigninAlert(email, displayName);
          res.send({ success: true });
        });

        app.get('/generate-admin-token', async (req, res) => {
            const email = 'admin@bank.com'; // Replace with the actual admin email
            const token = jwt.sign({ email: email, role: 'admin' }, process.env.ACCESS_TOKEN_SECRET);
            res.send({ token });
        });

    }

    finally {
        app.get('/', (req, res) => {
            res.send("Running React Bank of BD Server");
        });
        app.listen(port, () => {
            console.log("Listen to Port", port);
        });

    }
}

run().catch(console.dir);


