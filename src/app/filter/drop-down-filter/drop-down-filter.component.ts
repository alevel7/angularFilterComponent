import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { LoadWords } from '../state/word.action';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-drop-down-filter',
  templateUrl: './drop-down-filter.component.html',
  styleUrls: ['./drop-down-filter.component.scss']
})
export class DropDownFilterComponent implements OnInit {
  foundWords: string[] = [];
  searchValue: string = '';
  inputValue = new FormControl();

  constructor(private store: Store<any>) {

  }
  ngOnInit(): void {
    this.store.dispatch({ type: 'LOAD_WORDS' })
    this.store.subscribe((state) => {
      console.log(state)
      this.foundWords = state.words.words
    })
  }

  search(e?: any) {
    this.searchValue= e?.target?.value;
    this.store.dispatch(new LoadWords(this.searchValue))
  }
  setSelectedWord(word:string){
    this.inputValue.setValue(word)
  }
}
