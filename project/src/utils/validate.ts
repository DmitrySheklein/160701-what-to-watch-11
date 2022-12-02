import Joi from 'joi';

const LoginSchema = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'ru'] } })
    .error(new Error('Please enter a valid email address'))
    .required(),
  password: Joi.string()
    .min(3)
    .max(10)
    .pattern(new RegExp(/^(?=.*[0-9]).{1,}$/))
    .pattern(new RegExp(/^(?=.*[a-zA-Zа-яё]).{1,}$/))
    .error((errors) => {
      for (const item of errors) {
        const {
          code,
          local: { limit },
        } = item;

        if (code === 'string.min') {
          return new Error(`Please enter min ${limit} symbol`);
        }
        if (code === 'string.max') {
          return new Error(`Please enter max ${limit} symbol`);
        }
        if (code === 'string.pattern.base') {
          return new Error('Please enter at least one number and one symbol');
        }
      }
      return new Error('Please enter a valid password');
    }),
});

export { LoginSchema };