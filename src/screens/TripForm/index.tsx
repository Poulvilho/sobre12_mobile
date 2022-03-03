import { useNavigation } from '@react-navigation/core';
import { useFormik } from 'formik';
import React from 'react';
import { Button } from 'react-native';

import { authResult } from '../../hooks/auth';

import CustomDateTimePicker from '../../components/CustomDatePicker';
import CustomTextInput from '../../components/CustomTextInput';
import { Text, View } from '../../components/Themed';

import { CreateTrip, ITrip } from './api';
import { styles } from './styles';

export default function TripForm() {
  const { navigate } = useNavigation();
  
  const handleSubmit = ((values: ITrip) => {
    CreateTrip(values);
    navigate('Home')
  });

  const tripFormik = useFormik<ITrip>({
    initialValues: {
      name: '',
      description: '',
      dtstart: new Date(),
      dtend: new Date(),
      user: authResult,
    },
    onSubmit: handleSubmit,
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sua viagem</Text>
      <CustomTextInput
        title='Nome'
        fieldName='name'
        formikHelpers={tripFormik}
        width='80%'
        mode='outlined'
      />
      <CustomTextInput
        title='Descrição'
        fieldName='description'
        formikHelpers={tripFormik}
        width='80%'
        mode='outlined'
      />
      <View style={styles.row}>
        <CustomDateTimePicker
          date={tripFormik.values.dtstart}
          setDate={(newDate) => tripFormik.setFieldValue('dtstart', newDate)}
          mode={'date'}
          error={Boolean(tripFormik.errors.dtstart)}
          width='40%'
        />
        <CustomDateTimePicker
          date={tripFormik.values.dtend}
          setDate={(newDate) => tripFormik.setFieldValue('dtend', newDate)}
          mode={'date'}
          error={Boolean(tripFormik.errors.dtend)}
          width='40%'
        />
      </View>
      <Button
        title='Salvar'
        onPress={tripFormik.submitForm}
      />
    </View>
  );
}