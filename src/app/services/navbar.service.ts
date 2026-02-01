import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { first } from 'rxjs';

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
    .pipe(first())
    .subscribe(res => this.navbarConfig.set(res));
  }

}
