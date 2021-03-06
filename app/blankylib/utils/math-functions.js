import Famous from 'npm:famous';

function MathFunctions() {
}

MathFunctions.prototype.constructor = MathFunctions;

//amplitute: 2, about: 0, start: 0, period 2pi
MathFunctions.prototype.sinFunction = function(xPosition, range) {
    return Math.sin(xPosition)*range;
};
MathFunctions.prototype.sinFunction.period = 2 * Math.PI;

//amplitute: 1, about: 0.5, start: 0.5, period 2pi
MathFunctions.prototype.halfOneSinFunction = function(xPosition, range) {
    return (Math.sin(xPosition)+1)/2*range;
};
MathFunctions.prototype.halfOneSinFunction.period = 2 * Math.PI;

//amplitute: 1, about: 0.5, start: 0, period: 1
MathFunctions.prototype.cosFunction = function(xPosition, range) {
    return ((1-Math.cos(2 * Math.PI * xPosition))/2)*range;
};
MathFunctions.prototype.cosFunction.period = 1;

//amplitute: 1, about: 0.5, start: 0, period: pi
MathFunctions.prototype.absSinFunction = function(xPosition, range) {
    return -Math.abs(Math.sin(xPosition))*range;
};
MathFunctions.prototype.absSinFunction.period = Math.PI;

//amplitute: 2, about: 0, start: 0, period: 2pi
MathFunctions.prototype.triangleFunction = function(xPosition, range) {
    return (2/Math.PI)*Math.asin(Math.sin(xPosition))*range;
};
MathFunctions.prototype.triangleFunction.period = 2 * Math.PI;

//amplitute: 1, about: 0.5, start: 0, period: 1
MathFunctions.prototype.sawToothFunction = function(xPosition, range) {
    return range*(xPosition - Math.floor(xPosition));
};
MathFunctions.prototype.sawToothFunction.period = 1;

//amplitute: 1, about: 0.5, start: 0, period: 1
MathFunctions.prototype.sinSawtoothFunction = function(xPosition, range) {
    return range*(Math.sin(Math.PI*xPosition - Math.PI*Math.floor(xPosition) - Math.PI/2) + 1)*0.5;
};
MathFunctions.prototype.sinSawtoothFunction.period = 1;

//amplitute: inf, about: inf/2, start: 0, period: 1
MathFunctions.prototype.tanSawtoothFunction = function(xPosition, range) {
    return range*(Math.tan((xPosition - Math.floor(xPosition))*Math.PI/2));
};
MathFunctions.prototype.tanSawtoothFunction.period = 1;

MathFunctions.prototype.famousInOutBackFunction = function(xPosition, range) {
  var testCurve = Famous.transitions.Curves.inOutBack;
  return range*testCurve(xPosition - Math.floor(xPosition), 3.7);
};
MathFunctions.prototype.famousInOutBackFunction.period = 1;

//amplitute: 1, about: 0,5, start: 0, period: 1
MathFunctions.prototype.cubedSawtoothFunction = function(xPosition, range) {
    return range*(Math.pow(xPosition - Math.floor(xPosition) +1, 3) - 1);
};
MathFunctions.prototype.cubedSawtoothFunction.period = 1;

MathFunctions.prototype.periodChangedFunction = function(initialFunction, change) {
    var newFunction = function(xPosition, range) {
        return initialFunction(change*xPosition, range);
    };
    newFunction.period = initialFunction.period/change;
    return newFunction;
};

MathFunctions.prototype.cutFunction = function(initialFunction, start, end, period) {
    var factor = 100/(end-start);
    var modifiedFunction = this.periodChangedFunction(initialFunction, factor);
    var newFunction = function(xPosition, range) {
        var startX = period * start/100;
        var endX = period * end/100;
        var moddedXPosition = xPosition % period;
        if (moddedXPosition < startX){
            return initialFunction(0.001, range);
        }
        else if (moddedXPosition > endX){
            return initialFunction(period*0.9999, range);
        }
        else {
            return modifiedFunction(moddedXPosition-startX, range);
        }
    };
    newFunction.period = initialFunction.period/factor;
    return newFunction;
};

export default MathFunctions;
