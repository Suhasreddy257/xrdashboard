import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ConfigService {
  private readonly config = (window as any)['appConfig'];

  get apiUrl(): string {
    if (!this.config?.apiUrl) {
      console.warn('ConfigService: apiUrl is undefined');
    }
    return this.config?.apiUrl;
  }
  get baseContentUrl(): string {
    if (!this.config?.baseContentUrl) {
      console.warn('ConfigService: baseContentUrl is undefined');
    }
    return this.config?.baseContentUrl;
  }
}
