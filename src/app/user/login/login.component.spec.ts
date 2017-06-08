import { LoginComponent } from './login.component';
import { Observable } from 'rxjs/Rx';

describe('LoginComponent', () => {
  let component: LoginComponent,
      mockRouter, mockStore, mockAuthSvc;

  beforeEach(() => {
    mockRouter = jasmine.createSpyObj('mockRouter', ['navigate']);
    mockRouter.navigate.and.returnValue(Observable.of(false));

    mockStore = jasmine.createSpyObj('mockStore', ['select', 'authenticateUser']);
    mockStore.authenticateUser.and.returnValue(Observable.of(false));

    mockAuthSvc = jasmine.createSpyObj('mockAuthSvc', ['authenticateUser', 'logOut']);
    mockAuthSvc.authenticateUser.and.returnValue(false);
    mockAuthSvc.logOut.and.returnValue(false);

    component = new LoginComponent(mockAuthSvc, mockStore, mockRouter);
  });

  it('should call authSvc.autheticatedUser when onChange gets called', () => {
    component.onChange(':data')
    expect(mockAuthSvc.authenticateUser).toHaveBeenCalledWith(':data');
  });

  it('when onCancel gets called, router navigate to :home', () => {
    component.onCancel();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['home']);
  });

  it('when onAuth gets called, router navigate to :movies', () => {
    component.onAuth();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['movies']);
  });
});
