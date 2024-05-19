import { View, type ViewProps, ImageBackground, StyleSheet } from 'react-native';


export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedView({ style, lightColor, darkColor, ...otherProps }: ThemedViewProps) {
  
  return (
    <ImageBackground
    source={require('../assets/images/home.png')}
    style={styles.backgroundImage}>
    
      <View style={style} {...otherProps} />
    </ImageBackground>
    

  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // 'cover' or 'contain' based on your requirement    
  },    
});
