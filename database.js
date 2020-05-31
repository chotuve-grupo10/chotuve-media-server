const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mediaserverdb', {useUnifiedTopology: true, useNewUrlParser : true})
.then(db => console.log("DB connected"))
.catch(err => console.log(err));