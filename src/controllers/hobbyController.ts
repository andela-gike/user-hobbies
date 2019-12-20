import * as Hapi from '@hapi/hapi';
import Hobby from '../models/hobbyModel';

interface RequestHobbyPayload extends Hapi.Request {
  payload: {
    name: string;
    passionLevel: number;
    year: number;
    userId: string;
  },
  params: {
    id: string;
  }
}

export class HobbyController {
  public async addNewHobby(req: RequestHobbyPayload) {
    const {
      name, passionLevel, year, userId: user,
    } = req.payload;
    try {
      const hobby = new Hobby({
        name, passionLevel, user, year,
      });
      const newHobby = await hobby.save();
      return newHobby.toJSON();
    } catch (err) {
      return err;
    }
  }

  public async getHobby(req: RequestHobbyPayload) {
    const { id } = req.params;
    try {
      const isPresent = await Hobby.exists({ _id: id });
      let hobby: any;
      if (isPresent === true) {
        hobby = await Hobby.findById(id).populate('user');
        return hobby.toJSON();
      }
      return JSON.stringify({ message: 'Hobby does not exist' });
    } catch (err) {
      return err;
    }
  }

  public async updateHobby(req: RequestHobbyPayload) {
    const { id } = req.params;
    const { name, passionLevel, year } = req.payload;
    try {
      const hobby: any = await Hobby.findById(id);
      hobby.name = name || hobby.name;
      hobby.passionLevel = passionLevel || hobby.passionLevel;
      hobby.year = year || hobby.year;

      return (await hobby.save()).toJSON();
    } catch (err) {
      return err;
    }
  }

  public async deleteHobby(req: RequestHobbyPayload) {
    const { id } = req.params;
    try {
      const hobby = await Hobby.findByIdAndDelete(id);
      return JSON.stringify({ message: 'Hobby is Successfully deleted' });
    } catch (err) {
      return err;
    }
  }
}
