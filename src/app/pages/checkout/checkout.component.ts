import { Component, OnInit } from '@angular/core';
import { faMapMarkerAlt , faDollarSign , faCreditCard, faMoneyBillWave, faLandmark , faTrashAlt } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  faMapMarkerAlt = faMapMarkerAlt;
  faDollarSign = faDollarSign;

  faCreditCard = faCreditCard;
  faLandmark = faLandmark;
  faMoneyBillWave = faMoneyBillWave;

  faTrashAlt = faTrashAlt;

  constructor() {}

  ngOnInit(): void {}
}
