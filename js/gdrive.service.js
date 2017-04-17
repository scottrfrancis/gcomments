(function() {
"use strict"

angular.module('FilesApp')
  .service('GdriveService', GdriveService)

function GdriveService() {
  var gd = this
  gd.initialized = false
  gd.gapi = null

  gd.files = []
  gd.comments = {}

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

  gd.findFiles = function(searchPhrase, pageItemCount, pageToken) {
    pageItemCount = pageItemCount || 50

    gd.files = []

    if (gd.isGapiLoaded() && gd.isSignedIn() ) {
      var params = {
        'pageSize': pageItemCount,
        'fields': "*",
        'orderBy': "modifiedTime desc"
      }
      if (searchPhrase)
        params.q = "name contains '" + searchPhrase + "'"

      if (pageToken)
        params.pageToken = pageToken

      return gd.gapi.client.drive.files.list(params)
        .then(function(response) {
         response.result.files.map((f) => {
            gd.files.push(f)
          })
        })
    }
  }

  gd.getFiles = function() {
    return gd.files
  }

  gd.getNextPageToken = function() {
    return gd.nextPageToken
  }

  gd.findCommentsForFile = function(fileId) {
    gd.comments[fileId] = []

    if (gd.isGapiLoaded() && gd.isSignedIn()) {
      return gapi.client.drive.comments.list({
        'fileId': fileId,
        'fields': '*',
        'includeDeleted': false
      }).then(function(response) {
        response.result.comments.map((c) => {
          gd.comments[fileId].push(c)
        })
      })
    }
  }

  gd.getCommentsForFile = function(fileId) {
    // var comments = []
    //
    // if (fileId in gd.comments
    //   comments = gd.comments[fileId] || []
    //
    // return comments

    return ((fileId in gd.comments) && gd.comments[fileId]) || []
  }
}

})()
