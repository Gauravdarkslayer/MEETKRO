import { Component, OnInit } from '@angular/core';
import { JwtService } from '../../../core/services';

@Component({
  selector: 'app-leftbar',
  templateUrl: './leftbar.component.html',
  styleUrls: ['./leftbar.component.css']
})
export class LeftbarComponent implements OnInit {
  userData: any = {};

  constructor(
    private jwtService: JwtService
  ) { }

  ngOnInit(): void {
    this.loadScript('assets/js/app.js');
    this.userData = this.jwtService.getUserData();
  }

  public loadScript(url: string) {
    var ele = document.getElementById("steps");
    if (ele) {
      ele.remove();
    }
    const body = <HTMLDivElement>document.body;
    const script = document.createElement('script');
    script.innerHTML = '';
    script.src = url;
    script.async = false;
    script.defer = true;
    script.id = 'steps';
    body.appendChild(script);
  }

}
