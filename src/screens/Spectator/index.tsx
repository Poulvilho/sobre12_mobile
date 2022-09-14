import React, { useCallback, useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { useContract } from '../../contexts/contract';

import CustomButton from '../../components/CustomButton';
import CustomTextInput from '../../components/CustomTextInput';
import GuestItem from '../../components/GuestItem';
import { Text, View } from '../../components/Themed';

import {
  CreateSpectator,
  DeleteSpectator,
  GetSpectators,
  ISpectator,
  ISpectatorForm,
} from './api';
import { styles } from './styles';

export default function Spectator() {
  const { contract } = useContract();

  const [spectators, setSpectators] = useState<Array<ISpectator>>();

  const LoadSpectators = useCallback(async () => {
    await GetSpectators(contract!.id, contract!.guest).then((response) => {
      setSpectators(response.data);
    });
  }, [contract]);

  const handleSubmit = (async (values: ISpectatorForm) => {
    await CreateSpectator(values);
  });

  const spectatorFormik = useFormik<ISpectatorForm>({
    initialValues: {
      email: '',
      trip: contract!.id,
      spectated: contract!.guest,
    },
    validationSchema: Yup.object({
      email: Yup.string().required('Insira um email!')
        .email('Insira um email no formato correto'),
    }),
    onSubmit: handleSubmit,
  });

  useEffect(() => {
    LoadSpectators();
  }, [LoadSpectators]);

  return (
    <View style={styles.container}>
      <FlatList
        data={spectators}
        renderItem={({item}) => (
          <GuestItem
            key={item.spectator.id}
            name={item.spectator.name}
            icon={'user'}
            email={item.spectator.email}
            phone={''}
            onPressDelete={() =>
              DeleteSpectator(contract!.id, contract!.guest, item.spectator.id)
            }
          />
        )}
        keyExtractor={({spectator}: ISpectator) => spectator.id }
      />
      {contract!.role < 2 && (
        <>
          <Text style={styles.title}>Adicionar espectador</Text>
          <CustomTextInput
            title='Email'
            fieldName='email'
            formikHelpers={spectatorFormik}
            width='80%'
            mode='outlined'
          />
          <CustomButton
            title='Salvar'
            onPress={spectatorFormik.submitForm}
          />
        </>
      )}
    </View>
  );
}
