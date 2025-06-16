import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface FooterConfig {
  companyLogo: string;
  companyName: string;
  companyDescription: string;
  socialLinks: { name: string; url: string; img: string }[];
  copyright: string;
}


@Injectable({
  providedIn: 'root'
})
export class FooterService {

  footerConfig = signal<FooterConfig | null>(null);

  constructor(private http: HttpClient) {
    this.http.get<FooterConfig>('config/footer-config.json')
    .subscribe(res => this.footerConfig.set(res));
  }

}
