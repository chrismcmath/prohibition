var SCALAR = 100;
var NAME_OFFSET = {x: 0, y: 0.08};
var MULTI_LINE_NAME_OFFSET = {x: 0, y: 0.1};

GetScaled = function (value) {
    return value * SCALAR;
}

GetNameOffsetX = function () {
    return NAME_OFFSET.x * SCALAR;
}

GetNameOffsetY = function (s) {
    if (s.indexOf('\n') == -1) {
        return NAME_OFFSET.y * SCALAR;
    } else {
        return MULTI_LINE_NAME_OFFSET.y * SCALAR;
    }
}
