import { IPupperState } from '@/store/pupper/pupperSlice'

export interface IHistory {
  src: string;
  id: string;
  value: number;
}

export interface IAuthState {
  username: string
  token: string
  email: string
  isLoggedIn: boolean
  checkingToken: boolean
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
