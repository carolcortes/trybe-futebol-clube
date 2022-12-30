import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { Response } from 'superagent';
import App from '../app';
import Team from '../database/models/Team';
import teams from './mocks/teamsMocks';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Testes do endpoint /login', () => {
  let chaiHttpResponse: Response;

  afterEach(sinon.restore);

  it('Retorna a classificação de todos os times', async () => {
    sinon.stub(Team, 'findAll').resolves(teams as Team[]);
  
    chaiHttpResponse = await chai.request(app).get('/leaderboard');

    expect(chaiHttpResponse.status).to.be.equal(200);
  });

  it('Retorna a classificação dos times da casa', async () => {
    sinon.stub(Team, 'findAll').resolves(teams as Team[]);
  
    chaiHttpResponse = await chai.request(app).get('/leaderboard/home');

    expect(chaiHttpResponse.status).to.be.equal(200);
  });

  it('Retorna a classificação dos times visitantes', async () => {
    sinon.stub(Team, 'findAll').resolves(teams as Team[]);
  
    chaiHttpResponse = await chai.request(app).get('/leaderboard/away');

    expect(chaiHttpResponse.status).to.be.equal(200);
  });

  it('Teste de erro', async () => {
    sinon.stub(Team, 'findAll').resolves(null as any);
  
    chaiHttpResponse = await chai.request(app).get('/leaderboard/away');

    expect(chaiHttpResponse.status).to.be.equal(500);
  });

  it('Teste de erro', async () => {
    sinon.stub(Team, 'findAll').resolves(null as any);
  
    chaiHttpResponse = await chai.request(app).get('/leaderboard');

    expect(chaiHttpResponse.status).to.be.equal(500);
  });
});
