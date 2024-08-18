import { generateJwtToken, verifyJwtToken } from '@services/tokenJwt.service';

describe('Verifica se o token esta sendo gerado', () => {
  it('Gerar um token', () => {
    const token = generateJwtToken('1');

    expect(typeof token).toEqual('string');
  });

  it('Verifica o token', () => {
    const token = generateJwtToken('1');
    const result = verifyJwtToken(token);

    expect(typeof result).toBe('object');
  });
});
