import { UsersController } from '@controllers/users';

const user = new UsersController();

test('it should be ok', () => {
    expect(2).toEqual(2)
})