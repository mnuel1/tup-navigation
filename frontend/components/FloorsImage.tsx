import { Image, StyleSheet } from 'react-native';

interface FloorsImageType {
    [key: number]: () => JSX.Element;
}


const FloorsImage: FloorsImageType = {
    1: () => <Image
        source={require('../assets/images/1st.png')}
        style={styles.backgroundImage}
        resizeMode="center"/>,
    2: () => <Image
        source={require('../assets/images/2nd.png')}
        style={styles.backgroundImage}
        resizeMode="center"/>,
    3: () => <Image
        source={require('../assets/images/3rd.png')}
        style={styles.backgroundImage}
        resizeMode="center"/>,
    4: () => <Image
        source={require('../assets/images/4th.png')}
        style={styles.backgroundImage}
        resizeMode="center"/>,
  
}



const styles = StyleSheet.create({
    backgroundImage: {
        // flex: 1,
        width: '100%',
        height: '100%',
        // position: 'absolute',
      },
})

export default FloorsImage