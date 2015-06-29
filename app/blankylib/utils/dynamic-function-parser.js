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
        case 'sinsawtooth':
            return MathFunctions.prototype.sinSawtoothFunction;
            break;
        case 'tansawtooth':
            return MathFunctions.prototype.tanSawtoothFunction;
            break;
        case 'cubedsawtooth':
            return MathFunctions.prototype.cubedSawtoothFunction;
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
            cut: dynamicFunction.cut,
            cutStart: parseFloat(dynamicFunction.cutStart),
            cutEnd: parseFloat(dynamicFunction.cutEnd)
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
        if(dynamicFunction.cut){
            if(isNaN(dynamicFunction.cutStart)){
                return false;
            }
            if(isNaN(dynamicFunction.cutEnd)){
                return false;
            }
        }
        return true;
    });
    return filteredDynamicFunctions;
};

export default DynamicFunctionParser;
