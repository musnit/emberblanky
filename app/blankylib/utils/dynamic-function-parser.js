import MathFunctions from './math-functions';
import ActionFunctions from './action-functions';

function DynamicFunctionParser() {
}

DynamicFunctionParser.prototype.constructor = DynamicFunctionParser;
DynamicFunctionParser.prototype.getFunctionByType = function(functionType){
    switch (functionType) {
        case 'triangle':
            return MathFunctions.prototype.triangleFunction;
            break;
        case 'sawtooth':
            return MathFunctions.prototype.sawToothFunction;
            break;
        case 'cos':
            return MathFunctions.prototype.cosFunction;
            break;
        case 'sine':
            return MathFunctions.prototype.sinFunction;
            break;
        default:
            return null;
            break;
    }
};
DynamicFunctionParser.prototype.parseFunctions = function(dynamicFunctions) {
    var self = this;
    dynamicFunctions = dynamicFunctions || [];
    var parsedDynamicFunctions = dynamicFunctions.map(function(dynamicFunction){
        return {
            characteristic: dynamicFunction.characteristic,
            speed: parseFloat(dynamicFunction.speed),
            multiplier: parseFloat(dynamicFunction.multiplier),
            functionType: self.getFunctionByType(dynamicFunction.functionType),
        };
    });
    var filteredDynamicFunctions = parsedDynamicFunctions.filter(function(dynamicFunction){
        if(dynamicFunction.characteristic === null || dynamicFunction.characteristic === undefined || dynamicFunction.characteristic === ''){
            return false;
        }
        if(isNaN(dynamicFunction.speed)){
            return false;
        }
        if(isNaN(dynamicFunction.multiplier)){
            return false;
        }
        if(dynamicFunction.functionType === null){
            return false;
        }
        return true;
    });
    return filteredDynamicFunctions;
};

export default DynamicFunctionParser;
