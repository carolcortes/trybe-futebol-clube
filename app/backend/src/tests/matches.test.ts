import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { Response } from 'superagent';
import App from '../app';
import Match from '../database/models/Match';
import matches, { matchesInProgress, newMatch, newMatchBody } from './mocks/matchesMocks';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Testes do endpoint /matches', () => {
  let chaiHttpResponse: Response;

  afterEach(sinon.restore);

  it('O endpoint /matches retorna todas as partidas', async () => {  
    sinon.stub(Match, 'findAll').resolves(matches as unknown as Match[]);

    chaiHttpResponse = await chai.request(app).get('/matches');

    expect(chaiHttpResponse.status).to.be.equal(200);
  });

  it('O endpoint /matches?inProgress=true retorna todas as partidas em andamento', async () => {  
    sinon.stub(Match, 'findAll').resolves(matchesInProgress as unknown as Match[]);

    chaiHttpResponse = await chai.request(app).get('/matches?inProgress=true');

    expect(chaiHttpResponse.status).to.be.equal(200);
  });

  it('O endpoint /matches?inProgress=false retorna todas as partidas finalizadas', async () => {  
    sinon.stub(Match, 'findAll').resolves(matchesInProgress as unknown as Match[]);

    chaiHttpResponse = await chai.request(app).get('/matches?inProgress=false');

    expect(chaiHttpResponse.status).to.be.equal(200);
  });

  it('É possivel criar uma nova partida com os campos corretos', async () => {  
    sinon.stub(Match, 'create').resolves(newMatch as any);

    chaiHttpResponse = await chai.request(app).post('/matches').send(newMatchBody);

    expect(chaiHttpResponse.status).to.be.equal(201);
  });

  it('Não é possivel criar uma nova partida com os campos incorretos', async () => {  
    sinon.stub(Match, 'create').resolves(newMatch as any);

    chaiHttpResponse = await chai.request(app).post('/matches').send({ homeTeam: 1 });

    expect(chaiHttpResponse.status).to.be.equal(400);
  });
});
