import faker from 'faker';
import bcrypt from 'bcrypt';

export default {
  firstUser: {
    username: 'amala',
    firstname: 'eba',
    lastname: 'iyan',
    email: faker.internet.email(),
    password: 'amalaiyan',
    roleId: 1
  },
  secondUser: {
    username: faker.internet.userName(),
    firstname: faker.name.findName(),
    lastname: faker.name.findName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    roleId: 2,
  },
  thirdUser: {
    username: faker.internet.userName(),
    firstname: faker.name.findName(),
    lastname: faker.name.findName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    roleId: 2,
  },
  privateDocument: {
    title: 'private document',
    content: 'private document2',
    access: 'private',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  roleDocument: {
    title: 'check role document',
    content: 'check role document1',
    access: 'role',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  sampleDocument: {
    title: faker.lorem.words(),
    content: faker.lorem.paragraph(),
    userId: 1,
    userRoleId: 1,
    access: 'public',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  TestUser1: {
    username: 'TheGuy',
    firstname: 'Fellow',
    lastname: 'Andela',
    email: 'testuser@dms.com',
    password: bcrypt.hashSync('Andela', bcrypt.genSaltSync(10)),
    roleId: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  TestUser2: {
    username: faker.internet.userName(),
    firstname: faker.name.findName(),
    lastname: faker.name.findName(),
    email: faker.internet.email(),
    password: bcrypt.hashSync('alpine', bcrypt.genSaltSync(10)),
    roleId: 2,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  TestUser3: {
    username: 'Amhere',
    firstname: 'Never',
    lastname: 'Wecan',
    email: 'newuserr@dms.com',
    password: 'Andela',
  },
  invalidUserDetails: {
    username: faker.internet.userName(),
    firstname: faker.name.findName(),
    lastname: faker.name.findName(),
    email: 'myemail@yahoo',
    password: faker.internet.password(),
    roleId: 2
  },
  TestRole: {
    title: 'Fellow',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  admin: {
    email: 'admin@dms.com',
    password: 'adminuser'
  },
  regularUser: {
    email: 'user@dms.com',
    password: 'amaladudu'
  },
  regularUser2: {
    email: 'ama@la.com',
    password: 'amala'
  }
};
