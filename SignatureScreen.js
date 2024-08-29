import React, { useRef } from 'react';
import { View, Button, Image } from 'react-native';
import Signature from 'react-native-signature-canvas';
import * as FileSystem from 'expo-file-system';

const SignatureScreen = () => {
  const ref = useRef();

  const handleOK = async (signature) => {
    const imagePath = await saveSignature(signature);
    console.log('Image saved to:', imagePath);
  };

  const handleClear = () => {
    ref.current.clearSignature();
  };

  const handleConfirm = () => {
    ref.current.readSignature();
  };

  const saveSignature = async (base64String) => {
    const filename = `${FileSystem.documentDirectory}signature.png`;

    // Removing the base64 header from the string
    const base64Data = base64String.replace('data:image/png;base64,', '');

    try {
      await FileSystem.writeAsStringAsync(filename, base64Data, {
        encoding: FileSystem.EncodingType.Base64,
      });
      return filename;
    } catch (error) {
      console.error('Error saving image:', error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Signature
        ref={ref}
        onOK={handleOK}
        onEmpty={() => console.log('Empty')}
        descriptionText="Sign"
        clearText="Clear"
        confirmText="Save"
        webStyle={`.m-signature-pad--footer {display: none; margin: 0px;}`}
        autoClear={true}
      />
      <Button title="Clear" onPress={handleClear} />
      <Button title="Save" onPress={handleConfirm} />
      <Image
        source={{ uri: 'file:///data/user/0/host.exp.exponent/files/signature.png' }}
        style={{ width: 300, height: 300 }}
      />
    </View>
  );
};

export default SignatureScreen;
