import React from 'react';
import { useField } from 'formik';
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Checkbox,
  RadioGroup,
  Radio,
  Stack,
} from '@chakra-ui/react';

interface FormikInputProps {
  name: string;
  label?: string;
  type?: string;
  placeholder?: string;
}

export const FormikInput: React.FC<FormikInputProps> = ({ name, label, type='text', placeholder }) => {
  const [field, meta] = useField(name);

  return (
    <FormControl mb={4} isInvalid={!!meta.error && meta.touched}>
      {label && <FormLabel htmlFor={name}>{label}</FormLabel>}
      <Input 
        id={name} 
        type={type} 
        placeholder={placeholder} 
        variant="filled" 
        focusBorderColor="gold.500" 
        {...field} 
      />
      <FormErrorMessage>{meta.error}</FormErrorMessage>
    </FormControl>
  );
};

interface FormikCheckboxProps {
  name: string;
  label: string;
}

export const FormikCheckbox: React.FC<FormikCheckboxProps> = ({ name, label }) => {
  const [field, meta, helpers] = useField({ name, type: 'checkbox' });

  return (
    <FormControl mb={4} isInvalid={!!meta.error && meta.touched}>
      <Checkbox 
        isChecked={field.value} 
        onChange={(e) => helpers.setValue(e.target.checked)} 
        colorScheme="gold"
      >
        {label}
      </Checkbox>
      <FormErrorMessage>{meta.error}</FormErrorMessage>
    </FormControl>
  );
};

interface RadioOption {
  label: string;
  value: string;
}

interface FormikRadioGroupProps {
  name: string;
  label?: string;
  options: RadioOption[];
}

export const FormikRadioGroup: React.FC<FormikRadioGroupProps> = ({ name, label, options }) => {
  const [field, meta, helpers] = useField(name);

  return (
    <FormControl mb={4} isInvalid={!!meta.error && meta.touched}>
      {label && <FormLabel>{label}</FormLabel>}
      <RadioGroup
        value={field.value || ''}
        onChange={(val: string) => helpers.setValue(val)}
      >
        <Stack direction="row">
          {options.map((opt) => (
            <Radio key={opt.value} value={opt.value} colorScheme="gold">
              {opt.label}
            </Radio>
          ))}
        </Stack>
      </RadioGroup>
      <FormErrorMessage>{meta.error}</FormErrorMessage>
    </FormControl>
  );
};
