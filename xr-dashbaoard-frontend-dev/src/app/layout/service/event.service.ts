import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { EventModel } from '../../pages/events/eventmodel';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private readonly put_NewEventUrl = `${environment.apiUrl}/Event/put_NewEvent`;  
  private readonly get_AllEventUrl = `${environment.apiUrl}/Event/get_AllEvent`; 
  private events: EventModel[] = [  ];

  constructor(private http: HttpClient) {}

  getEvents(): Observable<EventModel[]> {
    return of(this.events);
  }

  get_AllEvent(): Observable<EventModel[]> {
    const payload = {
      messageInfo: {
        returnValue: 0,
        returnMessage: "string"
      },
      userDBConnStr: "string"
    };
    
    interface ApiEventResponse {
      ml_event?: Array<{
        id: number;
        name: string;
        eventCategory: string;
        description: string;
        eventDate: string;
        startTime: string;
        endTime: string;
        location?: string;
        organizer?: string;
        createdUserID?: number;
        createdDateTime?: string;
        updatedUserID?: number;
        updatedDateTime?: string;
        isActive?: boolean;
      }>;
      messageInfo?: any;
      userDBConnStr?: any;
    }
    
    return this.http.post<ApiEventResponse>(this.get_AllEventUrl, payload).pipe(
      map((response) => {
        if (!response.ml_event || !Array.isArray(response.ml_event)) {
          return [];
        }
        
        return response.ml_event.map((event) => {
          const startDateTime = event.eventDate 
            ? `${event.eventDate.split('T')[0]}T${event.startTime}`
            : null;
          const start = startDateTime ? new Date(startDateTime) : new Date();
 
          const endDateTime = event.eventDate && event.endTime
            ? `${event.eventDate.split('T')[0]}T${event.endTime}`
            : null;
          const end = endDateTime ? new Date(endDateTime) : undefined;
          
          return {
            id: event.id.toString(),
            title: event.name || '',
            start: start,
            end: end,
            description: event.description || '',
            category: event.eventCategory || ''
          } as EventModel;
        });
      })
    );
  }

  put_NewEvent(event: any, participants: any[] = []): Observable<any> {
      const body = {
          messageInfo: {
              returnValue: 0,
              returnMessage: "string"
          },
          userDBConnStr: "string",
          m_event: {
              id: event.id ?? 0,
              name: event.title ?? "",
              eventCategory: event.category ?? "",
              description: event.description ?? "",
              eventDate: event.eventDate ?? (event.start),
              startTime: event.startTime ?? "",
              endTime: event.endTime ?? "",
              location: event.location ?? "",
              organizer: event.organizer ?? "",
              createdUserID: event.createdUserID ?? 0,
              createdDateTime: event.createdDateTime ?? new Date().toISOString(),
              updatedUserID: event.updatedUserID ?? 0,
              updatedDateTime: event.updatedDateTime ?? new Date().toISOString(),
              isActive: event.isActive ?? true
          },
          ml_event_participant: (participants && participants.length > 0 ? participants : [
              {
                  id: 0,
                  eventID: 0,
                  userID: 0,
                  participantName: "",
                  email: "",
                  phone: "",
                  designation: "",
                  organization: "",
                  isAttended: true,
                  createdUserID: 0,
                  createdDateTime: new Date().toISOString(),
                  updatedUserID: 0,
                  updatedDateTime: new Date().toISOString(),
                  isActive: true
              }
          ])
      };
      return this.http.post<any>(this.put_NewEventUrl, body);
  }
}
