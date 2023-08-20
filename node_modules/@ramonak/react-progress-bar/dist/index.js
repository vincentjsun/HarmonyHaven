Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var PropTypes = require('prop-types');

function _interopNamespace(e) {
    if (e && e.__esModule) return e;
    var n = Object.create(null);
    if (e) {
        Object.keys(e).forEach(function (k) {
            if (k !== 'default') {
                var d = Object.getOwnPropertyDescriptor(e, k);
                Object.defineProperty(n, k, d.get ? d : {
                    enumerable: true,
                    get: function () { return e[k]; }
                });
            }
        });
    }
    n["default"] = e;
    return Object.freeze(n);
}

var React__namespace = /*#__PURE__*/_interopNamespace(React);
var PropTypes__namespace = /*#__PURE__*/_interopNamespace(PropTypes);

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

var ProgressBar = function (_a) {
    var bgColor = _a.bgColor, completed = _a.completed, baseBgColor = _a.baseBgColor, height = _a.height, width = _a.width, margin = _a.margin, padding = _a.padding, borderRadius = _a.borderRadius, labelAlignment = _a.labelAlignment, labelColor = _a.labelColor, labelSize = _a.labelSize, isLabelVisible = _a.isLabelVisible, customLabelStyles = _a.customLabelStyles, transitionDuration = _a.transitionDuration, transitionTimingFunction = _a.transitionTimingFunction, className = _a.className, dir = _a.dir, ariaValuemin = _a.ariaValuemin, ariaValuemax = _a.ariaValuemax, ariaValuetext = _a.ariaValuetext, maxCompleted = _a.maxCompleted, customLabel = _a.customLabel, animateOnRender = _a.animateOnRender, barContainerClassName = _a.barContainerClassName, completedClassName = _a.completedClassName, labelClassName = _a.labelClassName, _b = _a.initCompletedOnAnimation, initCompletedOnAnimation = _b === void 0 ? 0 : _b;
    var getAlignment = function (alignmentOption) {
        if (alignmentOption === "left") {
            return "flex-start";
        }
        else if (alignmentOption === "center") {
            return "center";
        }
        else if (alignmentOption === "right") {
            return "flex-end";
        }
        else {
            return null;
        }
    };
    var alignment = getAlignment(labelAlignment);
    var initCompletedOnAnimationStr = typeof initCompletedOnAnimation === "number"
        ? "".concat(initCompletedOnAnimation, "%")
        : initCompletedOnAnimation;
    var getFillerWidth = function (maxCompletedValue, completedValue) {
        if (maxCompletedValue) {
            var ratio = Number(completedValue) / maxCompletedValue;
            return ratio > 1 ? "100%" : "".concat(ratio * 100, "%");
        }
        return initCompletedOnAnimationStr;
    };
    var fillerWidth = getFillerWidth(maxCompleted, completed);
    var _c = React__namespace.useState(initCompletedOnAnimationStr), initWidth = _c[0], setInitWidth = _c[1];
    var containerStyles = {
        height: height,
        background: baseBgColor,
        borderRadius: borderRadius,
        padding: padding,
        width: width,
        margin: margin,
        overflow: "hidden",
    };
    var fillerStyles = {
        height: height,
        width: animateOnRender ? initWidth : fillerWidth,
        background: bgColor,
        transition: "width ".concat(transitionDuration || "1s", " ").concat(transitionTimingFunction || "ease-in-out"),
        borderRadius: "inherit",
        display: "flex",
        alignItems: "center",
        justifyContent: labelAlignment !== "outside" && alignment ? alignment : "normal",
    };
    var labelStyles = __assign({ padding: labelAlignment === "outside" ? "0 0 0 5px" : "5px", color: labelColor, fontWeight: "bold", fontSize: labelSize, display: !isLabelVisible ? "none" : "initial" }, customLabelStyles);
    var outsideStyles = {
        display: labelAlignment === "outside" ? "flex" : "initial",
        alignItems: labelAlignment === "outside" ? "center" : "initial",
    };
    var completedStr = typeof completed === "number" ? "".concat(completed, "%") : "".concat(completed);
    var labelStr = customLabel ? customLabel : completedStr;
    React__namespace.useEffect(function () {
        if (animateOnRender) {
            requestAnimationFrame(function () { return setInitWidth(fillerWidth); });
        }
    }, [fillerWidth, animateOnRender]);
    return (React__namespace.createElement("div", { style: className ? undefined : outsideStyles, className: className, dir: dir, role: "progressbar", "aria-valuenow": parseFloat(labelStr), "aria-valuemin": ariaValuemin, "aria-valuemax": ariaValuemax, "aria-valuetext": "".concat(ariaValuetext === null ? labelStr : ariaValuetext) },
        React__namespace.createElement("div", { style: barContainerClassName ? undefined : containerStyles, className: barContainerClassName },
            React__namespace.createElement("div", { style: completedClassName ? undefined : fillerStyles, className: completedClassName }, labelAlignment !== "outside" && (React__namespace.createElement("span", { style: labelClassName ? undefined : labelStyles, className: labelClassName }, labelStr)))),
        labelAlignment === "outside" && (React__namespace.createElement("span", { style: labelClassName ? undefined : labelStyles, className: labelClassName }, labelStr))));
};
ProgressBar.propTypes = {
    completed: PropTypes__namespace.oneOfType([PropTypes__namespace.string, PropTypes__namespace.number])
        .isRequired,
    bgColor: PropTypes__namespace.string,
    baseBgColor: PropTypes__namespace.string,
    height: PropTypes__namespace.string,
    width: PropTypes__namespace.string,
    borderRadius: PropTypes__namespace.string,
    margin: PropTypes__namespace.string,
    padding: PropTypes__namespace.string,
    labelAlignment: PropTypes__namespace.oneOf(["left", "center", "right", "outside"]),
    labelColor: PropTypes__namespace.string,
    labelSize: PropTypes__namespace.string,
    isLabelVisible: PropTypes__namespace.bool,
    className: PropTypes__namespace.string,
    dir: PropTypes__namespace.oneOf(["rtl", "ltr", "auto"]),
    maxCompleted: PropTypes__namespace.number,
    customLabel: PropTypes__namespace.string,
    animateOnRender: PropTypes__namespace.bool,
    barContainerClassName: PropTypes__namespace.string,
    completedClassName: PropTypes__namespace.string,
    labelClassName: PropTypes__namespace.string,
    initCompletedOnAnimation: PropTypes__namespace.oneOfType([
        PropTypes__namespace.string,
        PropTypes__namespace.number,
    ]),
};
ProgressBar.defaultProps = {
    bgColor: "#6a1b9a",
    height: "20px",
    width: "100%",
    borderRadius: "50px",
    labelAlignment: "right",
    baseBgColor: "#e0e0de",
    labelColor: "#fff",
    labelSize: "15px",
    isLabelVisible: true,
    dir: "ltr",
    ariaValuemin: 0,
    ariaValuemax: 100,
    ariaValuetext: null,
    maxCompleted: 100,
    animateOnRender: false,
    initCompletedOnAnimation: 0,
};

exports["default"] = ProgressBar;
//# sourceMappingURL=index.js.map
