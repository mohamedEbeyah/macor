import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import { Alert, Button, Image, View } from 'react-native';

export default function CameraPicker() {
  const [photo, setPhoto] = useState<string | null>(null);

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'Camera permission is required');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setPhoto(result.assets[0].uri);
    }
  };

  return (
    <View style={{ alignItems: 'center', marginTop: 20, marginBottom: 40 }}>
      <Button title="Take Photo" onPress={takePhoto} />
      {photo && (
        <Image
          source={{ uri: photo }}
          style={{ width: 200, height: 200, marginTop: 20 }}
        />
      )}
    </View>
  );
}
