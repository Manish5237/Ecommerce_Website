const express = require('express');
const env = require('dotenv'); 
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
 


// routes

const authRoutes = require('./routes/auth');  
const adminRoutes = require('./routes/admin/auth');
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');
const cartRoutes = require('./routes/cart');
const initialDataRoutes = require('./routes/admin/initialData');
const pageRoutes = require('./routes/admin/page');
const addressRoutes=require('./routes/address');


env.config();


mongoose.connect(
    "mongodb+srv://asdf:ghjk@cluster0.evunfmp.mongodb.net/ecommerce?retryWrites=true&w=majority",
{
    useNewUrlParser:true,
    useUnifiedTopology: true,
    //useCreateIndex : true
}
    ).then(() => {
        console.log(`Database connected`);
    });

app.use(cors());
app.use(express.json());
app.use('/public',express.static(path.join(__dirname, 'uploads')));
app.use('/api' , authRoutes);
app.use('/api' , adminRoutes);
app.use('/api' , categoryRoutes);
app.use('/api' , productRoutes);
app.use('/api' , cartRoutes);
app.use('/api' , initialDataRoutes);
app.use('/api' , pageRoutes);
app.use('/api',addressRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});


// admin CredentialsContainer
// {
//     "email" : "manishsalunkhe@gmail.com",
//     "password" : "manish@5237"
// }
// user CredentialsContainer
// {
//     "email" : "abc@gmail.com",
//     "password" : "123456"
// }