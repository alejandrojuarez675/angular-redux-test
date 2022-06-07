import { HttpErrorResponse } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { LoginRequest } from 'src/app/shared/models/auth.models';
import { LOGIN_RESPONSE, PROFILE_RESPONSE } from '../mocks/auth-response.mock';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let httpClientSpy: { post: jasmine.Spy; get: jasmine.Spy };

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['post', 'get']);
    service = new AuthService(httpClientSpy as any);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should login', (done: DoneFn) => {
    const mockUserCredentials: LoginRequest = {
      user: 'leifer33@gmail.com',
      password: '123456',
    };

    httpClientSpy.post.and.returnValue(of(LOGIN_RESPONSE));

    const { user, password } = mockUserCredentials;

    service.login(user, password).subscribe((res) => {
      expect(res).toEqual(LOGIN_RESPONSE);
      done();
    });
  });

  it('should return profile', (done: DoneFn) => {
    httpClientSpy.get.and.returnValue(of(PROFILE_RESPONSE));

    service.getProfile('asdf1234').subscribe((res) => {
      expect(res).toEqual(PROFILE_RESPONSE);
      done();
    });
  });

  it('should check token', (done: DoneFn) => {
    httpClientSpy.get.and.returnValue(of(PROFILE_RESPONSE));

    service.checkToken('asdf1234').subscribe((res) => {
      expect(res).toBeTruthy();
      done();
    });
  });

  it('should check expired token', (done: DoneFn) => {
    const error = new HttpErrorResponse({
      error: 'Expired token',
      status: 401,
      statusText: 'Expired token',
    });

    httpClientSpy.get.and.returnValue(throwError(() => error));

    service.checkToken('asdf1234').subscribe((res) => {
      expect(res).toBeFalsy();
      done();
    });
  });
});
