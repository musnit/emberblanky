import MathFunctions from './math-functions';
import ActionFunctions from './action-functions';
import LegacyFunctionParser from './legacy-function-parser';
import DynamicFunctionParser from './dynamic-function-parser';

function ConfigParser() {
}

ConfigParser.prototype.constructor = ConfigParser;
ConfigParser.prototype.parseConfig = function(config, model) {
    var parsedConfig = {};
    parsedConfig.surfaceType = config.surfaceType;
    parsedConfig.name = config.name;
    parsedConfig.url = config.url;
    parsedConfig.text = (config.text || '').replace(/"/g,'&quot;');
    parsedConfig.pageSpeed = parseFloat(model.page.speed) || 1;
    parsedConfig.numFrames = parseFloat(config.numFrames);
    parsedConfig.opacity = parseFloat(config.opacity) || 1;
    parsedConfig.sizeX = parseFloat(config.sizeX);
    parsedConfig.sizeY = parseFloat(config.sizeY);
    parsedConfig.x = parseFloat(config.initialX);
    parsedConfig.y = parseFloat(config.initialY);
    parsedConfig.xRotate = parseFloat(config.initialRotateX) || 0;
    parsedConfig.yRotate = parseFloat(config.initialRotateY) || 0;
    parsedConfig.zRotate = parseFloat(config.initialRotateZ) || 0;
    parsedConfig.xOrigin = parseFloat(config.xOrigin) || 0;
    parsedConfig.yOrigin = parseFloat(config.yOrigin) || 0;
    parsedConfig.xMountPoint = parseFloat(config.xMountPoint) || 0;
    parsedConfig.yMountPoint = parseFloat(config.yMountPoint) || 0;
    parsedConfig.xAlign = parseFloat(config.xAlign) || 0;
    parsedConfig.yAlign = parseFloat(config.yAlign) || 0;
    parsedConfig.scale = parseFloat(config.scale);
    parsedConfig.xyRatio = parseFloat(config.xyRatio);
    parsedConfig.timeOffset = parseFloat(config.timeOffset);
    parsedConfig.height = parseFloat(config.height);
    parsedConfig.cameraBoundOffset = parseFloat(config.cameraBoundOffset);
    parsedConfig.animationSpeed = parsedConfig.pageSpeed * (parseFloat(config.animationSpeed) || 100);
    parsedConfig.singSpeed = parsedConfig.pageSpeed * (parseFloat(config.singSpeed) || 1);
    parsedConfig.singMotion = (parseFloat(config.singMotion) || 1000);
    parsedConfig.numFrames = parseFloat(config.numFrames);
    parsedConfig.animationFunction = function() {
        return Math.floor(MathFunctions.prototype.sawToothFunction.apply(this, arguments));
    };
    parsedConfig.accel = config.accel;
    parsedConfig.accelAmount = parseFloat(config.accelAmount) || 1;
    parsedConfig.accelRotate = config.accelRotate;
    parsedConfig.accelRotateAmount = parseFloat(config.accelRotateAmount) || 1;
    parsedConfig.animation = config.animation;
    parsedConfig.cameraBound = config.cameraBound;
    parsedConfig.dynamicFunctions = DynamicFunctionParser.prototype.parseFunctions(config.dynamicFunctions);
    parsedConfig.legacyFunctionConfigs = LegacyFunctionParser.prototype.parseConfig(config);

    parsedConfig.allFunctions = parsedConfig.dynamicFunctions.concat(parsedConfig.legacyFunctionConfigs);
    parsedConfig.changingFunctions = parsedConfig.allFunctions.map(function(functionConfig) {
        if (functionConfig.cut){
            functionConfig.functionType = MathFunctions.prototype.cutFunction(functionConfig.functionType,
                functionConfig.cutStart, functionConfig.cutEnd, functionConfig.functionType.period);
        }
        return {
            characteristic: functionConfig.characteristic,
            fn: ActionFunctions.prototype.timeFunction(parsedConfig.timeOffset,
                           functionConfig.speed * parsedConfig.pageSpeed, functionConfig.multiplier, functionConfig.functionType)
        };
    });

    if (parsedConfig.animation){
        var frameNumberFunction = ActionFunctions.prototype.timeFunction(parsedConfig.timeOffset, parsedConfig.animationSpeed,
                   parsedConfig.numFrames, parsedConfig.animationFunction);
        var animationChangeYFunction = function(timePassed) {
            return -frameNumberFunction(timePassed) * model.page.y * parsedConfig.scale;
        };
        parsedConfig.changingFunctions.push({
            characteristic: 'changeY',
            fn: animationChangeYFunction
        });
    }
    if (parsedConfig.accel){
        parsedConfig.changingFunctions.push({
            characteristic: 'changeX',
            fn: ActionFunctions.prototype.accelerometerFunction(1, parsedConfig.accelAmount)
        });
        parsedConfig.changingFunctions.push({
            characteristic: 'changeY',
            fn: ActionFunctions.prototype.accelerometerFunction(0, parsedConfig.accelAmount)
        });
    }
    if (parsedConfig.accelRotate){
        parsedConfig.changingFunctions.push({
            characteristic: 'changeRotateX',
            fn: ActionFunctions.prototype.accelerometerFunction(0, parsedConfig.accelRotateAmount)
        });
        parsedConfig.changingFunctions.push({
            characteristic: 'changeRotateY',
            fn: ActionFunctions.prototype.accelerometerFunction(1, parsedConfig.accelRotateAmount)
        });
    }

    return parsedConfig;
};

export default ConfigParser;
