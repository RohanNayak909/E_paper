import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
// import { News7_CONSTANTS } from 'src/new7constants/new7constants';

const MasterAPI: string = environment.BASE_URL + '/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private HTTP: HttpClient) {

  }

  // socialUser!: SocialUser;
  isLoggedin = false;
  customerId = '';
  isLoggedInn!: Boolean


  // updateLoggedInState() {
  //   this.socialAuthService.authState.subscribe((user: any) => {
  //     this.socialUser = user;
  //     this.isLoggedin = (user != null);
  //   });
  // }

  getCurrentUser(): any {
    return JSON.parse(localStorage.getItem('currentUser') || "{}");
  }

  verifyUser(login:any) {
    return this.HTTP.post<any>(MasterAPI + `/login`, { ...login});
  }

  getAllUser() {
    // console.log(MasterAPI + `/get-users?emailuname=${email}&&status=${status}&&role=${role}&&lan=${lan}&&customerid=${customerId}`)
    return this.HTTP.get<any>(MasterAPI + `/get-all-user`);
  }

  // getCustomerId() {
  //   return this.HTTP.get<any>(MasterAPI + `/get-customer-id?customerName=${environment.CUSTUMER_NAME}`);
  // }



  

  // getSocialUser() {
  //   return this.socialUser;
  // }

  setLoginState(isLoggedIn:string, currentUser:string) {
    localStorage.setItem("isLoggedIn", isLoggedIn);
    localStorage.setItem('currentUser', currentUser);
  }

  logOut() {
    this.clearAuthStorage();
    this.logoutRest();
    // const homeURLs = ['/login'];
    // if (homeURLs.includes(window.location.pathname)) {
    //   window.location.reload();
    // }
  }

  clearAuthStorage() {
    localStorage.setItem('currentUser','');
    localStorage.setItem('isLoggedIn','');
    localStorage.clear();
  }

  logoutRest() {
    return this.HTTP.get<any>(MasterAPI + `/logout`);
  }







  // logOutSocialUser() {
  //   if (localStorage.getItem('loginMode') === ghme_CONSTANTS.LOGIN_MODE.google) {
  //     this.logOutFromGoogleAccount();
  //   }
  //   if (localStorage.getItem('loginMode') === ghme_CONSTANTS.LOGIN_MODE.facebook) {
  //     this.logOutFromFacebookAccount();
  //   }
  // }

  // loginWithGoogle(): Promise<any> {
  //   this.logOutSocialUser();
  //   return this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  // }

  // logOutFromGoogleAccount(): Promise<any> {
  //   return this.socialAuthService.signOut();
  // }

  // loginWithFacebook() {
  //   this.logOutSocialUser();
  //   return this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
  // }

  // logOutFromFacebookAccount() {
  //   return this.socialAuthService.signOut();
  // }

  forgotPassword(user: any) {
    return this.HTTP.post<any>(MasterAPI + `/forgot-password`, { ...user });
  }

  validateAuthToken(token: string) {
    return this.HTTP.post<any>(environment.BASE_URL + `/cognito/authourize`, { token });
  }

  userProfileWebhookConfig(newUser: any) {
    return this.HTTP.post<any>(newUser.url, { ...newUser });
  }


}
