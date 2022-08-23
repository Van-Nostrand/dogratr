export interface IHistory {
  src: string;
  id: string;
  value: number;
}

export interface IRootStore {
  counter: {
    value: number;
  },
  rating: {
    history: IHistory[] | []
  }
}
