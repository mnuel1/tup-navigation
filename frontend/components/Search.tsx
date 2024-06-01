import React, { useState } from 'react';
import { View, TextInput, FlatList, Text, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

interface SearchComponentProps {
  data: string[];
  onSearchChange: (query: string) => void;
}

const SearchComponent: React.FC<SearchComponentProps> = ({ data, onSearchChange  }) => {
  const [query, setQuery] = useState<string>('');
  const [filteredData, setFilteredData] = useState<string[]>(data);

  const handleSearch = (text: string) => {
    setQuery(text);
    const filtered = data.filter(item =>
      item.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredData(filtered);
    onSearchChange(text); 
  };

  return (
    <>
      <View style={styles.container}>
        <AntDesign name="search1" size={24} color="#060930" />        
        <TextInput
          style={styles.searchBar}
          placeholder="Search here..."
          placeholderTextColor="#888" 
          value={query}
          onChangeText={handleSearch}
        />
        
      </View>
      
      {/* <FlatList
          data={filteredData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <Text style={styles.item}>{item}</Text>
          )}
        /> */}
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
  searchBar: {    
    padding: 10,
    color:'#060930',
    
  },
  item: {
    padding: 10,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
});

export default SearchComponent;
