const User = require('../../../models/user');

describe('Unit test for API', () => {
	beforeAll(async () => {
		database = await require('../../../config/database');
	});

  describe('Model User', () => {
		const defaultUser = {
			name: 'Test User',
			description: 'test@test.com',
			created_at: Date.now,
			updated_at: Date.now
		};

    // beforeEach(async (done) => {
    //   await User.delete();
    //   await User.save(defaultUser);
		// 	done();
    // });

    describe('Get all users: getAll()', () => {
      it('Should return a list of users', () => {
        const defaultUser = [defaultUser];

        return User.getAll().then((result) => {
          expect(result).to.be.eql(defaultUsers);
        });
      });
    });
  });
});
