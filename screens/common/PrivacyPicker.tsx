
import React from "react";
import {
  View,
  Image,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Modal,
  FlatList
} from "react-native";

 
import { Container,Right, Body, Title,Content, DatePicker, Header, Left, Button, ListItem, Radio } from 'native-base';
import DownA from "./Svgs/DownA";

 
interface dataType  {
  title:"",
  value:""
}

interface Props {
    data: any,
    selected:any,
    onValueChange: (t)=>void
  }
  
  const PrivacyPicker= (props: Props) => {
    const [data, setData] = React.useState(props.data);
    const [filteredData, setFilteredData] = React.useState(props.data);
    const [modal, setModal] = React.useState(false);
    const [current, setCurrnet] = React.useState(props.selected);




    const do_filter=(str)=>
    {
        str = str.toLowerCase();
        var all =data;

        var filtered_data = all.filter((v)=>{
            var value = v.title.toLowerCase();
            return value.includes(str)?true:false
        })
        setFilteredData(filtered_data);
    }
 
   
   
    const headerPicker = ()=>{
      return (
        <Header style={{backgroundColor:"#00860D"}}>
            <Left>
              <Button
                style={{
                  shadowOffset: null,
                  shadowColor: null,
                  shadowRadius: null,
                  shadowOpacity: null,
                  marginLeft: 3,
                }}
                transparent
                onPress={() => {
                 setModal(false)
                }}
              >
                <Text style={{color:'#fff'}}>Close</Text>
              </Button>
            </Left>
            <Body>
              <Title>Choose</Title>
            </Body>
            <Right />
          </Header>
      )
    }
    const fresh_start=()=>
    {

      setFilteredData(props.data);
      setModal(true)
     
    }
    const search= () =>
      {
          return (
              <View style={{backgroundColor:"#ccc",
              paddingVertical:5,
                  paddingHorizontal:10,
              width:"100%"}}>
                  <TextInput
                  placeholder={"Search"}
                  autoCapitalize={"none"}
                  onChangeText={(v)=>{
                      do_filter(v)
                  }}
                  style={{backgroundColor:"#fff",
                  borderRadius:15,
                  paddingVertical:5,
                  paddingHorizontal:10,
                  fontSize:14}}
                  />
              </View>
          )
      }
        return (
        <View style={{width:'100%',paddingLeft:20,paddingRight:10}} >
            <TouchableOpacity
            onPress={()=>{
                fresh_start()
                
            }}
             style={[{
             
             }]}>
                <View style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
                    <Text style={{color:'#737373',fontSize:14,fontFamily:"SR"}}>{current.title}</Text>
                <DownA />
                </View>
            </TouchableOpacity>
            <Modal
                animationType="slide"
                transparent={false}
                visible={modal}
                onRequestClose={() => {
                   setModal(false)
                }}
            >
                <Container >
                    {headerPicker()}
                    {search()}
                    <FlatList
                        data={filteredData}
                        keyExtractor={(item, index) => String(index)}
                        renderItem={({ item , index}) => (
                            <ListItem
                                selected={item.title === current.title}
                                button
                                
                                onPress={() => {
                                    
                                    setModal(false)
                                    props.onValueChange(index);
                                    setCurrnet(item)
                                    
                                }}
                            >
                                <Left>
                                    <Text style={{color:'#363636',fontSize:20,fontFamily:"SR"}}>
                                       {item.title}
                                    </Text>
                                </Left>
                                <Right>
                                    {(item.title === current.title) ? (
                                        <Radio selected />
                                    ) : (
                                        <Radio selected={false} />
                                        )}
                                </Right>
                            </ListItem>
                        )}
                    />
                </Container>
            </Modal>
        </View>);
     
};
export default PrivacyPicker;
