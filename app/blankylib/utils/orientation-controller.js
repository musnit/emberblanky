function OrientationController() {
}
OrientationController.prototype.constructor = OrientationController;

OrientationController.prototype.reset = function() {
  this.baseOrientation = undefined;
  self.lastExposedValue = undefined;
  this.orientationDifferenceAt = function(){
    return 0;
  };
  this.peekOrientationDifference = function(){
    return 0;
  };
};
OrientationController.prototype.interpolate = function(x0, y0, x1, y1) {
    var result = function(x) {
       return y0 + (y1 - y0)*((x - x0)/(x1-x0));
    };
    result.m = (y1 - y0)/(x1 - x0);
    result.text = 'y = ' + result.m + 'x';
    return result;
};
OrientationController.prototype.makeOrientationFunction = function(reading) {
    var self = this;
    var point1 = this.lastExposedValue;
    var point2 = reading;
    var functions = [undefined,undefined,undefined];
    functions = functions.map(function(value, index){
      var x0 = point1.timeStamp;
      var y0 = point1.orientation[index];
      var x1 = point2.timeStamp;
      var y1 = point2.orientation[index];
      var fx = self.interpolate(x0, y0, x1, y1);
      return fx;
    });
    var orientationDifferenceAt = function(time, dimension, limit){
      var orientation;
      if(time >= point2.timeStamp){
        orientation = point2.orientation;
      }
      else{
        orientation = [functions[0](time), functions[1](time), functions[2](time)];
      }
      this.lastExposedValue = {
          orientation: orientation,
          timeStamp: time
      };
      var orientationDifference = [
        orientation[0] - self.baseOrientation[0],
        orientation[1] - self.baseOrientation[1],
        orientation[2] - self.baseOrientation[2]
      ];
      var returnValue = orientationDifference[dimension];
      if (returnValue > limit){
          returnValue = limit;
      }
      else if (returnValue < -limit){
          returnValue = -limit;
      }
      return returnValue/limit;
    };
    var peekOrientationDifference = function(time){
      var orientation;
      if(time >= point2.timeStamp){
          orientation = point2.orientation;
      }
      else{
          orientation = [functions[0](time), functions[1](time), functions[2](time)];
      }
      var orientationDifference = [
        orientation[0] - self.baseOrientation[0],
        orientation[1] - self.baseOrientation[1],
        orientation[2] - self.baseOrientation[2]
      ];
      return orientationDifference;
    };
    this.peekOrientation = peekOrientationDifference();
    return orientationDifferenceAt;
};

OrientationController.prototype.normalize = function(orientation){
    orientation[0] = -orientation[0];
    return orientation;
};

OrientationController.prototype.startListening = function() {
  var self = this;
  this.reset();
  if (window.DeviceOrientationEvent) {
    window.addEventListener('deviceorientation', function(eventData) {
      var orientation = [eventData.gamma, eventData.beta, eventData.alpha];
      var currentOrientation = self.normalize(orientation);

      if (!self.baseOrientation){
        self.baseOrientation = currentOrientation;
        self.lastExposedValue = {
            orientation: currentOrientation,
            timeStamp: eventData.timeStamp
        };
      }
      else{
        var reading = {
          orientation: currentOrientation,
          timeStamp: eventData.timeStamp + 50
        };
        self.orientationDifferenceAt = self.makeOrientationFunction(reading);
      }
    });
  }
};
export default OrientationController;
