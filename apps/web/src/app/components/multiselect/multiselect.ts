import { afterRenderEffect, Component, computed, forwardRef, input, Input, signal, viewChild } from '@angular/core';
import { Listbox, Option } from '@angular/aria/listbox';
import { Combobox, ComboboxPopup, ComboboxWidget } from '@angular/aria/combobox';
import { OverlayModule } from '@angular/cdk/overlay';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  imports: [Combobox, ComboboxPopup, ComboboxWidget, Listbox, Option, OverlayModule],
  selector: 'app-multiselect',
  styleUrl: './multiselect.scss',
  templateUrl: './multiselect.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => Multiselect),
      multi: true
    }
  ]
})
export class Multiselect {
  readonly placeholder = input<string>('');
  /** The combobox listbox popup. */
  readonly listbox = viewChild(Listbox);
  /** The options available in the listbox. */
  readonly selectedValues = signal<string[]>([]);
  /** The string that is displayed in the combobox. */
  readonly displayValue = computed(() => {
    const values = this.selectedValues();
    if (values.length === 0) {
      return this.placeholder();
    }
    if (values.length === 1) {
      return values[0];
    }
    return `${values[0]} + ${values.length - 1} more`;
  });
  /** The labels that are available for selection. */
  readonly labels = [
    { value: 'Important', icon: 'label' },
    { value: 'Starred', icon: 'star' },
    { value: 'Work', icon: 'work' },
    { value: 'Personal', icon: 'person' },
    { value: 'To Do', icon: 'checklist' },
    { value: 'Later', icon: 'schedule' },
    { value: 'Read', icon: 'menu_book' },
    { value: 'Travel', icon: 'flight' },
  ];
  /** Whether the popup is expanded. */
  readonly popupExpanded = signal(false);
  constructor() {
    // Scrolls to the active item when the active option changes.
    afterRenderEffect(() => {
      this.listbox()?.scrollActiveItemIntoView();
    });
  }
}
