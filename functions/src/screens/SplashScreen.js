"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
function SplashScreen() {
    return (<react_native_1.View style={styles.container}>
      {/* ✅ Correct relative path to the logo */}
      <react_native_1.Image source={require('../../assets/logo.png')} style={styles.logo}/>
    </react_native_1.View>);
}
exports.default = SplashScreen;
const styles = react_native_1.StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff', // Change this to match your branding
    },
    logo: {
        width: 200,
        height: 200,
        resizeMode: 'contain',
    },
});
