import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label, Color } from 'ng2-charts';
import { UserService } from '../core/services/';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartType: ChartType = 'bar';
  public barChartLegend = false;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[] = [];

  public barChartLabels: Label[] = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
  public pieChartData: ChartDataSets[] = [];
  public pieChartLabels: Label[] = [];
  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartColors: Color[] = [
    {
      borderColor: '#74788d',
      backgroundColor: '#5156be',
    },
  ];
  public pieChartLegend = true;
  public pieChartType: ChartType = 'pie';
  public pieChartPlugins = [];
  dashboardStats: any = {};
  monthWiseClients: any= [];
  constructor(
    private userService: UserService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
  }
  

}
