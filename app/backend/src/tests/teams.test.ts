import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { Response } from 'superagent';
import App from '../app';
import Team from '../database/models/Team';
import teams from '../router/TeamsRouter';
import { team } from './mocks/teamsMocks';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Testes do endpoint /teams', () => {
  let chaiHttpResponse: Response;

  afterEach(sinon.restore);

  it('O endpoint /teams retorna todos os times', async () => {  
    sinon.stub(Team, 'findAll').resolves(teams as unknown as Team[]);

    chaiHttpResponse = await chai.request(app).get('/teams');

    expect(chaiHttpResponse.status).to.be.equal(200);
  });

  it('O endpoint /teams/id retorna o time com id informado', async () => {  
    sinon.stub(Team, 'findOne').resolves(team as any);

    chaiHttpResponse = await chai.request(app).get('/teams/1');

    expect(chaiHttpResponse.status).to.be.equal(200);
  });
});
