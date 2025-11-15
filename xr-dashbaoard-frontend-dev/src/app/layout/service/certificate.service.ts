import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class CertificateService {
    private certificate = `${environment.apiUrl}/Certificate/get_AllCertificate`; 

    constructor(private http: HttpClient) {}  

    get_AllCertificate(): Observable<any> {
        const payload = {
            messageInfo: {
                returnValue: 0,
                returnMessage: "string"
            },
            userDBConnStr: "string"
        };
        return this.http.post<any>(this.certificate, payload);
    }

    put_NewCertificate(certificateData: any): Observable<any> {
        const url = `${environment.apiUrl}/Certificate/put_NewCertificate`;
        const payload = {
            messageInfo: {
                returnValue: 0,
                returnMessage: "string"
            },
            userDBConnStr: "string",
            m_certificate: certificateData
        };
        return this.http.post<any>(url, payload);
    }
}