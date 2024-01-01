import { WordState } from "./word.model"
import * as fromRoot from '../../state/app.state';
import * as wordActions from '../state/word.action';


const database: string[] = [
  'ability', 'ancient', 'culture', 'democracy', 'evidence',
  'freedom', 'government', 'heritage', 'intelligence', 'justice',
  'knowledge', 'liberty', 'mystery', 'nature', 'opportunity',
  'principle', 'quality', 'resource', 'strength', 'tradition',
  'inspiration', 'visionary', 'creativity', 'innovation', 'collaboration',
  'strategy', 'disruption', 'execution', 'transparency', 'agility',
  'expertise', 'integrity', 'adaptability', 'reliability', 'efficiency',
  'diversity', 'sustainability', 'growth', 'achievement', 'leadership',
  'commitment', 'passion', 'excellence', 'respect', 'courage',
  'trust', 'ambition', 'accountability', 'determination', 'empathy',
  'gratitude', 'humility', 'mindfulness', 'patience', 'persistence',
  'resilience', 'wisdom', 'balance', 'curiosity', 'reflection'
]
export interface AppState extends fromRoot.AppState {
  words: WordState
}

const initialState: WordState = {
  words: [
    ...database
  ]
}

export function wordReducer(state = initialState, action: wordActions.Action): WordState {
  switch (action.type) {
    case wordActions.WordActionTypes.LOAD_WORDS: {
      if (action.filter) {
        const filteredWords = database.filter(word => word.includes(action.filter))
        return {...state, words: filteredWords}
      }
      return {...state, words: database}
    }
    default:
      return { ...state, words: database }
  }
}
