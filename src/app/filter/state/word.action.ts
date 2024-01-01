
export enum WordActionTypes {
  LOAD_WORDS = '[Word] Load Words'
}

export class LoadWords {
  readonly type=WordActionTypes.LOAD_WORDS
  constructor(public filter: string='') {}
}

export type Action = LoadWords
