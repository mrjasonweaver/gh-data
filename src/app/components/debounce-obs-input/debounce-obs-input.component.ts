import { Component, Input } from '@angular/core';
import { UiStateStore } from '../../store/ui-state';

@Component({
  selector: 'app-debounce-obs-input',
  templateUrl: './debounce-obs-input.component.html',
  styleUrls: ['./debounce-obs-input.component.css']
})
export class DebounceObsInputComponent {

  constructor(private uiStateStore: UiStateStore) { }

  @Input() inputLabel: string;
  @Input() searchTerm;

  onValueChange(e: KeyboardEvent) {
    return this.uiStateStore.onInputChange(e);
  }
}
