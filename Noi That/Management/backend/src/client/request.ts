import { Request as ExpressRequest} from 'express';
import { UserDTO } from '../service/dtos/user.dto';

export interface Request extends ExpressRequest {
  user?: UserDTO;
}
