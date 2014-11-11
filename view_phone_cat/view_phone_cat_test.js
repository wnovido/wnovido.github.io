'use strict';

describe('myApp.view_phone_cat module', function() {

  beforeEach(module('myApp.phone_cat'));

  describe('view_phone_cat controller', function(){

    it('should ....', inject(function($controller) {
      //spec body
      var PhoneCatCtrl = $controller('PhoneCatCtrl');
      expect(PhoneCatCtrl).toBeDefined();
    }));

  });
});