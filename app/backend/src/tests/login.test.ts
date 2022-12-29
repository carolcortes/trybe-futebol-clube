import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { Response } from 'superagent';
import App from '../app';
import Token from '../auth/token';
import User from '../database/models/User';
import user from './mocks/loginMocks';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Testes do endpoint /login', () => {
  let chaiHttpResponse: Response;

  afterEach(sinon.restore);

  it('Request com email e password válidos', async () => {
    sinon.stub(User, 'findOne').resolves(user as User);
    sinon.stub(Token, 'create').resolves('token');
  
    const userRequest = { email: 'user@user.com', password: 'secret_user' };

    chaiHttpResponse = await chai.request(app).post('/login').send(userRequest);

    expect(chaiHttpResponse.status).to.be.equal(200);
  });

  it('Request com email e password inválidos', async () => {
    sinon.stub(User, 'findOne').resolves(null);
  
    const userRequest = { email: 'invalid@invalid.com', password: 'secret_invalid' };

    chaiHttpResponse = await chai.request(app).post('/login').send(userRequest);

    expect(chaiHttpResponse.status).to.be.equal(401);
    expect(chaiHttpResponse.body.message).to.be.equal("Incorrect email or password");
  });

  it('Request com email e sem password', async () => {
    const userRequest = { email: 'invalid@invalid.com' };

    chaiHttpResponse = await chai.request(app).post('/login').send(userRequest);

    expect(chaiHttpResponse.status).to.be.equal(400);
    expect(chaiHttpResponse.body.message).to.be.equal("All fields must be filled");
  });
});

describe('Testes do endpoint /login/validate', () => {
  let chaiHttpResponse: Response;

  afterEach(sinon.restore);

  it('Request com token válido', async () => {
    sinon.stub(User, 'findOne').resolves(user.role as any);
    sinon.stub(Token, 'verify').resolves('user@user.com');
  
    chaiHttpResponse = await chai.request(app).get('/login/validate');

    expect(chaiHttpResponse.status).to.be.equal(200);
  });
});

