import { Component } from '@angular/core';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent {

  isRightNavbarVisible: boolean = false;

  toggleRightNavbar()
   {
    this.isRightNavbarVisible = !this.isRightNavbarVisible;
  
  if (this.isRightNavbarVisible) {
    document.body.classList.add('no-scroll');
  } else {
    document.body.classList.remove('no-scroll');
  }
}
}
