const gql = require('graphql-tag');
const { ApolloServer } = require('apollo-server');

const typeDefs = gql`
  """
  Test test one two
  """
  union # same as interface but no common fields
  Footwear =
      Sneaker
    | Boot

  enum ShoeType {
    JORDAN
    NIKE
    ADIDDAS
  }
  type User {
    email: String!
    avatar: String!
    shoes: [Shoes]!
  }

  interface Shoes {
    brand: ShoeType!
    size: Int!
    user: User!
  }

  type Sneaker implements Shoes {
    brand: ShoeType!
    size: Int!
    sport: String
    user: User!
  }

  type Boot implements Shoes {
    brand: ShoeType!
    size: Int!
    hasGrip: Boolean!
    user: User!
  }

  input ShoesInput {
    brand: ShoeType
    size: Int
  }

  type Query {
    me: User!
    friends: [User]!
    shoes(input: ShoesInput): [Shoes]
  }

  input NewShoeInput {
    brand: ShoeType!
    size: Int!
  }

  type Mutation {
    newShoe(input: NewShoeInput!): Shoes!
  }
`;

const user ={   id: 1,
    email: 'mo.atef@masters.com',
    avatar: 'http:yoda.png',
    shoes: [],}


    const shoes =[
        { brand: 'JORDAN', size: '12', sport: 'Basketball', user: 1 },
        { brand: 'NIKE', size: '13', hasGrip: true, user: 1 },
      ];
const resolvers = {
  Query: {
    me() {
      return user
    },
    shoes(_, { input }) {
      console.log(input);

      return shoes
    },
  },

  Mutation: {
    newShoe(_, { input }) {
      return input;
    },
  },

  Shoes: {
    __resolveType(shoes) {
      if (shoes.sport) return 'Sneaker';
      return 'Boot';
    },
  },

  Sneaker:{
    user(shoe){
        return user
      }
  },

  Boot:{
    user(shoe){
        return user
      }
  }
 
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen(6969).then(() => console.log('Server Running...'));
