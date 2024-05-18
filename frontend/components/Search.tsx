import React, { useState } from 'react';
import { View, TextInput, FlatList, Text, StyleSheet } from 'react-native';

interface SearchComponentProps {
  data: string[];
}

const SearchComponent: React.FC<SearchComponentProps> = ({ data }) => {
  const [query, setQuery] = useState<string>('');
  const [filteredData, setFilteredData] = useState<string[]>(data);

  const handleSearch = (text: string) => {
    setQuery(text);
    const filtered = data.filter(item =>
      item.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredData(filtered);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search here..."
        placeholderTextColor="#888" 
        value={query}
        onChangeText={handleSearch}
      />
      <FlatList
        data={filteredData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Text style={styles.item}>{item}</Text>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 10,
  },
  searchBar: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    color:'white',
  },
  item: {
    padding: 10,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
});

export default SearchComponent;
