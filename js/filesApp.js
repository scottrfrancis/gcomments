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
    fc.searchPhrase = "Weekly Report"
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
      fc.files = []
      fc.commentList = {}

      GdriveService.findFiles(fc.searchPhrase, fc.pageItemCount, fc.nextPage).then(function() {
        fc.files = GdriveService.getFiles()
        fc.currentPage = fc.nextPage
        fc.nextPage = GdriveService.getNextPageToken()

        $scope.$apply()
      })
    }

    fc.getOpenCommentsFor = function(fileId) {
      var comments = []

      if (fc.hasCommentsFor(fileId))
      // if (fc.commentList.hasOwnProperty(fileId))
        comments = fc.commentList[fileId] || comments

      return comments
    }

    fc.fetchOpenCommentsFor = function(fileId) {
      GdriveService.findCommentsForFile(fileId).then(function() {
        // fc.commentList[fileId] = GdriveService.getCommentsForFile(fileId)
        fc.commentList[fileId] = []

        GdriveService.getCommentsForFile(fileId).forEach((c) => {
          if (!c.resolved) {
            fc.commentList[fileId].push(c)
          }
        })

        $scope.$apply()
      })
    }

    fc.hasCommentsFor = function(fileId) {
      return (fileId in fc.commentList)
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

    fc.getObjectString = function(o) {
      return $sce.trustAsHtml(JSON.stringify(o, null, 2))
    }

  }

})()
