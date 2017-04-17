(function() {
'use strict'

angular.module('FilesApp', ['googleSignin'])
  .controller('FilesController', FilesController)
  // .service('CommentsService', CommentsService)
  // .controller('CommCtrl', CommCtrl)



FilesController.$inject = ['$scope', '$sce', 'GdriveService']
function FilesController($scope, $sce, GdriveService) {
    var fc = this

    fc.signedIn = false
    fc.files = []
    fc.searchPhrase = "weekly"
    fc.pageItemCount = 5
    fc.currentPage = null
    fc.nextPage = null

    fc.commentList = {}

    $scope.$on('event:google-signin-success', function(event) {
      console.log('signin success')
      fc.signedIn = true

      $scope.$apply()
    })

    $scope.$on('event:google-signin-failure', function(event) {
      console.log('signin failure')
      fc.signedIn = false
      // email = ""
      $scope.$apply()
    })

    $scope.$on('event:gapi-initialized', function(event) {
      console.log('gapi initialized')
      GdriveService.loadGapi(gapi)

      $scope.$apply()
    })

    fc.isSignedIn = function() {
      fc.signedIn = GdriveService.isSignedIn()
      return fc.signedIn
    }

    fc.signIn = function() {
      GdriveService.signIn()
    }

    fc.signOut = function() {
      GdriveService.signOut()
    }

    fc.fetchFiles = function() {
      GdriveService.findFiles(fc.searchPhrase, fc.pageItemCount, fc.nextPage).then(function() {
        fc.files = GdriveService.getFiles()
        fc.currentPage = fc.nextPage
        fc.nextPage = GdriveService.getNextPageToken()

        $scope.$apply()
      })
    }

    fc.getOpenCommentsFor = function(fileId) {
      var comments = []

      if (fileId in fc.commentList)
      // if (fc.commentList.hasOwnProperty(fileId))
        comments = fc.commentList[fileId] || comments

      return comments
    }

    fc.fetchOpenCommentsFor = function(fileId) {
      GdriveService.findCommentsForFile(fileId).then(function() {
        fc.commentList[fileId] = GdriveService.getCommentsForFile(fileId)

        $scope.$apply()
      })
    }

    fc.getCommentContent = function(comm) {
      return $sce.trustAsHtml(comm.htmlContent)
    }

    fc.getQuotedContent = function(comm) {
      var h = "<i>nothing quoted</i>"

      if (comm.hasOwnProperty('quotedFileContent') &&
          comm.quotedFileContent.mimeType == 'text/html') {
        h = comm.quotedFileContent.value
      }

      return $sce.trustAsHtml(h)
    }

    // gc.getDocumentList = function() {
    //   var g = gc.getGapi()
    //   if (gc.isSignedIn() && g) {
    //     g.client.drive.files.list({
    //       'pageSize': 10,
    //       'fields': "*"
    //       // 'fields': "iconLink, id, lastModifyingUser, modifiedTime, name, owners, thumbnailLink"
    //     }).then(function(response) {
    //       var files = response.result.files
    //       gc.docList  = response.result.files
    //       // if (files && files.length > 0) {
    //       //   for (var i = 0; i < files.length; i++) {
    //       //     var f = files[i]
    //       //     // fetchCommentsFor(f.id)
    //       //
    //       //     gc.docList.push(f)
    //       //   }
    //       // }
    //
    //       // $scope.$apply()
    //     })
    //   }
    //
    //   return gc.docList
    // }

    // gc.fetchCommentsFor = function(fID) {
    //   var g = gc.getGapi()
    //   if (gc.isSignedIn() && g) {
    //     g.client.drive.comments.list({
    //       'fileId': fID,
    //       'fields': "*"
    //     }).then(function(resp) {
    //       commentList[fID] = resp.result.comments
    //     })
    //   }
    // }

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
