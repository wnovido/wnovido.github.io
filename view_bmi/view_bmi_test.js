'use strict';

describe('myApp.view_bmi module', function() {

  beforeEach(module('myApp.view2'));

  describe('view_bmi controller', function(){

    it('should ....', inject(function($controller) {
      //spec body
      var view2Ctrl = $controller('BMICtrl');
      expect(view2Ctrl).toBeDefined();
    }));

  });
});