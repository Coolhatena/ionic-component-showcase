import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-hour-picker-modal',
  standalone: true,
  imports: [IonicModule, CommonModule],
  templateUrl: './hour-picker-modal.component.html',
  styleUrls: ['./hour-picker-modal.component.scss'],
})
export class HourPickerModalComponent  implements OnInit {
	@Input() value: string = '';

	darkMode = false;
	hour: string = '';

	constructor(private modalCtrl: ModalController) {
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
		const dateTimeString = event.detail.value; // Ej: "2025-06-27T14:30:00.000Z"
		console.log(dateTimeString);
		if (dateTimeString && dateTimeString.length > 5 ) { // If theres no default value...
			const timePart = new Date(dateTimeString).toLocaleTimeString('es-ES', {
				hour: '2-digit',
				minute: '2-digit',
				hour12: false
			});
			this.hour = timePart;
		} else {
			this.hour = dateTimeString;
		}
	}

	submit() {
		console.log(this.hour);
		if (this.hour) {
			this.modalCtrl.dismiss({
			result: {
				dateChanged: true,
				hour: this.hour
			},
			});
		} else {
			this.modalCtrl.dismiss({ dateChanged: false, result: {} });
		}
	}
}
