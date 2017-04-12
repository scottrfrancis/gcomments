// browser-sync start --server --directory --files "**/*"
(function() {
'use strict'


  angular.module('DocComments', [])
      // localhost
    // .constant('CLIENT_ID', "540312807168-vc7q1q8le7ln4s7ku9l8950d4dv6mebp.apps.googleusercontent.com")
    // .constant('DISCOVERY_DOCS', ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"])
    // .constant('SCOPES', 'https://www.googleapis.com/auth/drive')
    .controller('DocController', DocController)
    .controller('ActionItemController', ActionItemController)
    // .service('GapiService', GapiService)
    .service('FileCommentService', FileCommentService)


  // FileCommentService.$inject = ['$scope']
  FileCommentService.$inject = []
  function FileCommentService() {
    var checker = this

    var isSignedIn = false

    var fileList = []
    var actionList = []


    checker.getFileList = function() {
      return fileList
    }

    checker.getActionList = function() {
      return actionList
    }

    checker.getSignedIn = function() {
      return isSignedIn
    }

    checker.updateSigninStatus = function(status) {
      isSignedIn = status
    }
  }

  // GapiService.$inject = ['CLIENT_ID', 'DISCOVERY_DOCS', 'SCOPES']
  // function GapiService(clientId, discoveryDocs, scopes) {
  //   this.isInitialized = false
  //
  //   this.initGapi = function(postInit) {
  //     // var gapi = $rootScope.gapi
  //     if (Gapi !== undefined) {
  //       var client = Gapi.client
  //
  //       if (client !== undefined) {
  //         client.init({
  //           discoveryDocs: discoveryDocs,
  //           clientId: clientId,
  //           scope: scopes
  //         }).then(function () {
  //           this.isInitialized = true
  //
  //           // Listen for sign-in state changes.
  //          gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus)
  //
  //           // Handle the initial sign-in state.
  //          updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get())
  //          authorizeButton.onclick = handleAuthClick
  //          signoutButton.onclick = handleSignoutClick
  //
  //           postInit()
  //         })
  //       }
  //     }
  //   }
  //
  //   // this.initGapi()
  // }

  DocController.$inject = ['FileCommentService']
  function DocController(fileCommentService) {
    var docs = this
    docs.itemList = fileCommentService.getFileList()

    // var postInit = function() {
    //   // ... whatever...
    //   console.log('postInit')
    // }

    docs.getActions = function(i) {
      fileCommentService.getActionList(i)
    }
  }


  ActionItemController.$inject = ['FileCommentService']
  function ActionItemController(FileCommentService) {
    var actions = this
    actions.itemList = FileCommentService.getActionList()
  }
})()
