const mongoose = require('mongoose');
const contentSchema = new mongoose.Schema({
	summary: String,
	about: String
});

const Content = mongoose.model('Content', contentSchema);

module.exports = Content;