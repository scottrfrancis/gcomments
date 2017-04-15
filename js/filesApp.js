(function() {
'use strict'

angular.module('FilesApp', ['googleSignin'])
  .controller('GapiController', GapiController)
  // .service('CommentsService', CommentsService)
  // .controller('CommCtrl', CommCtrl)



GapiController.$inject = ['$scope']
function GapiController($scope) {
    var gc = this

    var initialized = false
    var signedIn = false
    // var email = ""
    var gapiLib = null

    var docList = {}
    var commentList = {}

    $scope.$on('event:google-signin-success', function(event) {
      console.log('signin success')
      signedIn = true
      // email = authResult.w3.U3

      gc.getDocumentList()
      $scope.$apply()
    })

    $scope.$on('event:google-signin-failure', function(event) {
      console.log('signin failure')
      signedIn = false
      // email = ""
      $scope.$apply()
    })

    $scope.$on('event:gapi-initialized', function(event) {
      console.log('gapi initialized')
      initialized = true;
      gapiLib = gapi

      $scope.$apply()
    })

    gc.isSignedIn = function() {
      return signedIn
    }

    gc.getGapi = function() {
      return gapiLib
    }

    // this.getEmail = function() {
    //   return email
    // }

    gc.signIn = function() {
      if (gapiLib && gapiLib.hasOwnProperty('auth2'))
        gapiLib.auth2.getAuthInstance().signIn()
    }

    gc.signOut = function() {
      if (gapiLib && gapiLib.hasOwnProperty('auth2'))
        gapiLib.auth2.getAuthInstance().signOut()
    }

    gc.getDocumentList = function() {
      var g = gc.getGapi()
      if (gc.isSignedIn() && g) {
        g.client.drive.files.list({
          'pageSize': 10,
          'fields': "*"
          // 'fields': "iconLink, id, lastModifyingUser, modifiedTime, name, owners, thumbnailLink"
        }).then(function(response) {
          var files = response.result.files
          if (files && files.length > 0) {
            for (var i = 0; i < files.length; i++) {
              var f = files[i]
              // fetchCommentsFor(f.id)

              docList[f.id] = f
            }
          }

          // $scope.$apply()
        })
      }

      return docList
    }

    gc.fetchCommentsFor = function(fID) {
      var g = gc.getGapi()
      if (gc.isSignedIn() && g) {
        g.client.drive.comments.list({
          'fileId': fID,
          'fields': "*"
        }).then(function(resp) {
          commentList[fID] = resp.result.comments
        })
      }
    }

  }




// CommCtrl.$inject = ['GapiCtrl']
// function CommCtrl(gapiCtrl) {
//   var comms = this
//   var commList = []
//
//   comms.fetchCommentsFor(f) = function() {
//     console.log("looking for comments for " + f)
//   }
//
// }

})()
