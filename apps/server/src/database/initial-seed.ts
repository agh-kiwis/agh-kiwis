// This is used for storing seeding data
export const InitialSeed = {
  email: 'email@gmail.com',
  password: process.env.INITIAL_SEED_PASSWORD || 'password1234',

  categories: ['Sleep', 'Meals', 'Sport', 'Study', 'Hobby', 'Other'],
  colors: ['#0088E1', '#DCA11D', '#9D507C', '#6D67E4', '#1EA896', '#006471'],
};
