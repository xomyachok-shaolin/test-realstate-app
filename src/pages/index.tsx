import React from 'react';
import { Formik, Form } from 'formik';
import { 
  Box, 
  Heading, 
  Button, 
  Image, 
  VStack, 
  Container, 
  Text 
} from '@chakra-ui/react';
import { FormikInput, FormikCheckbox, FormikRadioGroup } from '../components/FormikFields';
import validationSchema from '../validation/validationSchema';

interface FormValues {
  name: string;
  address: string;
  floor: number | '';
  totalFloors: number | '';
  square: number | '';
  livingSquare: number | '';
  kitchenSquare: number | '';
  propertyType: string;
  hasParking: boolean;
}

const initialValues: FormValues = {
  name: '',
  address: '',
  floor: '',
  totalFloors: '',
  square: '',
  livingSquare: '',
  kitchenSquare: '',
  propertyType: '',
  hasParking: false,
};

const Home: React.FC = () => {
  return (
    <Box bgGradient="linear(to-r, blue.50, blue.100)" minH="100vh" py={10}>
      <Container maxW="md" bg="white" p={8} borderRadius="md" boxShadow="lg">
        <VStack spacing={4} align="stretch">
          <Box textAlign="center">
            <Image src="/logo.png" alt="Логотип" mx="auto" boxSize="80px" mb={4}/>
            <Heading as="h1" size="lg" mb={2}>Оцените Ваш Объект Недвижимости</Heading>
            <Text fontSize="sm" color="gray.600">
              Заполните форму, чтобы получить точную оценку
            </Text>
          </Box>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              console.log('Submitted values: ', values);
              alert('Форма успешно отправлена!');
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <FormikInput name="name" label="Название объекта" placeholder="Например: Квартира на Пушкина" />
                <FormikInput name="address" label="Адрес" placeholder="Город, Улица, Дом" />
                <FormikInput name="floor" label="Этаж" type="number" placeholder="Напр. 5" />
                <FormikInput name="totalFloors" label="Количество этажей в доме" type="number" placeholder="Напр. 10" />
                <FormikInput name="square" label="Общая площадь" type="number" placeholder="м²" />
                <FormikInput name="livingSquare" label="Жилая площадь" type="number" placeholder="м²" />
                <FormikInput name="kitchenSquare" label="Площадь кухни" type="number" placeholder="м²" />

                <FormikRadioGroup
                  name="propertyType"
                  label="Тип недвижимости"
                  options={[
                    { label: 'Квартира', value: 'apartment' },
                    { label: 'Дом', value: 'house' },
                  ]}
                />

                <FormikCheckbox name="hasParking" label="Наличие парковки" />

                <Button
                  type="submit"
                  colorScheme="blue"
                  width="full"
                  mt={4}
                  isLoading={isSubmitting}
                >
                  Отправить
                </Button>
              </Form>
            )}
          </Formik>
        </VStack>
      </Container>
    </Box>
  );
};

export default Home;