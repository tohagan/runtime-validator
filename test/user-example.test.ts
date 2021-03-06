import {Validator, tString, tNumber, tBoolean, tObject} from '../src/index';

describe('validate data as User interface', () => {
  interface User {
    firstname: string;
    lastname: string;
    age: number;
    active: boolean;
  }

  const validUser: any = {
    firstname: 'John',
    lastname: 'Doe',
    age: 99,
    active: false
  };

  const invalidUser: any = {
    firstname: 'John',
    lastName: 'Doe', // invalid camelCase
    age: 99,
    active: false
  };

  const userValidator: Validator<User> = tObject({
    firstname: tString(),
    lastname: tString(),
    age: tNumber(),
    active: tBoolean()
  });

  it('successfuly passes through the valid user object', () => {
    expect(userValidator.check(validUser)).toEqual({
      ok: true,
      result: validUser
    });
  });

  it('fails when a required key is missing', () => {
    const error = userValidator.check(invalidUser);
    expect(error).toMatchObject({
      ok: false,
      error: {at: 'input', message: "the key 'lastname' is required but was not present"}
    });
  });
});
