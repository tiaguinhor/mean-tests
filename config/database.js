const mongoose = require('mongoose');

module.exports = mongoose.connect('mongodb+srv://tiago:tiago@test-loomr.mongodb.net/test?retryWrites=true', { useNewUrlParser: true }, (err) => {
  if (!err) { console.log('MongoDB is running...'); } else { console.log(err); }
});
