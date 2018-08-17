const expect = require('expect.js');
const { createSeller } = require('../../../services/seller');
const models = require('../../../models');

const testEmail = 'test@test.com';

describe('seller service', () => {
  before(() => {
    return models.seller.destroy({
      where: {
        email: testEmail
      }
    });
  });

  it('create seller', async () => {
    const seller = {
      email: testEmail,
      latitude: 1,
      longitude: 2,
      password: '123',
    };

    const expected = {
      gender: 'male',
      isActive: true,
      email: testEmail,
      latitude: 1,
      longitude: 2
    };

    const s = await createSeller(seller);
    for (let key in expected) {
      expect(s[key]).equal(expected[key]);
    }
  });
});
