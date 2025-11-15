import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class MasterService {
    private readonly getdepartment = `${environment.apiUrl}/Organization/get_OrganizationDepartment`;
    private readonly getdesignation = `${environment.apiUrl}/Organization/get_OrganizationDesignation`;
    private readonly viewuser = `${environment.apiUrl}/Common/get_MDForUser`;
    private readonly locationState = `${environment.apiUrl}/Location/get_LocationState`;
    private readonly locationCity = `${environment.apiUrl}/Location/get_LocationCity`;
    private readonly certificateMasterUrl = `${environment.apiUrl}/Certificate/get_MasCertificate`;
    private readonly putdepartment = `${environment.apiUrl}/Organization/put_OrganizationDepartment`;
    private readonly putdesignation = `${environment.apiUrl}/Organization/put_OrganizationDesignation`;
    private readonly putdepartmentedit = `${environment.apiUrl}/Organization/put_OrganizationDepartmentEdit`;
    private readonly putdesignationedit = `${environment.apiUrl}/Organization/put_OrganizationDesignationEdit`;


    constructor(private http: HttpClient) {}

    private getDefaultPayload(extra?: object) {
        return {
            messageInfo: {
                returnValue: 0,
                returnMessage: "string"
            },
            userDBConnStr: "string",
            m_PageNumber: 0,
            m_RowsPerPage: 0,
            ...(extra || {})
        };
    }

    getOrganizationDepartment(): Observable<any> {
        return this.http.post<any>(this.getdepartment, this.getDefaultPayload());
    }    

    getOrganizationDesignation(): Observable<any> {
        return this.http.post<any>(this.getdesignation, this.getDefaultPayload());
    }

    get_MDForUser(): Observable<any> {
        return this.http.post<any>(this.viewuser, this.getDefaultPayload()); 
    }

    get_LocationState(countryId: number): Observable<any> {
        return this.http.post<any>(
            this.locationState, 
            this.getDefaultPayload({ m_CountryID: countryId })
        );
    }

    get_LocationCity(countryId: number, stateId: number): Observable<any> {
        return this.http.post<any>(
            this.locationCity, 
            this.getDefaultPayload({ m_CountryID: countryId, m_StateID: stateId })
        );
    }
    
    getMasCertificate(): Observable<any> {
        return this.http.post<any>(
            this.certificateMasterUrl,
            this.getDefaultPayload()
        );
    }

    putOrganizationDepartment(payload: any): Observable<any> {
        return this.http.post<any>(this.putdepartment, payload);
    }

    putOrganizationDesignation(payload: any): Observable<any> {
        return this.http.post<any>(this.putdesignation, payload);
    }

    putOrganizationDepartmentEdit(payload: any): Observable<any> {
        return this.http.post<any>(this.putdepartmentedit, payload);
    }

    putOrganizationDesignationEdit(payload: any): Observable<any> {
        return this.http.post<any>(this.putdesignationedit, payload);
    }
}