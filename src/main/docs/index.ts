import paths from './paths'
import components from './components'
import schemas from './schemas'

export default {
  openapi: '3.0.0',
  info: {
    title: 'Finance - App para acompanhamento de investimento pessoal',
    description: 'Essa é a documentação da API feita pelo Eduardo',
    version: '1.0.0',
    contact: {
      name: 'Edu Souza',
      email: 'eduardomail@gmail.com',
      url: 'www.linkedin.com/in/edu-souza-tech-lider'
    },
    license: {
      name: 'GPL-3.0-or-later',
      url: 'https://spdx.org/licenses/GPL-3.0-or-later.html'
    }
  },
  servers: [{
    url: '/api',
    description: 'Servidor Principal'
  }],
  tags: [{
    name: 'Login',
    description: 'APIs relacionadas a Login'
  }, {
    name: 'Broker',
    description: 'APIs relacionadas ao gerenciamento de corretoras de valores'
  }],
  paths,
  schemas,
  components
}
