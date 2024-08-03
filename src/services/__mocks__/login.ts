export const mockLogin = vi.fn().mockResolvedValue({ token: 'mock_token' });

const loginService = {
  login: mockLogin,
};

export default loginService;