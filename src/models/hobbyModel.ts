import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const HobbySchema = new Schema({
    name: {
        required: true,
        type: String
    },
    passionLevel: {
        required: true,
        type: String
    },
    user: [{
        ref: 'User',
        type: Schema.Types.ObjectId
    }],
    year: {
        required: true,
        type: Number
    },
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } ,
  });

export default mongoose.model('Hobby', HobbySchema);
