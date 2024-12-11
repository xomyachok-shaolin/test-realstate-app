// src/__tests__/FormikRadioGroup.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Formik, Form } from 'formik';
import { FormikRadioGroup } from '../components/FormikFields';
import * as Yup from 'yup';
import '@testing-library/jest-dom';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '../styles/theme'; // Импорт вашей темы

interface FormValues {
  propertyType: string;
}

const validationSchema = Yup.object({
  propertyType: Yup.string().required('Поле обязательно для заполнения'),
});

const initialValues: FormValues = {
  propertyType: '',
};

describe('FormikRadioGroup Component', () => {
  test('renders radio buttons correctly', () => {
    render(
      <ChakraProvider theme={theme}>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={() => {}}>
          <Form>
            <FormikRadioGroup
              name="propertyType"
              label="Тип недвижимости"
              options={[
                { label: 'Квартира', value: 'apartment' },
                { label: 'Дом', value: 'house' },
              ]}
            />
          </Form>
        </Formik>
      </ChakraProvider>
    );

    expect(screen.getByText('Тип недвижимости')).toBeInTheDocument();
    expect(screen.getByLabelText('Квартира')).toBeInTheDocument();
    expect(screen.getByLabelText('Дом')).toBeInTheDocument();
  });

  test('updates Formik state on radio selection', () => {
    const handleSubmit = jest.fn();

    render(
      <ChakraProvider theme={theme}>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
          {({ values }) => (
            <Form>
              <FormikRadioGroup
                name="propertyType"
                label="Тип недвижимости"
                options={[
                  { label: 'Квартира', value: 'apartment' },
                  { label: 'Дом', value: 'house' },
                ]}
              />
              <button type="submit">Submit</button>
              <div data-testid="current-value">{values.propertyType}</div>
            </Form>
          )}
        </Formik>
      </ChakraProvider>
    );

    // Проверяем начальное состояние
    expect(screen.getByTestId('current-value')).toHaveTextContent('');

    // Выбираем "Квартира"
    fireEvent.click(screen.getByLabelText('Квартира'));
    expect(screen.getByTestId('current-value')).toHaveTextContent('apartment');

    // Выбираем "Дом"
    fireEvent.click(screen.getByLabelText('Дом'));
    expect(screen.getByTestId('current-value')).toHaveTextContent('house');
  });

  test('displays validation error when not selected', async () => {
    render(
      <ChakraProvider theme={theme}>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={() => {}}>
          {({ handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <FormikRadioGroup
                name="propertyType"
                label="Тип недвижимости"
                options={[
                  { label: 'Квартира', value: 'apartment' },
                  { label: 'Дом', value: 'house' },
                ]}
              />
              <button type="submit">Submit</button>
            </Form>
          )}
        </Formik>
      </ChakraProvider>
    );

    fireEvent.click(screen.getByText('Submit'));

    expect(await screen.findByText('Поле обязательно для заполнения')).toBeInTheDocument();
  });
});
