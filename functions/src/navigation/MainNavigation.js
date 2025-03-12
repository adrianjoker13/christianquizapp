"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const stack_1 = require("@react-navigation/stack");
const native_1 = require("@react-navigation/native");
const HomeScreen_1 = __importDefault(require("../screens/HomeScreen"));
const QuizScreen_1 = __importDefault(require("../screens/QuizScreen"));
const QuizSummaryScreen_1 = __importDefault(require("../screens/QuizSummaryScreen"));
const AuthScreen_1 = __importDefault(require("../screens/AuthScreen"));
const LeaderboardScreen_1 = __importDefault(require("../screens/LeaderboardScreen"));
const AppContext_1 = require("../context/AppContext");
const Stack = (0, stack_1.createStackNavigator)();
const MainNavigation = () => {
    const { user } = (0, AppContext_1.useAppContext)();
    return (<native_1.NavigationContainer>
      <Stack.Navigator>
        {user ? (<>
            <Stack.Screen name="Home" component={HomeScreen_1.default}/>
            <Stack.Screen name="Quiz" component={QuizScreen_1.default}/>
            <Stack.Screen name="QuizSummary" component={QuizSummaryScreen_1.default}/>
            <Stack.Screen name="Leaderboard" component={LeaderboardScreen_1.default}/>
          </>) : (<Stack.Screen name="Auth" component={AuthScreen_1.default} options={{ headerShown: false }}/>)}
      </Stack.Navigator>
    </native_1.NavigationContainer>);
};
exports.default = MainNavigation;
