import Ajv, { type DefinedError, type Options as AjvOptions, type SchemaObject } from 'ajv';
import ajvErrors from 'ajv-errors';
import addFormats from 'ajv-formats';
import localize from 'ajv-i18n/localize/ru';
import { toNestErrors, validateFieldsNatively } from '@hookform/resolvers';
import { appendErrors } from 'react-hook-form';
import type { FieldError, FieldValues, Resolver } from 'react-hook-form';

type AjvError = DefinedError | {
  keyword: 'errorMessage';
  instancePath: string;
  message?: string;
  params: { errors: DefinedError[] };
};

function parseErrorSchema(errors: AjvError[], validateAllFieldCriteria: boolean) {
  const parsedErrors: Record<string, FieldError> = Object.create(null);

  const reduceError = (error: DefinedError) => {
    if (error.keyword === 'required') {
      error.instancePath += `/${error.params.missingProperty}`;
    }

    const path = error.instancePath.substring(1).replace(/\//g, '.');

    if (!parsedErrors[path]) {
      parsedErrors[path] = { message: error.message, type: error.keyword };
    }

    if (validateAllFieldCriteria) {
      const types = parsedErrors[path].types;
      const messages = types && types[error.keyword];

      parsedErrors[path] = appendErrors(
        path,
        validateAllFieldCriteria,
        parsedErrors,
        error.keyword,
        messages ? ([] as string[]).concat(messages as string[], error.message || '') : error.message,
      ) as FieldError;
    }
  };

  for (const error of errors) {
    if (error.keyword === 'errorMessage') {
      error.params.errors.forEach((originalError) => {
        originalError.message = error.message;
        reduceError(originalError);
      });
    } else {
      reduceError(error);
    }
  }

  return parsedErrors;
}

export function ajvResolverRu<T extends FieldValues>(schema: SchemaObject, schemaOptions?: AjvOptions): Resolver<T> {
  const ajv = new Ajv({ allErrors: true, validateSchema: true, ...schemaOptions });

  ajvErrors(ajv);
  addFormats(ajv);

  const validate = ajv.compile(schema);

  return async (values, _context, options) => {
    const valid = validate(values);

    if (options.shouldUseNativeValidation) {
      validateFieldsNatively({}, options);
    }

    if (valid) {
      return { values, errors: {} };
    }

    const errors = validate.errors as AjvError[];
    const nativeErrors = errors.filter((error) => error.keyword !== 'errorMessage') as DefinedError[];

    if (nativeErrors.length) {
      localize(nativeErrors);
    }

    return {
      values: {},
      errors: toNestErrors(
        parseErrorSchema(errors, !options.shouldUseNativeValidation && options.criteriaMode === 'all'),
        options,
      ),
    };
  };
}
