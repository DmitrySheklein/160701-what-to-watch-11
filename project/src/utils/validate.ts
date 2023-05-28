import Joi from 'joi';

type TErrorReport = Omit<Joi.ErrorReport, 'local'> & {
  local: { limit: number };
};

const AddCommentSchema = Joi.object({
  rating: Joi.number().not(0).required(),
  text: Joi.string()
    .min(10)
    .max(400)
    .required()
    .error((errors) => {
      for (const item of errors) {
        const {
          code,
          local: { limit },
        } = item as TErrorReport;

        if (code === 'string.min') {
          return new Error(`Please enter min ${limit} symbol`);
        }
        if (code === 'string.max') {
          return new Error(`Please enter max ${limit} symbol`);
        }
      }
      return new Error('Please enter a text comment');
    }),
});

const LoginSchema = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'ru'] } })
    .error(new Error('Please enter a valid email address'))
    .required(),
  password: Joi.string()
    .min(3)
    .max(10)
    .pattern(/[0-9]/)
    .pattern(/[a-zA-Zа-яё]/)
    .error((errors) => {
      for (const item of errors) {
        const {
          code,
          local: { limit },
        } = item as TErrorReport;

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

export { LoginSchema, AddCommentSchema };
