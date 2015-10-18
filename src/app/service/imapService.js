'use strict';
var ImapService = function($http, localStorageService, $rootScope, $state, $q) {
  this.$http = $http;
  this.localStorageService = localStorageService;
  this.$rootScope = $rootScope;
  this.$state = $state;
  this.$q = $q;
}

ImapService.prototype.auth = function(credential) {
  var self = this;
  var promise = self.$q.defer();
  var path = "/api/1.0/auth";
  var req = {
    method: "POST",
    url : path,
    data : credential
  }
  self.$http(req)
  .success(function(data, status, headers) {
    promise.resolve(data);
    self.$rootScope.isLoggedIn = true;
    self.localStorageService.set("token", data); 
    self.localStorageService.set("username", credential.username);
    self.$rootScope.currentUsername = credential.username;
  })
  .error(function(data, status, headers) {
    self.$rootScope.isLoggedIn = false;
    promise.reject(data, status);
  });
  return promise.promise;
}
ImapService.prototype.getBoxes = function() {
  var self = this;
  var path = "/api/1.0/boxes";
  var token = self.localStorageService.get("token"); 
  var username = self.localStorageService.get("username"); 
  var req = {
    method: "GET",
    url : path,
    headers : {
      token : token,
      username : username
    }
  }
  return self.$http(req)
}
ImapService.prototype.getSpecialBoxes = function() {
  var self = this;
  var path = "/api/1.0/special-boxes";
  var token = self.localStorageService.get("token"); 
  var username = self.localStorageService.get("username"); 
  var req = {
    method: "GET",
    url : path,
    headers : {
      token : token,
      username : username
    }
  }
  return self.$http(req)
}

ImapService.prototype.listBox = function(boxName, canceler) {
  var self = this;
  var promise = self.$q.defer();
  if (self.$rootScope.listBoxCanceler) {
    self.$rootScope.listBoxCanceler.resolve();
  }
  self.$rootScope.listBoxCanceler = self.$q.defer();
  var path = "/api/1.0/list-box?boxName=" + boxName;
  var token = self.localStorageService.get("token"); 
  var username = self.localStorageService.get("username"); 
  var req = {
    method: "GET",
    url : path,
    headers : {
      token : token,
      username : username
    }
  }
  if (canceler) {
    req.timeout = self.$rootScope.listBoxCanceler.promise;
  }
  self.$http(req)
  .success(function(data, status, headers) {
    promise.resolve(data, status); 
  })
  .error(function(data, status, headers) {
    promise.reject(data, status);
  });
  return promise.promise;
}

ImapService.prototype.addBox = function(boxName) {
  var self = this;
  var path = "/api/1.0/box?boxName=" + boxName;
  var token = self.localStorageService.get("token"); 
  var username = self.localStorageService.get("username"); 
  var req = {
    method: "POST",
    url : path,
    headers : {
      token : token,
      username : username
    }
  }
  return self.$http(req)
}

ImapService.prototype.renameBox = function(boxName, newBoxName) {
  var self = this;
  var path = "/api/1.0/rename-box?boxName=" + boxName + "&newBoxName=" + newBoxName;
  var token = self.localStorageService.get("token"); 
  var username = self.localStorageService.get("username"); 
  var req = {
    method: "POST",
    url : path,
    headers : {
      token : token,
      username : username
    }
  }
  return self.$http(req)
}

ImapService.prototype.deleteBox = function(boxName) {
  var self = this;
  var path = "/api/1.0/box?boxName=" + boxName;
  var token = self.localStorageService.get("token"); 
  var username = self.localStorageService.get("username"); 
  var req = {
    method: "DELETE",
    url : path,
    headers : {
      token : token,
      username : username
    }
  }
  return self.$http(req)
}

ImapService.prototype.retrieveMessage = function(id, boxName, canceler) {
  var self = this;
  var promise = self.$q.defer();
  if (self.$rootScope.retrieveMessageCanceler) {
    self.$rootScope.retrieveMessageCanceler.resolve();
  }
  self.$rootScope.retrieveMessageCanceler = self.$q.defer();
  var path = "/api/1.0/message?id=" + id + "&boxName=" + boxName;
  var token = self.localStorageService.get("token"); 
  var username = self.localStorageService.get("username"); 
  var req = {
    method: "GET",
    url : path,
    headers : {
      token : token,
      username : username
    }
  }
  if (canceler) {
    req.timeout = self.$rootScope.retrieveMessageCanceler.promise;
  }
  self.$http(req)
  .success(function(data, status, headers) {
    promise.resolve(data, status); 
  })
  .error(function(data, status, headers) {
    promise.reject(data, status);
  });
  return promise.promise;
}

ImapService.prototype.moveMessage = function(id, boxName, newBoxName) {
  var self = this;
  var path = "/api/1.0/move-message?id=" + id + "&boxName=" + boxName + "&newBoxName=" + newBoxName;;
  var token = self.localStorageService.get("token"); 
  var username = self.localStorageService.get("username"); 
  var req = {
    method: "POST",
    url : path,
    headers : {
      token : token,
      username : username
    }
  }
  return self.$http(req)
}

ImapService.prototype.deleteMessage = function(id, boxName) {
  var self = this;
  var path = "/api/1.0/message?id=" + id + "&boxName=" + boxName;
  var token = self.localStorageService.get("token"); 
  var username = self.localStorageService.get("username"); 
  var req = {
    method: "DELETE",
    url : path,
    headers : {
      token : token,
      username : username
    }
  }
  return self.$http(req)
}

ImapService.prototype.newMessage = function(newMessage) {
  var self = this;
  var path = "/api/1.0/message";
  var token = self.localStorageService.get("token"); 
  var username = self.localStorageService.get("username"); 
  var req = {
    method: "POST",
    url : path,
    data : newMessage,
    headers : {
      token : token,
      username : username
    }
  }
  return self.$http(req)
}

ImapService.prototype.logout = function() {
  var self = this;
  var path = "/api/1.0/logout";
  var token = self.localStorageService.get("token"); 
  var username = self.localStorageService.get("username"); 
  var req = {
    method: "GET",
    url : path,
    headers : {
      token : token,
      username : username
    }
  }
  return self.$http(req)
}

ImapService.prototype.sendMessage = function(msg) {
  var self = this;
  var path = "/api/1.0/send";
  var token = self.localStorageService.get("token"); 
  var username = self.localStorageService.get("username"); 
  var req = {
    method: "POST",
    url : path,
    data : msg,
    headers : {
      token : token,
      username : username
    }
  }
  return self.$http(req)
}

ImapService.inject = ["$http", "localStorageService", "$rootScope", "$state", "$q"];

var module = require("./index");
module.service("ImapService", ImapService);
