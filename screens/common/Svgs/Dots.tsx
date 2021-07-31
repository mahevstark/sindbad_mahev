import * as React from "react"
import Svg, { Defs, Path, Pattern, Use,Rect ,Image, Circle} from 'react-native-svg';

function Dots() {
  return (
<Svg width="3" height="13" viewBox="0 0 3 13" fill="none">
<Circle cx="1.5" cy="1.5" r="1.5" fill="black"/>
<Circle cx="1.5" cy="6.5" r="1.5" fill="black"/>
<Circle cx="1.5" cy="11.5" r="1.5" fill="black"/>
</Svg>
    
  )
}

export default Dots