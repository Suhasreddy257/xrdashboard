import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConfigService } from '..//service/config.service'; // adjust path if needed

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private http: HttpClient, private config: ConfigService) {}

  login(email: string, password: string): Observable<any> {
    const url = `${this.config.apiUrl}/Auth/login`;

    const payload = {
      messageInfo: {
        returnValue: 0,
        returnMessage: 'string'
      },
      userDBConnStr: 'string',
      m_UserName: email,
      m_Password: password,
      m_EncryptionType: 0
    };

    return this.http.post<any>(url, payload);
  }
}
