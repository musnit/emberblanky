import MathFunctions from './math-functions';

function LegacyFunctionParser() {
}

LegacyFunctionParser.prototype.constructor = LegacyFunctionParser;
LegacyFunctionParser.prototype.parseConfig = function(config) {
    var legacyConfig = {};
    legacyConfig.translateFunction = undefined;
    legacyConfig.zoomFunction = undefined;
    legacyConfig.rotateFunction = undefined;
    legacyConfig.skewFunction = undefined;

    legacyConfig.motionType = config.motionType;
    legacyConfig.zoomType = config.zoomType;
    legacyConfig.rotateType = config.rotateType;
    legacyConfig.zoomTypeCut = config.zoomTypeCut;
    legacyConfig.translateTypeCut = config.translateTypeCut;

    legacyConfig.translate = config.translate;
    legacyConfig.rotate = config.rotate;
    legacyConfig.skew = config.skew;
    legacyConfig.zoom = config.zoom;
    legacyConfig.zoomRelativeTranslate = config.zoomRelativeTranslate;

    legacyConfig.zoomCutStart = parseFloat(config.zoomCutStart);
    legacyConfig.zoomCutEnd = parseFloat(config.zoomCutEnd);
    legacyConfig.translateCutStart = parseFloat(config.translateCutStart);
    legacyConfig.translateCutEnd = parseFloat(config.translateCutEnd);

    legacyConfig.translateXSpeed = parseFloat(config.translateXSpeed);
    legacyConfig.translateYSpeed = parseFloat(config.translateYSpeed);
    legacyConfig.translateX = parseFloat(config.translateX);
    legacyConfig.translateY = parseFloat(config.translateY);

    legacyConfig.rotateSpeed = parseFloat(config.rotateSpeed);
    legacyConfig.rotateAngle = parseFloat(config.rotateAngle);
    legacyConfig.skewSpeedX = parseFloat(config.skewSpeedX);
    legacyConfig.skewAmountX = parseFloat(config.skewAmountX);
    legacyConfig.skewSpeedY = parseFloat(config.skewSpeedY);
    legacyConfig.skewAmountY = parseFloat(config.skewAmountY);
    legacyConfig.zoomSpeed = parseFloat(config.zoomSpeed);
    legacyConfig.zoomAmount = parseFloat(config.zoomAmount);
    legacyConfig.zoomRelativeMultiplier = parseFloat(config.zoomRelativeMultiplier);

    if (legacyConfig.motionType === 'triangle'){
        legacyConfig.translateFunction = MathFunctions.prototype.triangleFunction;
    }
    else if (legacyConfig.motionType === 'sawtooth'){
        legacyConfig.translateFunction = MathFunctions.prototype.sawToothFunction;
    }
    else if (legacyConfig.motionType === 'cos'){
        legacyConfig.translateFunction = MathFunctions.prototype.cosFunction;
    }
    else {
        legacyConfig.translateFunction = MathFunctions.prototype.sinFunction;
    }

    if (legacyConfig.zoomType === 'triangle'){
        legacyConfig.zoomFunction = MathFunctions.prototype.triangleFunction;
    }
    else if (legacyConfig.zoomType === 'sin'){
        legacyConfig.zoomFunction = MathFunctions.prototype.sinFunction;
    }
    else if (legacyConfig.zoomType === 'cos'){
        legacyConfig.zoomFunction = MathFunctions.prototype.cosFunction;
    }
    else {
        legacyConfig.zoomFunction = MathFunctions.prototype.sawToothFunction;
    }

    if (legacyConfig.rotateType === 'triangle'){
        legacyConfig.rotateFunction = MathFunctions.prototype.triangleFunction;
    }
    else if (legacyConfig.rotateType === 'sawToothFunction'){
        legacyConfig.rotateFunction = MathFunctions.prototype.sawToothFunction;
    }
    else if (legacyConfig.rotateType === 'cos'){
        legacyConfig.rotateFunction = MathFunctions.prototype.cosFunction;
    }
    else {
        legacyConfig.rotateFunction = MathFunctions.prototype.sinFunction;
    }

    legacyConfig.skewFunction = MathFunctions.prototype.cosFunction;
    legacyConfig.legacyFunctionConfigs = [];

    if (legacyConfig.translate){
        legacyConfig.legacyFunctionConfigs.push({
            characteristic:'changeX',
            speed: legacyConfig.translateXSpeed,
            multiplier: legacyConfig.translateX,
            functionType: legacyConfig.translateFunction,
            cut: legacyConfig.translateTypeCut,
            cutStart: legacyConfig.translateCutStart,
            cutEnd: legacyConfig.translateCutEnd
        });

        legacyConfig.legacyFunctionConfigs.push({
            characteristic:'changeY',
            speed: legacyConfig.translateYSpeed,
            multiplier: legacyConfig.translateY,
            functionType: legacyConfig.translateFunction,
            cut: legacyConfig.translateTypeCut,
            cutStart: legacyConfig.translateCutStart,
            cutEnd: legacyConfig.translateCutEnd
        });
    }
    if (legacyConfig.rotate){
        legacyConfig.legacyFunctionConfigs.push({
            characteristic:'changeRotateZ',
            speed: legacyConfig.rotateSpeed,
            multiplier: 1/legacyConfig.rotateAngle,
            functionType: legacyConfig.rotateFunction
        });
    }
    if (legacyConfig.skew){
        legacyConfig.legacyFunctionConfigs.push({
            characteristic:'changeSkewX',
            speed: legacyConfig.skewSpeedX,
            multiplier: legacyConfig.skewAmountX,
            functionType: legacyConfig.skewFunction
        });
        legacyConfig.legacyFunctionConfigs.push({
            characteristic:'changeSkewY',
            speed: legacyConfig.skewSpeedY,
            multiplier: legacyConfig.skewAmountY,
            functionType: legacyConfig.skewFunction
        });
    }
    if (legacyConfig.zoom){
        if (legacyConfig.zoomRelativeTranslate){
            legacyConfig.legacyFunctionConfigs.push({
                characteristic:'changeZoom',
                speed: legacyConfig.zoomSpeed,
                multiplier: legacyConfig.zoomRelativeMultiplier/legacyConfig.translateY,
                functionType: legacyConfig.zoomFunction,
                cut: legacyConfig.zoomTypeCut,
                cutStart: legacyConfig.zoomCutStart,
                cutEnd: legacyConfig.zoomCutEnd
            });
        }
        else {
            legacyConfig.legacyFunctionConfigs.push({
                characteristic:'changeZoom',
                speed: legacyConfig.zoomSpeed,
                multiplier: legacyConfig.zoomAmount,
                functionType: legacyConfig.zoomFunction,
                cut: legacyConfig.zoomTypeCut,
                cutStart: legacyConfig.zoomCutStart,
                cutEnd: legacyConfig.zoomCutEnd
            });
        }
    }

    return legacyConfig.legacyFunctionConfigs;
};

export default LegacyFunctionParser;
