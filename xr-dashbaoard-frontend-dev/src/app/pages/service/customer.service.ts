import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Country {
    name?: string;
    code?: string;
}

export interface Representative {
    name?: string;
    image?: string;
}

export interface Customer {
    id?: number;
    name?: string;
    country?: Country;
    company?: string;
    date?: string;
    status?: string;
    activity?: number;
    representative?: Representative;
}

@Injectable()
export class CustomerService {
    getData() {
        return [
            {
                id: 1,
                login_id: 'EMNRBO00001',
                login_id1: 'TRNRBO00001',
                login_id2: 'ADMRBO00001',
                type:'Contractor',
                designation:'GST Auditor',
                department:'Accounts',
                first_name: 'Madhu',
                last_name:'D G',
                state:'Karnataka',
                city:'Bangalore',
                preferred_language:'English',
                country: {
                    name: 'Algeria',
                    code: 'dz'
                },
                company: 'Benton, John B Jr',
                date: '2015-09-13',
                status: 'unqualified',
                verified: true,
                activity: 17,
                representative: {
                    name: 'Ioni Bowcher',
                    image: 'ionibowcher.png'
                },
                balance: 70663
            },
            {
                id: 2,
                login_id: 'EMNRBO00002',
                login_id1: 'TRNRBO00002',
                login_id2: 'ADMRBO00002',
                type:'Payroll',
                designation:'Network Engineer',
                department:'IT Department',
                first_name: 'Nandan',
                last_name:'Gowda',
                state:'Karnataka',
                city:'Bangalore',
                preferred_language:'English',
                country: {
                    name: 'Egypt',
                    code: 'eg'
                },
                company: 'Chanay, Jeffrey A Esq',
                date: '2019-02-09',
                status: 'negotiation',
                verified: true,
                activity: 0,
                representative: {
                    name: 'Amy Elsner',
                    image: 'amyelsner.png'
                },
                balance: 82429
            },
            {
                id: 3,
                login_id: 'EMNRBO00003',
                login_id1: 'TRNRBO00003',
                login_id2: 'ADMRBO00003',
                type:'Contractor',
                designation:'Serior HR Executive',
                department:'Human Resource',
                first_name: 'Arun',
                last_name:'Kumar',
                state:'Karnataka',
                city:'Bangalore',
                preferred_language:'English',
                country: {
                    name: 'Panama',
                    code: 'pa'
                },
                company: 'Chemel, James L Cpa',
                date: '2017-05-13',
                status: 'qualified',
                verified: false,
                activity: 63,
                representative: {
                    name: 'Asiya Javayant',
                    image: 'asiyajavayant.png'
                },
                balance: 28334
            },
            {
                id: 4,
                login_id: 'EMNRBO00004',
                login_id1: 'TRNRBO00004',
                login_id2: 'ADMRBO00004',
                type:'Payroll',
                designation:'Senior Sales Director',
                department:'Field Sales',
                first_name: 'Harshith',
                last_name:'Gowda',
                state:'Karnataka',
                city:'Bangalore',
                preferred_language:'English',
                country: {
                    name: 'Slovenia',
                    code: 'si'
                },
                company: 'Feltz Printing Service',
                date: '2020-09-15',
                status: 'new',
                verified: false,
                activity: 37,
                representative: {
                    name: 'Xuxue Feng',
                    image: 'xuxuefeng.png'
                },
                balance: 88521
            }
        ];
    }

    constructor(private http: HttpClient) {}

    getCustomersMini() {
        return Promise.resolve(this.getData().slice(0, 5));
    }

    getCustomersSmall() {
        return Promise.resolve(this.getData().slice(0, 10));
    }

    getCustomersMedium() {
        return Promise.resolve(this.getData().slice(0, 50));
    }

    getCustomersLarge() {
        return Promise.resolve(this.getData().slice(0, 200));
    }

    getCustomersXLarge() {
        return Promise.resolve(this.getData());
    }

    getCustomers(params?: any) {
        return this.http
            .get<any>('https://www.primefaces.org/data/customers', {
                params: params
            })
            .toPromise();
    }
}
