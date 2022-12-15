// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  POST_URL: 'http://localhost:4200/post/',
  BASE_URL: 'http://192.168.0.104:8072/prameya/api',
  // BASE_URL: 'https://api-dev.prameyanews.com/prameya/api',
  CUSTOMER_ID : 3,
  CUSTOMER_NAME :'E-PAPER',
  PLATFORM_BASEURL: 'https://dev.prameyanews.com/',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
