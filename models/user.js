const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
	name: {type: String},
	description: {type: String},
	created_at: {type: Date, default: Date.now},
	updated_at: {type: Date, default: Date.now}
});

userSchema.pre('findByIdAndUpdate', (next) => {
	updated_at = Date.now;
	next();
});

userSchema.statics = {
	// getAll(cb){
	// 	return this.find({}, cb);
	// },
	//
	// get(id, cb){
	// 	return this.findById(id, cb);
	// },
	//
	// save(data, cb){
	// 	return this.create(data, cb);
	// },

	update(id, data, cb){
		return this.findByIdAndUpdate({ _id: id }, data, { new: true }, cb);
	},

	// delete(id, cb){
	// 	return this.findByIdAndRemove(id, cb);
	// }
};

module.exports = mongoose.model('User', userSchema);
