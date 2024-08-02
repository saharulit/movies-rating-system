import { API_BASE_URL } from './consts';

export class LoginService {
  private readonly API_URL = `${API_BASE_URL}/api/admin`;
  private readonly LOGIN_URL = `${this.API_URL}/login`;

  async login(
    username: string = 'test',
    password: string = 'test123'
  ): Promise<string> {
    const response = await fetch(this.LOGIN_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

    const data = await response.json();
    return data.token;
  }
}

export default new LoginService();
