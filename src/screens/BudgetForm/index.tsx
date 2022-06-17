import { useNavigation } from '@react-navigation/core';
import { useFormik } from 'formik';
import React from 'react';
import * as Yup from 'yup';

import CustomButton from '../../components/CustomButton';
import CustomDateTimePicker from '../../components/CustomDatePicker';
import CustomTextInput from '../../components/CustomTextInput';
import { Text, View } from '../../components/Themed';
import { useContract } from '../../contexts/contract';

import { CreateBudget, IBudgetForm } from './api';
import { styles } from './styles';

export default function BudgetForm() {
  const { navigate } = useNavigation();
  const { contract } = useContract();

  const handleSubmit = (async (values: IBudgetForm) => {
    await CreateBudget(values).then(() => {
      navigate('Budget');
    });
  });

  const budgetFormik = useFormik<IBudgetForm>({
    initialValues: {
      description: '',
      value: 0.0,
      dtbudget: new Date(),
      trip: contract.id,
    },
    validationSchema: Yup.object({
      description: Yup.string().required('Insira um nome!'),
      value: Yup.number().required('Insira um valor!'),
    }),
    onSubmit: handleSubmit,
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Adicionar Orçamento</Text>
      <CustomTextInput
        title='Descrição'
        fieldName='description'
        formikHelpers={budgetFormik}
        width='80%'
        mode='outlined'
      />
      <CustomTextInput
        title='Valor'
        fieldName='value'
        formikHelpers={budgetFormik}
        width='80%'
        mode='outlined'
        keyboardType='numeric'
      />
      <CustomDateTimePicker
        date={budgetFormik.values.dtbudget}
        setDate={(newDate) => budgetFormik.setFieldValue('dtbudget', newDate)}
        mode={'date'}
        error={Boolean(budgetFormik.errors.dtbudget)}
        width='80%'
      />
      <CustomButton
        title='Salvar'
        onPress={budgetFormik.submitForm}
      />
    </View>
  );
}
