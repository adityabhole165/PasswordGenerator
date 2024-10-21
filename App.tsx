import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput,  TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'

// form Validation
import * as Yup from 'yup'

import BouncyCheckox from "react-native-bouncy-checkbox"

import {Formik} from 'formik'


const passwordSchema = Yup.object().shape({
  passwordLength: Yup.number()
  .min(4, 'should be min of 4 characters' ) 
  .max(16 , 'should be max of 16 characters')
  .required('length is required')
})
export default function App() {
  const [password,setPassword] = useState('')
  const [isPassGenerated,setIsPassGenerated] = useState(false)

  const [lowerCase,setLowerCase] = useState(true)
  const [upperCase,setUpperCase] = useState(false)
  const [number,setNumber] = useState(false) 
  const [symbols,setymbols] = useState(false) 

  const generatePasswordString = (passwordLength: number) => {
    let characterlist = '';

    const upperCaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowerCaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const digitChars = '0123456789';
    const specialChars = '!@#$%^&*+_';

    if(upperCase) {
      characterlist += upperCaseChars
    }
    if(lowerCase) {
      characterlist += lowerCaseChars
    }
    if (number) {
      characterlist += digitChars
    }
    if (symbols) {
      characterlist += specialChars
    }

    const passwordResult = createPassword(characterlist,passwordLength)

    setPassword( passwordResult)
    setIsPassGenerated(true)
     
  }

  const createPassword = (characters: string, passwordLength: number) => {
      let result = ''
      for (let i = 0 ; i < passwordLength; i++ ) {
        const characterIndex = Math.round(Math.random() * characters.length)
        result += characters.charAt(characterIndex)
      }
      return result
  }  

  const resetPasswordState = () => {
    setPassword('')
    setIsPassGenerated(false)
    setLowerCase(false)
    setUpperCase(false)
    setNumber(false) 
    setymbols(false)
      }

  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <SafeAreaView style={styles.appContainer}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>Password Generator</Text>
          <Formik
            initialValues={ {passwordLength: '' }}
            validatiomShema={passwordSchema}
            onSubmit={ values => {
              console.log(values);
              generatePasswordString(+values.passwordLength) 
            }}
            >
            {({
              values,
              errors,
              touched,
              isValid,
              handleChange,
              handleSubmit,
              handleReset,
              /* and other goodies */
            }) => (
              <>
                <View style={styles.inputWrapper}>
                  <View style={styles.inputColumn}>
                    <Text style={styles.heading}> Password Length </Text>
                    {touched.passwordLenth && errors.passwordLength &&(
                      <Text style={styles.errorText}>
                        {errors.passwordLength}
                      </Text>
                    )}
                  </View>
                  <TextInput
                        style={styles.inputStyle}
                        value={values.passwordLength}
                        onChangeText={handleChange('passwordLength')}
                        placeholder="Ex. 8"
                        keyboardType='numeric'
                    />
                  
                </View>
               <View style={styles.inputWrapper}>
          <Text style={styles.heading}>Include lowercase</Text>
          <View style={styles.checkStyle}>
          <BouncyCheckox 
          style={styles.inputCheck}
          useBuiltInState
          isChecked={lowerCase}
          onPress={() => setLowerCase(!lowerCase)}
          fillColor="#29AB87"
          />
          </View>
         
         </View>
         <View style={styles.inputWrapper}>
          <Text style={styles.heading}>Include Uppercase</Text>
          <View >
          <BouncyCheckox 
          useBuiltInState
          isChecked={upperCase}
          onPress={() => setUpperCase(!upperCase)}
          fillColor="#67E6DC"
          />
          </View>
         </View>
         
         
         <View style={styles.inputWrapper}>
          <Text style={styles.heading}>Include Numbers</Text>
          <View >
          <BouncyCheckox 
          useBuiltInState
          isChecked={number}
          onPress={() => setNumber(!number)}
          fillColor="#FFF222"
          />
          </View>
         </View>
         <View style={styles.inputWrapper}>
          <Text style={styles.heading}>Include Symbols</Text>
          <View >
          <BouncyCheckox 
          useBuiltInState
          isChecked={symbols}
          onPress={() => setymbols(!symbols)}
          fillColor="#2B2B52"
          />
          </View>
         </View>
                <View style={styles.formActions}>
                  <TouchableOpacity
                    disabled={!isValid}
                    style={styles.primaryBtn}
                    onPress={handleSubmit}
                  >
                    <Text style={styles.primaryBtnTxt}>
                      Generate Password
                      </Text>
                    </TouchableOpacity>
                  <TouchableOpacity 
                  style={styles.secondaryBtn}
                  onPress={ () =>{ 
                    handleReset();
                    resetPasswordState();
                    }
                  }
                  >
                    <Text>
                    Reset
                    </Text>
                    </TouchableOpacity>
                </View>

              </>
            )}
          </Formik>
        </View>
        {isPassGenerated ? (
          <View style={[styles.card, styles.cardElevated]}>
            <Text style={styles.subTitle}>Result : </Text>
            <Text style={styles.description}> Long Press to copy </Text> 
            <Text style={styles.generatedPassword}>{password}</Text>
          </View>
        ) :  null }
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
    appContainer: {
        flex: 1,
        padding: 20
      },
      formContainer: {
        margin: 8,
        padding: 8,
      },
      header: {
        marginBottom: 30,
      },
      title: {
        fontSize: 32,
        fontWeight: '600',
        marginBottom: 15,
        color: '#2D3748',
        textAlign: 'center',
      },
      subTitle: {
        fontSize: 26,
        fontWeight: '600',
        marginBottom: 2,
      },
      description: {
        color: '#758283',
        marginBottom: 8,
      },
      heading: {
        fontSize: 15,
      },
      inputWrapper: {
        marginBottom: 15,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
      },
      inputColumn: {
        flexDirection: 'column',
      },
      inputStyle: {
        padding: 8,
        width: '30%',
        borderWidth: 1,
        borderRadius: 4,
        borderColor: '#16213e',
      },
      errorText: {
        fontSize: 12,
        color: '#ff0d10',
      },
      formActions: {
        flexDirection: 'row',
        justifyContent: 'center',
      },
      primaryBtn: {
        width: 120,
        padding: 10,
        borderRadius: 8,
        marginHorizontal: 8,
        backgroundColor: '#5DA3FA',
      },
      primaryBtnTxt: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: '700',
      },
      secondaryBtn: {
        width: 120,
        padding: 10,
        borderRadius: 8,
        marginHorizontal: 8,
        backgroundColor: '#CAD5E2',
      },
      secondaryBtnTxt: {
        textAlign: 'center',
      },
      card: {
        padding: 12,
        borderRadius: 6,
        marginHorizontal: 12,
      },
      cardElevated: {
        backgroundColor: '#ffffff',
        elevation: 1,
        shadowOffset: {
          width: 1,
          height: 1,
        },
        shadowColor: '#333',
        shadowOpacity: 0.2,
        shadowRadius: 2,
      },
      generatedPassword: {
        fontSize: 22,
        textAlign: 'center',
        marginBottom: 12,
        color:'#000'
      },
      inputcheck: {
        padding: 8,
        width: '30%',
        marginLeft: 20,
        borderWidth: 1,
        borderRadius: 4,
        borderColor: '#16213e',
      },
})