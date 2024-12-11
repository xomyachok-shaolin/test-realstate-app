// src/__tests__/FormikCheckbox.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import { Formik, Form } from 'formik';
import { FormikCheckbox } from '../components/FormikFields';
import * as Yup from 'yup';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '../styles/theme';

interface FormValues {
  hasParking: boolean;
}

const validationSchema = Yup.object({
  hasParking: Yup.boolean(),
});

const initialValues: FormValues = {
  hasParking: false,
};

describe('FormikCheckbox Component', () => {
  test('updates Formik state on checkbox toggle using userEvent', async () => {
    const user = userEvent.setup();
    const handleSubmit = jest.fn();

    render(
      <ChakraProvider theme={theme}>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
          {({ values }) => (
            <Form>
              <FormikCheckbox name="hasParking" label="Наличие парковки" />
              <button type="submit">Submit</button>
              <div data-testid="current-value">{values.hasParking ? 'true' : 'false'}</div>
            </Form>
          )}
        </Formik>
      </ChakraProvider>
    );

    // Проверяем начальное состояние
    expect(screen.getByTestId('current-value')).toHaveTextContent('false');

    // Включаем чекбокс
    await user.click(screen.getByLabelText('Наличие парковки'));
    expect(screen.getByTestId('current-value')).toHaveTextContent('true');

    // Выключаем чекбокс
    await user.click(screen.getByLabelText('Наличие парковки'));
    expect(screen.getByTestId('current-value')).toHaveTextContent('false');
  });
});
