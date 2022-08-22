export interface IHistory {
  src: string;
  id: string;
}

export interface IRootStore {
  counter: {
    value: number;
  },
  rating: {
    history: IHistory[] | []
  }
}
