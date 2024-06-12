import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Entypo } from '@expo/vector-icons';

interface InputBoxProp {
  value?: string  
  placeholder: string
  onInputChange: (text: string) => void;
}

const InputBoxComponent: React.FC<InputBoxProp> = ({ value, placeholder, onInputChange  }) => {
  const [inputValue, setInputValue] = useState(value || "");

  const handleInputChange = (text: string) => {
    setInputValue(text);
    onInputChange(text);  
  };

  return (
    <>
      <View style={styles.container}>                
        <Entypo name="location-pin" size={24} color="#060930" />
        <TextInput
          style={styles.inputBox}
          placeholder={placeholder}
          placeholderTextColor="#888"
          value={inputValue}
          onChangeText={handleInputChange}
        />
        
      </View>     
    </>
  
  );
};

const styles = StyleSheet.create({
  container: {        
    paddingHorizontal: 20,
    display:'flex',
    flexDirection:'row',    
    alignItems:'center',
    borderColor: 'rgba(6, 9, 48, 0.2)',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor:'white'
  },
  inputBox: {    
    padding: 10,
    color:'#060930',
    
  },
  item: {
    padding: 10,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
});

export default InputBoxComponent;
