import { Directive, HostBinding, HostListener, Input, EventEmitter, Output } from '@angular/core';

@Directive({
  selector: '[appDrag]'
})
export class DragDirective {

  @HostBinding('draggable') public draggable = true;
  @HostBinding('class.over') public isIn = false;
  @Input('itemIndex') public itemIndex;
  @Input('listIndex') public listIndex;
  @Output() public switch: EventEmitter<{
    src: {
      itemIndex: number,
      listIndex: number
    },
    dst: {
      itemIndex: number,
      listIndex: number
    }
  }> = new EventEmitter();

  @HostListener('dragstart', ['$event']) dragStart(event) {
    event.dataTransfer.setData('itemIndex', this.itemIndex);
    event.dataTransfer.setData('listIndex', this.listIndex);
  }

  @HostListener('dragenter') dragEnter() {
    this.isIn = true;
  }

  @HostListener('dragleave') dragLeave() {
    this.isIn = false;
  }

  @HostListener('dragover', ['$event']) dragOver(event) {
    event.preventDefault();
  }

  @HostListener('drop', ['$event']) drop(event) {
    this.isIn = false;
    this.switch.emit({
      src: {
        itemIndex: event.dataTransfer.getData('itemIndex'),
        listIndex: event.dataTransfer.getData('listIndex')
      },
      dst: {
        itemIndex: this.itemIndex,
        listIndex: this.listIndex
      }
    });
  }

}