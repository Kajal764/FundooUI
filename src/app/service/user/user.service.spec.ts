// import { TestBed } from '@angular/core/testing';
//
// import { UserService } from './user.service';
//
// xdescribe('UserService', () => {
//   let service: UserService;
//
//   beforeEach(() => {
//     TestBed.configureTestingModule({});
//     service = TestBed.inject(UserService);
//   });
//
//   it('should be created', () => {
//     expect(service).toBeTruthy();
//   });
// });

import {TestBed, async, inject} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {UserService} from './user.service';
import { MockBackend,} from '@angular/http/testing';
import {  BaseRequestOptions,  } from '@angular/http';

describe('UserService', () => {

  let userService: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        UserService,
        MockBackend,
        BaseRequestOptions,
      ],
    });

    userService = TestBed.get(UserService);
    httpMock = TestBed.get(HttpTestingController);
  });

});



