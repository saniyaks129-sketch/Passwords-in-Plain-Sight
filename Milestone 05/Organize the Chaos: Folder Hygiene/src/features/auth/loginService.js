export const loginUser = async (credentials) => {
  console.log('Logging in user with credentials:', credentials);
  return {
    success: true,
    user: {
      id: 1,
      email: credentials.email,
      name: 'Test User',
    },
  };
};