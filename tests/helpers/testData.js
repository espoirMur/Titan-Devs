import faker from "faker";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import constants from "../../helpers/constants";

dotenv.config();

const { ACCEPTED, INTERNAL_SERVER_ERROR } = constants;
const newArticle = {
  body:
    "Sections 1.10.32 and 1.10.33 from 'de Finibus Bonorum et Malorum' by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.",
  description: "I'm your romeo could you be my juliet?",
  title: "Senior software developer",
  tagsList: ["music", "politics", "love"]
};
const newComment = {
  body: "I like this article however, You should rename the title"
};

const users = {
  dummyUser: {
    email: "luc.bayo@gmail.com",
    password: "password",
    username: "luc2017"
  },
  dummyUser2: {
    email: "fake.email@gmail.com",
    password: "password",
    username: "jean786786"
  },
  dummyUser3: {
    email: "fabrice.niyomwungeri@andela.com",
    password: "password98",
    username: "fabrice92"
  },
  dummyUser4: {
    email: "me@example.com",
    password: "password",
    username: "luc2018"
  },
  dummyUser5: {
    profile: {
      bio: "I am a software developer",
      image: "image-link",
      firstName: "YvesIraguha",
      lastName: "Iraguha",
      gender: "Male",
      phone: "07836378367373",
      address: "Kigali city"
    }
  },
  dummyUser6: {
    profile: {
      bio: "I am a software developer",
      image: "image-link",
      firstName: " ",
      lastName: " ",
      gender: "Male",
      phone: "07836378367373",
      address: "Kigali city"
    }
  },
  dummyUser7: {
    profile: {
      bio: "I am a software developer",
      image: "image-link",
      following: "false"
    }
  },
  dummyUser8: {
    profile: {
      bio: "I am a software developer",
      image: "image-link",
      following: "false"
    }
  }
};

const tokenEmailVerication = {
  invalidToken:
    "eyJhbGciOiJIUzJpZCI6ImI5ZjZjN2JiLWM1NTItNDUyNS04MTUwLWI0NTI5NjNkMTZiZiIsImlhdCI6MTU1MDAwODA4Mn0.xCpwywFSzqHXbikot0SzS8fUpPKsqMVMtgmpf4OD_l8",
  wrongToken:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU0MzM0YTA4LTMyMWEtNDdhYS1iMGVmLTQ5ODZmMWYyN2Q0OSIsImlhdCI6MTU1MDA1MzIzN30.O2QZO576DJ-iLc1ge7yU-jHdoAlQq9CK9Kc6QGqRuid",
  mutatedToken: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdG5hbWUiOiJZdmVzIiwibGFzdG5hbWUiOiJJcmFndWhhIiwiSWQiOiJhc3NhZGFmYWRhaGZhaGRhaGRhaCIsImlhdCI6MTU1MTE5NDI0NX0.
  BD3GY0JypL9E0B3kgh0ps3m2CJv_8UXMfz_-SI92nCE`,
  noUser: jwt.sign(
    {
      email: "yves.iraguha@gmail.com",
      id: "a934b3c4-9593-4455-b08e-c82de23ed165",
      username: "YvesIraguha"
    },
    process.env.SECRET_KEY
  )
};

const sendGridResponse = [
  {
    statusCode: ACCEPTED,
    headers: {
      server: "nginx",
      date: "Mon, 18 Feb 2019 10:21:11 GMT",
      "content-type": "text/plain; charset=utf-8",
      "content-length": "0",
      connection: "close",
      "x-message-id": "IP2o4bUMSCafkr95SVicWg",
      "access-control-allow-origin": "https://sendgrid.api-docs.io",
      "access-control-allow-methods": "POST",
      "access-control-allow-headers":
        "Authorization, Content-Type, On-behalf-of, x-sg-elas-acl",
      "access-control-max-age": "600",
      "x-no-cors-reason": "https://sendgrid.com/docs/Classroom/Basics/API/cors.html"
    },
    request: {
      uri: {
        protocol: "https:",
        slashes: true,
        auth: null,
        host: "api.sendgrid.com",
        port: 443,
        hostname: "api.sendgrid.com",
        hash: null,
        search: null,
        query: null,
        pathname: "/v3/mail/send",
        path: "/v3/mail/send",
        href: "https://api.sendgrid.com/v3/mail/send"
      },
      method: "POST",
      headers: {
        Accept: "application/json",
        "User-agent": "sendgrid/6.3.0;nodejs",
        Authorization: process.env.SENDGRID_API_KEY,
        "content-type": "application/json",
        "content-length": 2500
      }
    }
  },
  null
];
const article = {
  title: faker.lorem.words(15),
  description: faker.lorem.words(50),
  body: faker.lorem.words(INTERNAL_SERVER_ERROR)
};
const roleTestData = {
  validRole: {
    name: "AUTHOR",
    description: "writer"
  },
  validRoleAdmin: {
    name: "ADMINN",
    description: "Administrator"
  },
  validRole2: {
    name: "Anonymous",
    description: "Administrator"
  },
  invalidRole: {
    description: "writer"
  },
  noAlphabeticRoleDesc: {
    name: "ADMIN",
    description: 93989
  },
  noAlphabeticRoleName: {
    name: 4895,
    description: "Administrator"
  }
};
const invalidPermissionObject = {
  invalidPermission: {},
  invalidPermission2: {
    resource: 4895
  }
};
const permissionObjects = [
  {
    resource: "articles",
    createPermission: true,
    readPermission: true,
    updatePermission: true,
    deletePermission: true
  },
  {
    resource: "users",
    createPermission: true,
    readPermission: true,
    updatePermission: true,
    deletePermission: true
  },
  {
    resource: "profiles",
    createPermission: true,
    readPermission: true,
    updatePermission: true,
    deletePermission: true
  },
  {
    resource: "permissions",
    createPermission: true,
    readPermission: true,
    updatePermission: true,
    deletePermission: true
  },
  {
    resource: "roles",
    createPermission: true,
    readPermission: true,
    updatePermission: true,
    deletePermission: true
  },
  {
    resource: "auth",
    createPermission: true,
    readPermission: true,
    updatePermission: true,
    deletePermission: true
  },
  {
    resource: "test",
    createPermission: true,
    readPermission: true,
    updatePermission: true,
    deletePermission: true
  }
];

const fakeId = "71840433-e8e4-48dd-89d1-b0a91258da58";
const testUIID = {
  invalidUUID: "08ecefad-4822-4b49-9b4e-101f873d75a7"
};
export {
  newArticle,
  newComment,
  users,
  tokenEmailVerication,
  sendGridResponse,
  article,
  fakeId,
  testUIID,
  roleTestData,
  permissionObjects,
  invalidPermissionObject
};
