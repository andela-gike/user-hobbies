import * as Hapi from '@hapi/hapi';
import Hobby from '../models/hobbyModel';
import User from '../models/userModel';

export class UserController {

    public async addNewUser(req: Hapi.Request) {
        const { name } = req.payload;
        try {
            const newUser = new User({ name });
            const result = await newUser.save();
            return result.toJSON();
        } catch (err) {
            console.log(err)
            return err;
        }
    }

    public async getUsers(req: Hapi.Request) {
        const { off, lim } = req.query;

        try {
            let offset = 0;
            let limit = 30;
            if (off && typeof off === 'string') {
                offset = parseInt(off);
            }
            if (lim && typeof lim === 'string') {
                limit = parseInt(lim);
            }
            const users = await User.find().skip(offset).limit(limit);
            return users.map((user) => user.toJSON())
        } catch (err) {
            return err
        }
    }

    public async getUserWithID(req: Hapi.Request) {
        const { userId } = req.params;
        try {
            const user: any = await User.findById(userId);
            return user.toJSON();
        } catch (err) {
            return err
        }

    }

    public async updateUser(req: Hapi.Request) {
        const { userId } = req.params;
        const { name } = req.payload;
        try {
            const user: any = await User.findById(userId);
            if (!name) {
                return user.toJSON();
              }

            if (name) {
                user.name = name;
            }
            return (await user.save()).toJSON();
        } catch (err) {
            return err;
        }
    }

    public async deleteUser(req: Hapi.Request) {
        const { userId } = req.params;
        try {
            const user = await User.findByIdAndDelete(userId);

            // Delete dependent hobbies of this User also
            const hobbies = await Hobby.find({ user: userId });
            hobbies.map((hobby) => Hobby.findByIdAndDelete(hobby.id));

            return 'Successfully deleted user!';
          } catch (err) {
            return err;
          }
    }

    public async getUserHobbies(req: Hapi.Request) {
        const { userId: user } = req.params;
        try {
            const hobbies = await Hobby.find({ user });
            return hobbies.map((h) => h.toJSON());
          } catch (err) {
            return err;
          }
    }

}
