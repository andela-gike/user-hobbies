import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const UserSchema = new Schema({
    name: {
        required: true,
        type: String
    }
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } ,
  });

export default mongoose.model('User', UserSchema);