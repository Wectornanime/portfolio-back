import { User } from '@models/User';

test('it should be ok', () => {
    const user = new User();

    user.name = 'Tester';

    expect(user.name).toEqual('Tester');
});
