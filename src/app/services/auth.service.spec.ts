import { TestBed } from "@angular/core/testing";
import { HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { TokenService } from './token.service';
import { Auth } from "../models/auth.model";
import { environment } from "./../../environments/environment";

describe('AuthService', () => {

  let authService: AuthService;
  let httpController: HttpTestingController;
  let tokenService: TokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthService,
        TokenService
      ]
    });

    authService = TestBed.inject(AuthService);
    tokenService = TestBed.inject(TokenService);
    httpController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpController.verify();
  });

  it('should be created', () => {
    expect(authService).toBeTruthy();
  });

  describe('Test for login', () => {
    it('should return a token', () => {
      const mokData: Auth = {
        access_token: 'token mock'
      }

      const email = 'token@mock.com';
      const password = 'mytoken**';

      authService.login(email,password)
      .subscribe( data => {
        expect(data).toEqual(mokData);
      });

      const url = `${environment.API_URL}/api/auth/login`;
      const req = httpController.expectOne(url);
      expect(req.request.method).toEqual('POST');
      req.flush(mokData);
    });

    it('should to call saveToken', () => {

      const mokData: Auth = {
        access_token: 'token mock'
      }

      spyOn(tokenService,'saveToken').and.callThrough();

      const email = 'token@mock.com';
      const password = 'mytoken**';

      authService.login(email,password)
      .subscribe( data => {
        expect(data).toEqual(mokData);
        expect(tokenService.saveToken).toHaveBeenCalled();
        expect(tokenService.saveToken).toHaveBeenCalledOnceWith('token mock');
      });

      const url = `${environment.API_URL}/api/auth/login`;
      const req = httpController.expectOne(url);
      expect(req.request.method).toEqual('POST');
      req.flush(mokData);
    });
  });



});












