const mongoose = require('mongoose');
const USERNAME = process.env.USERNAME_MONGODB;
const PASSWORD = process.env.PASSWORD_MONGODB;
const CLUSTER = process.env.CLUSTER_MONGODB;
const DATABASE = process.env.DATABASE_MONGODB;
const uri = `mongodb+srv://${USERNAME}:${PASSWORD}@${CLUSTER}/${DATABASE}?retryWrites=true&w=majority`;
const options = {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true,
};
try {
    mongoose.connect(uri, options)
    .then(() => {
      console.log('Successful connection MongoDB');
    })
    .catch((err) => {
      console.log('Unsuccessful connection MongoDB', err);
    });
}catch(error){
    console.log("ERRORRRRR",error)
}


module.exports = mongoose;