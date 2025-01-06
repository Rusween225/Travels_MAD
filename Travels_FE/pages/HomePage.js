import React, { useEffect, useState, useContext } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import FloatingButton from '../components/FloatingButton';
import { AppContext } from '../context/AppContext';

const HomePage = ({ route }) => {
  const { username } = route.params;
  const { clickCount, setClickCount } = useContext(AppContext) || {};
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const carImages = {
    "Toyota": "https://media.ed.edmunds-media.com/toyota/corolla/2023/oem/2023_toyota_corolla_sedan_xse_fq_oem_1_600.jpg",
    "Honda": "https://i.gaw.to/vehicles/photos/40/34/403433-2024-honda-civic.jpg",
    "Ford":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1lj-QwwqqBmaAKGSd0emRpFUPt1rE-wxL9Q&s",
    "Chevrolet" : "https://media.assets.sincrod.com/websites/content/gmps-smith-in/why_buy_messages/progressive-2.0/bf7918ba439b48dcbb6bb63466a7d51c_c0x65-1280x723.jpg",
    "Audi" : "https://www.usnews.com/object/image/00000190-3b18-d5c3-adbf-3bbaf5a50000/small-6811-2020audia416.jpg?update-time=1718978409085&size=responsive640",
    "Subaru" : "https://images.cars.com/cldstatic/wp-content/uploads/subaru-crosstrek-premium-2024-01-exterior-front-angle-scaled.jpg",
    "Kia" : "https://www.kia.com/us/en/vehicles/ev6/2024/_jcr_content/root/responsivegrid/mediatext_1049602809_280978318.coreimg.100.1400.jpeg/1698069794486/kia-ev6-2024-asset-list-cold-weather-ready.jpeg",
    "BMW" : "https://www.bmwbloomfieldhills.com/blogs/1573/wp-content/uploads/2023/09/bmw-430-1024x768.webp",
    "Lexus" : "https://pictures.dealer.com/l/lexusofgreenville2660laurensroad/0644/395998ad8b37e262a3762ebccfaefe1ax.jpg",
    "Tesla" : "https://hips.hearstapps.com/hmg-prod/images/2024-tesla-model-s-107-6572200e43fa1.jpg?crop=0.586xw:0.496xh;0.204xw,0.271xh&resize=1200:*", 
    "Nissan" : "https://media.ed.edmunds-media.com/nissan/altima/2023/oem/2023_nissan_altima_sedan_vc-t-sr_fq_oem_1_1600.jpg",
    "Mercedes-Benz" : "https://f1rst-motors.s3.me-central-1.amazonaws.com/cars/1714764456573-Untitled_1_3f609979fa.jpg"

  };

  useEffect(() => {
    fetch('https://www.freetestapi.com/api/v1/cars')
      .then((response) => response.json())
      .then((json) => {
        console.log('API Response:', json); // Log the response to inspect it
        setData(json || []); // Adjust this according to the structure of the response
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <Text style={styles.loadingText}>Loading...</Text>;
  if (error) return <Text style={styles.errorText}>Error: {error}</Text>;

  // Function to get the image URL based on car's make or model
  const getCarImage = (carMake) => {

    console.log(carMake)

    console.log(carImages[carMake])
    
    return carImages[carMake] || 'https://via.placeholder.com/100';
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Icon name="truck" size={24} color="#fff" style={styles.icon} />
        <Text style={styles.header}>Welcome, {username}!</Text>
      </View>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => setClickCount(clickCount + 1)} // Handle card click
            style={styles.cardContainer}
          >
            <View style={styles.cardContent}>
              {/* Dynamically select image based on car make */}
              <Image source={{ uri: getCarImage(item.make) }} style={styles.cardImage} />
              <View style={styles.cardDetails}>
                <Text style={styles.cardTitle}>{item.make} {item.model}</Text>
                <Text style={styles.cardYear}>({item.year})</Text>
                <Text style={styles.cardText}>Price: ${item.price}</Text>
                <Text style={styles.cardText}>Mileage: {item.mileage} miles</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
      <FloatingButton count={clickCount || 0} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 15,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    backgroundColor: '#3b5998',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  icon: {
    marginRight: 10,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },
  loadingText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
    color: '#555',
  },
  errorText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
    color: 'red',
  },
  cardContainer: {
    backgroundColor: '#fff',
    borderRadius: 15,
    marginBottom: 20,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    overflow: 'hidden', // Ensures rounded corners work on the card
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 15,
    resizeMode: 'cover',
  },
  cardDetails: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  cardYear: {
    fontSize: 14,
    color: '#888',
    marginVertical: 5,
  },
  cardText: {
    fontSize: 16,
    color: '#333',
    marginVertical: 5,
  },
});

export default HomePage;
