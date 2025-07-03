import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LocalJobsScreen from './LocalJobsScreen';
import ResumeScreen from './ResumeScreen';
import ResumeEditScreen from './ResumeEditScreen';
import CareerAddScreen from './CareerAddScreen';
import EducationAddScreen from './EducationAddScreen';
import CertificateAddScreen from './CertificateAddScreen';
import StrengthAddScreen from './StrengthAddScreen';

const Stack = createStackNavigator();

export default function LocalJobsStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="LocalJobsMain" component={LocalJobsScreen} />
      <Stack.Screen name="Resume" component={ResumeScreen} />
      <Stack.Screen name="ResumeEdit" component={ResumeEditScreen} />
      <Stack.Screen name="CareerAdd" component={CareerAddScreen} />
      <Stack.Screen name="EducationAdd" component={EducationAddScreen} />
      <Stack.Screen name="CertificateAdd" component={CertificateAddScreen} />
      <Stack.Screen name="StrengthAdd" component={StrengthAddScreen} />
    </Stack.Navigator>
  );
}