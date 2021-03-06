/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { AppointmentService } from 'app/entities/AyoosAppointment/appointment/appointment.service';
import { IAppointment, Appointment } from 'app/shared/model/AyoosAppointment/appointment.model';

describe('Service Tests', () => {
  describe('Appointment Service', () => {
    let injector: TestBed;
    let service: AppointmentService;
    let httpMock: HttpTestingController;
    let elemDefault: IAppointment;
    let currentDate: moment.Moment;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      injector = getTestBed();
      service = injector.get(AppointmentService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new Appointment(0, 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', currentDate, 'AAAAAAA', 'AAAAAAA', 'AAAAAAA');
    });

    describe('Service methods', async () => {
      it('should find an element', async () => {
        const returnedFromService = Object.assign(
          {
            appointmentDateAndTime: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );
        service
          .find(123)
          .pipe(take(1))
          .subscribe(resp => expect(resp).toMatchObject({ body: elemDefault }));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(JSON.stringify(returnedFromService));
      });

      it('should create a Appointment', async () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            appointmentDateAndTime: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            appointmentDateAndTime: currentDate
          },
          returnedFromService
        );
        service
          .create(new Appointment(null))
          .pipe(take(1))
          .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(JSON.stringify(returnedFromService));
      });

      it('should update a Appointment', async () => {
        const returnedFromService = Object.assign(
          {
            trackingId: 'BBBBBB',
            appointmentId: 'BBBBBB',
            chronicDiseaseRef: 'BBBBBB',
            appointmentDateAndTime: currentDate.format(DATE_TIME_FORMAT),
            note: 'BBBBBB',
            patientId: 'BBBBBB',
            doctorId: 'BBBBBB'
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            appointmentDateAndTime: currentDate
          },
          returnedFromService
        );
        service
          .update(expected)
          .pipe(take(1))
          .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(JSON.stringify(returnedFromService));
      });

      it('should return a list of Appointment', async () => {
        const returnedFromService = Object.assign(
          {
            trackingId: 'BBBBBB',
            appointmentId: 'BBBBBB',
            chronicDiseaseRef: 'BBBBBB',
            appointmentDateAndTime: currentDate.format(DATE_TIME_FORMAT),
            note: 'BBBBBB',
            patientId: 'BBBBBB',
            doctorId: 'BBBBBB'
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            appointmentDateAndTime: currentDate
          },
          returnedFromService
        );
        service
          .query(expected)
          .pipe(
            take(1),
            map(resp => resp.body)
          )
          .subscribe(body => expect(body).toContainEqual(expected));
        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(JSON.stringify([returnedFromService]));
        httpMock.verify();
      });

      it('should delete a Appointment', async () => {
        const rxPromise = service.delete(123).subscribe(resp => expect(resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
