import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface NavbarConfig {
  label: string;
  route: string;
  iconSvg: string
}


@Injectable({
  providedIn: 'root'
})
export class NavbarService {
  navbarConfig = signal<NavbarConfig[] | null>(null);

  constructor(private http: HttpClient) {
    this.http.get<NavbarConfig[]>('config/navbar-config.json')
    .subscribe(res => this.navbarConfig.set(res));
  }

}
