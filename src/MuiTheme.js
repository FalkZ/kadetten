Object.defineProperty(exports, '__esModule', {
	value: true
})

var _colors = require('material-ui/styles/colors')

var _colorManipulator = require('material-ui/utils/colorManipulator')

var _spacing = require('material-ui/styles/spacing')

var _spacing2 = _interopRequireDefault(_spacing)

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj }
}

/**
 *  Light Theme is the default theme used in material-ui. It is guaranteed to
 *  have all theme variables needed for every component. Variables not defined
 *  in a custom theme will default to these values.
 */
exports.default = {
	spacing: _spacing2.default,
	fontFamily: 'Roboto, sans-serif',
	borderRadius: 2,
	palette: {
		primary1Color: '#475fdd',
		primary2Color: '#5871ef',
		primary3Color: '#798df2',
		accent1Color: '#475fdd',
		accent2Color: '#5871ef',
		accent3Color: '#798df2',
		textColor: _colors.darkBlack,
		secondaryTextColor: (0, _colorManipulator.fade)(_colors.darkBlack, 0.54),
		alternateTextColor: _colors.white,
		canvasColor: '#f7f7f7',
		borderColor: ' #e0e0e0',
		disabledColor: '#798df2',
		pickerHeaderColor: _colors.cyan500,
		clockCircleColor: (0, _colorManipulator.fade)(_colors.darkBlack, 0.07),
		shadowColor: _colors.fullBlack
	}
} /**
    * NB: If you update this file, please also update `docs/src/app/customization/Themes.js`
    */
