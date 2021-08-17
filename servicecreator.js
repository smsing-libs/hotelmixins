function createSMSing4HotelService (execlib) {
  'use strict';

  var execSuite = execlib.execSuite,
    lib = execlib.lib,
    q = lib.q,
    qlib = lib.qlib;

  function ServiceMixin (prophash, prophashsinknameprop, sinknametoremember) {
    if (!this.remoteHunters) {
      throw new lib.Error('REMOTESERVICELISTENERSERVICEMIXIN_NOT_LOADED', 'You have to load the RemoteServiceListenerServiceMixin first');
    }
    if (!(prophash && prophash[prophashsinknameprop])) {
      throw new lib.Error('SINKNAME_DOES_NOT_EXIST_IN_PROPERTYHASH', prophashsinknameprop+' does not exist in the property hash');
    }
    this.findRemote(prophash[prophashsinknameprop], null, sinknametoremember);
  }
  ServiceMixin.prototype.destroy = function (sinknametoremember) {
  };

  ServiceMixin.initAll = function (prophash, prophashpropertytosinknamemap) {
    lib.traverseShallow(prophashpropertytosinknamemap, ServiceMixin.bind(this, prophash));
    prophash = null;
  }
  ServiceMixin.addMethods = function (klass, sinknametoremember) {
    klass.prototype['sendSMSVia'+sinknametoremember] = execSuite.dependentServiceMethod([], [sinknametoremember], genericSMSSenderFunc);
  };

  function genericSMSSenderFunc (smsersink, phoneto, txt, notbefore, notafter, defer) {
    qlib.promise2defer(smsersink.call('sendSingleMessage', phoneto, '.', {text: txt}, notbefore, notafter), defer);
  }

  return ServiceMixin;
}
module.exports = createSMSing4HotelService;
