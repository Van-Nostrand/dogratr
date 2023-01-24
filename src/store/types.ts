import { IPupperState } from '@/store/pupper/pupperSlice'

export interface IHistory {
  src: string;
  pupID: string;
  value: number;
  created: string
}

export interface IAuthState {
  username: string
  token: string
  email: string
  // isLoggedIn: boolean
  checkingToken: boolean
  verifiedLogin: boolean
}

export interface IRootStore {
  counter: {
    value: number;
  },
  rating: {
    history: IHistory[] | []
  },
  pupper: IPupperState
  auth: IAuthState
}
