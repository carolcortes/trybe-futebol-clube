import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { Response } from 'superagent';
import App from '../app';
import Match from '../database/models/Match';
import matches, { incorrectIdMatch, matchesInProgress, newMatch, newMatchBody } from './mocks/matchesMocks';
import Token from '../auth/token';

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
    sinon.stub(Token, 'verify').resolves('token');

    chaiHttpResponse = await chai.request(app)
      .post('/matches')
      .send(newMatchBody)
      .set('Authorization', 'token');

    expect(chaiHttpResponse.status).to.be.equal(201);
  });

  it('Não é possivel criar uma nova partida com os campos incorretos', async () => {  
    sinon.stub(Match, 'create').resolves(newMatch as any);
    sinon.stub(Token, 'verify').resolves('token');

    chaiHttpResponse = await chai.request(app)
      .post('/matches')
      .send({ homeTeam: 1 })
      .set('Authorization', 'token');

    expect(chaiHttpResponse.status).to.be.equal(400);
  });

  it('Não é possivel criar uma nova partida para times com id inexistentes', async () => {  
    sinon.stub(Match, 'create').resolves(null as any);
    sinon.stub(Token, 'verify').resolves(null);

    chaiHttpResponse = await chai.request(app)
      .post('/matches')
      .send(incorrectIdMatch)
      .set('Authorization', 'token');

    expect(chaiHttpResponse.status).to.be.equal(404);
  });

  it('É possivel finalizar uma partida em andamento', async () => {
    sinon.stub(Match, 'findOne').resolves(matches[0] as any)
    sinon.stub(Match, 'update').resolves([ 1 ]);

    chaiHttpResponse = await chai.request(app).patch('/matches/1/finish');

    expect(chaiHttpResponse.status).to.be.equal(200);
  });

  it('Não é possivel finalizar uma partida com id inexistente', async () => {
    sinon.stub(Match, 'findOne').resolves(null)
    sinon.stub(Match, 'update').resolves([ 0 ]);

    chaiHttpResponse = await chai.request(app).patch('/matches/166/finish');

    expect(chaiHttpResponse.status).to.be.equal(404);
  });

  it('É possivel atualizar o placar de uma partida', async () => {
    sinon.stub(Match, 'findOne').resolves(matches[0] as any)
    sinon.stub(Match, 'update').resolves([ 1 ]);

    chaiHttpResponse = await chai.request(app).patch('/matches/1');

    expect(chaiHttpResponse.status).to.be.equal(200);
  });

  it('Retorna um erro na tentativa de atualizar uma partida com um time inexistente', async () => {
    sinon.stub(Match, 'findOne').resolves(null)
    sinon.stub(Match, 'update').resolves([ 0 ]);

    chaiHttpResponse = await chai.request(app).patch('/matches/166');

    expect(chaiHttpResponse.status).to.be.equal(404);
  });
});
