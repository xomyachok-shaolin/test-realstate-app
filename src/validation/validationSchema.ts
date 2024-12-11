import * as Yup from 'yup';

// Глобальные локали
Yup.setLocale({
  mixed: {
    required: 'Поле обязательно для заполнения',
  },
  number: {
    min: 'Значение не может быть меньше ${min}',
    max: 'Значение не может быть больше ${max}',
  },
});

// Кастомный метод для проверки суммы
Yup.addMethod(Yup.number, 'moreThanSumOfFields', function (fields: string[], message: string) {
  return this.test('more-than-sum', message, function (value) {
    const { parent } = this;
    const sum = fields.reduce((acc, field) => acc + (Number(parent[field]) || 0), 0);
    return typeof value === 'number' && value > sum;
  });
});

const validationSchema = Yup.object({
  name: Yup.string().required(),
  address: Yup.string().required(),
  floor: Yup.number().required().min(-1).test('floor-max', 'Значение не может быть больше количества этажей в доме', function (value) {
    const { totalFloors } = this.parent;
    return typeof value === 'number' && typeof totalFloors === 'number' ? value <= totalFloors : true;
  }),
  totalFloors: Yup.number().required().min(-3).max(200),
  livingSquare: Yup.number().required().min(0),
  kitchenSquare: Yup.number().required().min(0),
  square: Yup.number()
    .required()
    .min(0)
    .max(400)
    .moreThanSumOfFields(['livingSquare', 'kitchenSquare'], 'Общая площадь должна быть больше суммы жилой площади и площади кухни'),
  propertyType: Yup.string().required(),
  hasParking: Yup.boolean(),
});

export default validationSchema;
