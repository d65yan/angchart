/*
  Interceptor Service that checks for authorization errors an emits events or updates User service token if needed.
*/


.factory('authInterceptor',['$q','User','$rootScope',function ($q,User,$rootScope) {
  return {
    request: function (config) {
      config.headers = config.headers || {};
       config.headers.TOKEN = User.getToken();
       return config;
    },
    response: function (response) {
        if(response.data.returning)
            var i=0;
        if(response.headers('HEADER'))
            User.setToken(response.headers('X-CREDENTIALS'))
      if (response.status === 401) {
        $rootScope.$broadcast('reauthenticate')
      }
      return response || $q.when(response);
    },
    responseError: function(rejection) {
      
     if(rejection.headers('XHEADER'))
            User.setToken(rejection.headers('HEADER'))
      if (rejection.status === 401) {
        $rootScope.$broadcast('reauthenticate')
      }
      else if(rejection.config.url.match(/api\//) && rejection.status){
         /*debugging*/ $rootScope.$broadcast('toast','request failed:'+JSON.stringify(rejection.data),60000,'error');
      }
      return $q.reject(rejection);
    }
  };
}] )