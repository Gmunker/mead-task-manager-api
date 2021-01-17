const mongoose = require('mongoose');

mongoose
  .connect(`mongodb://${process.env.MONGODB_URL}`, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(data => console.log('connected to the db'))
  .catch(err => console.log(err));
