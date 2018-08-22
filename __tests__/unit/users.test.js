import mock from 'mockingoose';
const User = require('../../models/user');

const convertToJsonString = (doc) => {
  return JSON.parse(JSON.stringify(doc));
};

describe('Unit test for API', () => {
	beforeAll(async () => {
    await mock.resetAll();
    await jest.clearAllMocks();
	});

  describe('Model User', () => {
    describe('Validate fields', () => {
      const defaultUser = {
        name: 'Test User',
        description: 'test@test.com'
      };

      it('Should validate a new doc', () => {
        const _doc = new User(defaultUser);

        return _doc.validate().then(() => {
          expect(_doc.toObject()).toHaveProperty('_id');
          expect(_doc.toObject()).toHaveProperty('name');
          expect(_doc.toObject()).toHaveProperty('description');
          expect(_doc.toObject()).toHaveProperty('created_at');
          expect(_doc.toObject()).toHaveProperty('updated_at');
        });
      });
    });

    describe('CRUD test of my model', () => {
      const defaultUser = [{
        _id: '5b7cadd6a449bc0a1052f7be',
        name: 'Test',
        description: 'Testing description',
        created_at: new Date(),
        updated_at: new Date()
      }];

      it('Should return a list of docs', () => {
        mock.User.toReturn(defaultUser, 'find');

        return User.find().then((doc) => {
          expect(convertToJsonString(doc)).toMatchObject(convertToJsonString(defaultUser));
        });
      });

      it('Should return a doc', () => {
        mock.User.toReturn(defaultUser[0], 'findOne');

        return User.findById({ _id: defaultUser[0]._id}).then((doc) => {
          expect(convertToJsonString(doc)).toMatchObject(convertToJsonString(defaultUser[0]));
        });
      });

      // it('Should return a doc updated', () => {
      //   mock.User.toReturn(defaultUser[0], 'update');
      //
      //   return User.update({ name: 'changed' }).where({ _id: defaultUser[0]._id}).then((doc) => {
      //     expect(convertToJsonString(doc)).toMatchObject(convertToJsonString(defaultUser[0]));
      //   })
      // });
    });
  });
});
