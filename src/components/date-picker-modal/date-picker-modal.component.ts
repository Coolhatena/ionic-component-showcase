import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-date-picker-modal',
  standalone: true,
  imports: [IonicModule, CommonModule],
  templateUrl: './date-picker-modal.component.html',
  styleUrls: ['./date-picker-modal.component.scss'],
})
export class DatePickerModalComponent implements OnInit {
  @Input() value: string = '';

  darkMode = false;
  displayFormat: string = '';
  dbFormat: string = '';
  maxDate: string = '';
  minDate: string = '';

  constructor(private modalCtrl: ModalController) {
    const today = new Date();
    const max = new Date();
    max.setFullYear(today.getFullYear() + 3);

    this.minDate = today.toISOString().split('T')[0]; // YYYY-MM-DD
    this.maxDate = max.toISOString().split('T')[0];
  }

  ngOnInit(): void {
    this.checkAppMode();
    console.log(this.value);
  }

  async checkAppMode() {
    const checkIsDarkMode = localStorage.getItem('darkModeActivated');
    checkIsDarkMode == 'true'
      ? (this.darkMode = true)
      : (this.darkMode = false);
    document.body.classList.toggle('dark', this.darkMode);
  }

  changeDate(event: any) {
    const dateTimeString = event.detail.value;
    if (dateTimeString) {
      const dateString = dateTimeString.split('T')[0];
      const [year, month, day] = dateString.split('-');
      this.displayFormat = `${day}/${month}/${year}`;
      this.dbFormat = `${year}-${month}-${day}`;
    }
  }

  submit() {
    console.log(this.displayFormat && this.dbFormat);
    if (this.displayFormat && this.dbFormat) {
      this.modalCtrl.dismiss({
        result: {
          dateChanged: true,
          display: this.displayFormat,
          db: this.dbFormat,
        },
      });
    } else {
      this.modalCtrl.dismiss({ dateChanged: false, result: {} });
    }
  }
}
