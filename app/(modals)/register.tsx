import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { useSignUp } from '@clerk/clerk-expo'
import Spinner from 'react-native-loading-spinner-overlay';
import { defaultStyles } from '../../constants/Styles';
import Colors from '../../constants/Colors';

const Register = () => {
  const { isLoaded, signUp, setActive } = useSignUp();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');

  const [loading, setLoading] = useState(false);
  const [pendingVerification, setPendingVerification] = useState(false);

  const onSignUpPress = async () => {
    if (!isLoaded) return;

    try {
      setLoading(true);
      await signUp.create({
        firstName,
        lastName,
        emailAddress,
        password,
      });
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
    } catch (err: any) {
      console.error('Sign up error', err.errors[0].message);
    } finally {
      setPendingVerification(true);
      setLoading(false);
    }
  };

  const onPressVerify = async () => {
    if (!isLoaded) return;

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });
      await setActive({ session: completeSignUp.createdSessionId });
    } catch (err: any) {
      console.error('Verification error', err.errors[0].message);
    } finally {
      setPendingVerification(false);
    }
  };

  return (
    <View style={styles.container}>
      <Spinner visible={loading}/>
      {!pendingVerification && (
        <>
        <TextInput
          autoCapitalize="none"
          placeholder="Name"
          style={[defaultStyles.inputField, { marginBottom: 30 }]}
          onChangeText={setFirstName}
          value={firstName}
        />

        <TextInput
          autoCapitalize="none"
          placeholder="Last name"
          style={[defaultStyles.inputField, { marginBottom: 30 }]}
          onChangeText={setLastName}
          value={lastName}
        />

        <TextInput
          autoCapitalize="none"
          placeholder="Email"
          style={[defaultStyles.inputField, { marginBottom: 30 }]}
          onChangeText={setEmailAddress}
          value={emailAddress}
        />

        <TextInput
          autoCapitalize="none"
          placeholder="Password"
          secureTextEntry
          style={[defaultStyles.inputField, { marginBottom: 30 }]}
          onChangeText={setPassword}
          value={password}
        />

        <TouchableOpacity style={defaultStyles.btn} onPress={onSignUpPress}>
          <Text style={defaultStyles.btnText}>SignUp</Text>
        </TouchableOpacity>
        </>
      )}

      {pendingVerification && (
        <>
          <TextInput
            placeholder='Code...'
            style={[defaultStyles.inputField, { marginBottom: 30 }]}
            onChangeText={setCode}
            value={code}
          />

          <TouchableOpacity style={defaultStyles.btn} onPress={onPressVerify}>
          <Text style={defaultStyles.btnText}>Verify Email</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 26,
  },

  seperatorView: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    marginVertical: 30,
  },
  seperator: {
    fontFamily: 'mon-sb',
    color: Colors.grey,
    fontSize: 16,
  },
  btnOutline: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: Colors.grey,
    height: 50,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  btnOutlineText: {
    color: '#000',
    fontSize: 16,
    fontFamily: 'mon-sb',
  },
});

export default Register;