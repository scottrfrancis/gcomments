(function() {
"use strict"

angular.module('FilesApp')
  .service('GdriveService', GdriveService)

// GdriveService.$inject = ['$scope']
function GdriveService() {
  var gd = this
  gd.initialized = false
  gd.gapi = null

  gd.files = []

  gd.loadGapi = function(gapi) {
    gd.gapi = gapi
  }

  gd.isGapiLoaded = function(apiName) {
    var loaded = false
    apiName = apiName || 'auth2'

    if (gd.gapi && gd.gapi.hasOwnProperty(apiName)) {
      loaded = true
    }

    return loaded
  }

  gd.signIn = function() {
    if (gd.isGapiLoaded())
      gd.gapi.auth2.getAuthInstance().signIn()
  }

  gd.signOut = function() {
    if (gd.isGapiLoaded())
      gd.gapi.auth2.getAuthInstance().signOut()
  }

  gd.isSignedIn = function() {
    var signedIn = false
    if (gd.isGapiLoaded()) {
      signedIn = gd.gapi.auth2.getAuthInstance().isSignedIn.get()
    }

    return signedIn
  }

  // gc.getGapi = function() {
  //   return gapiLib
  // }

  gd.findFiles = function() {
    gd.files = []

    if (gd.isGapiLoaded() && gd.isSignedIn() ) {
        return gd.gapi.client.drive.files.list({
          'pageSize': 10,
          'fields': "*"
        }).then(function(response) {
          response.result.files.map((f) => {
            gd.files.push(f)
          })
        })
    }
  }

  gd.getFiles = function() {
    return gd.files
  }
}

})()
