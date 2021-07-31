import { AppColors } from "./AppColors";
const { width: viewportWidth, height: viewportHeight } = Dimensions.get("window");
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    Image,
    StatusBar,
    SafeAreaView,
    PixelRatio,
    Platform,
    TouchableOpacity,
    TextInput,
    ScrollView,
    Keyboard,
    ImageBackground,
    AsyncStorage,
  } from "react-native";
export const CommonStyles = {
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    inputView: {
        width: '100%',
        height:50,
        alignSelf: "center",
        backgroundColor:AppColors.inputbg,justifyContent:"center",borderRadius:4,shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        
        elevation: 2,
        marginTop:15,
  },
  inputViewP: {
    width: '100%',
    height:50,
    alignSelf: "center",
    backgroundColor:AppColors.inputbg,justifyContent:"center",borderRadius:4,shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    
    elevation: 2,
},
  inputstyle:{
    fontFamily: "SR",
    color: AppColors.inputcolor,
    width: '100%',
    fontSize: 14,
    paddingBottom: viewportHeight * (0.5 / 100),
    paddingTop: viewportHeight * (0.5 / 100),
    paddingLeft: viewportWidth * (5 / 100),
    paddingRight: viewportWidth * (5 / 100),
  }
  
};