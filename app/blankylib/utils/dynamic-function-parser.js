import MathFunctions from './math-functions';

function DynamicFunctionParser() {
}

DynamicFunctionParser.prototype.constructor = DynamicFunctionParser;
DynamicFunctionParser.prototype.getFunctionByType = function(functionType){
    switch (functionType) {
        case 'triangle':
            return MathFunctions.prototype.triangleFunction;
        case 'sawtooth':
            return MathFunctions.prototype.sawToothFunction;
        case 'cos':
            return MathFunctions.prototype.cosFunction;
        case 'sine':
            return MathFunctions.prototype.sinFunction;
        case 'sinsawtooth':
            return MathFunctions.prototype.sinSawtoothFunction;
        case 'tansawtooth':
            return MathFunctions.prototype.tanSawtoothFunction;
        case 'cubedsawtooth':
            return MathFunctions.prototype.cubedSawtoothFunction;
        default:
            return null;
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
