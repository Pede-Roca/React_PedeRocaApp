# Tarefas de Melhorias como Avaliação [11/06/2024] 
(As Sugestões de Códigos São Geradas para guiar exemplos não são implementações prontas. As utilize como guias de introdução)

## Tarefas de Melhoria para o Projeto 'Pede-Roca/React_PedeRocaApp'

### Tarefas de Melhoria e Novas Funcionalidades para o Projeto 'Pede-Roca/React_PedeRocaApp'

#### Departamento de Produtos e Implementações

#### Tarefa 1: Atualizar o Estilo dos Formulários (3 pontos)
**Descrição**: Atualizar o estilo dos formulários para utilizar componentes do Bootstrap, proporcionando uma interface de usuário mais consistente e profissional.

**Exemplo de Código**:
```jsx
// Instalar Bootstrap via npm
npm install bootstrap

// Importar Bootstrap no arquivo principal de estilos (ex: index.js)
import 'bootstrap/dist/css/bootstrap.min.css';

// Atualizar um formulário existente para utilizar classes Bootstrap
<form>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" id="email" placeholder="name@example.com" />
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
```

#### Tarefa 2: Adicionar Ícones de Feedback nos Formulários (3 pontos)
**Descrição**: Implementar ícones de feedback para campos de formulário válidos ou inválidos, melhorando a experiência do usuário.

**Exemplo de Código**:
```jsx
import { Form } from 'react-bootstrap';

const MyForm = () => (
  <Form>
    <Form.Group controlId="formBasicEmail">
      <Form.Label>Email address</Form.Label>
      <Form.Control type="email" placeholder="Enter email" isInvalid={false} />
      <Form.Control.Feedback type="invalid">
        Please provide a valid email.
      </Form.Control.Feedback>
    </Form.Group>
  </Form>
);
```

#### Tarefa 3: Melhorar a Navegação com BreadCrumbs (3 pontos)
**Descrição**: Adicionar navegação com breadcrumbs para melhorar a experiência do usuário em termos de navegação e contexto.

**Exemplo de Código**:
```jsx
import { Breadcrumb } from 'react-bootstrap';

const BreadcrumbComponent = () => (
  <Breadcrumb>
    <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
    <Breadcrumb.Item href="/section">Section</Breadcrumb.Item>
    <Breadcrumb.Item active>Current Page</Breadcrumb.Item>
  </Breadcrumb>
);
```

#### Tarefa 4: Implementar Login com Redes Sociais (8 pontos)
**Descrição**: Adicionar opções de login com Google e Facebook utilizando Firebase Authentication.

**Exemplo de Código**:
```jsx
import { getAuth, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";

const auth = getAuth();
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

const signInWithGoogle = () => {
  signInWithPopup(auth, googleProvider)
    .then((result) => {
      const user = result.user;
      console.log(user);
    })
    .catch((error) => {
      console.error(error);
    });
};

const signInWithFacebook = () => {
  signInWithPopup(auth, facebookProvider)
    .then((result) => {
      const user = result.user;
      console.log(user);
    })
    .catch((error) => {
      console.error(error);
    });
};

// Botões de login com Google e Facebook
<button onClick={signInWithGoogle}>Login com Google</button>
<button onClick={signInWithFacebook}>Login com Facebook</button>
```

#### Tarefa 5: Refatorar Componentes com Styled-Components (13 pontos)
**Descrição**: Refatorar componentes para usar a biblioteca Styled-Components, melhorando a modularidade e manutenção do CSS.

**Exemplo de Código**:
```jsx
// Instalar styled-components
npm install styled-components

// Usar styled-components
import styled from 'styled-components';

const Button = styled.button`
  background-color: #4CAF50;
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
`;

const MyComponent = () => (
  <Button>Click Me</Button>
);
```

#### Tarefa 6: Implementar Sistema de Claims de Usuário (21 pontos)
**Descrição**: Adicionar sistema de claims de usuário para diferenciar níveis de acesso dentro da aplicação utilizando Firebase Authentication.

**Exemplo de Código**:
```jsx
// Função no backend para definir claims de usuário
const admin = require('firebase-admin');
admin.auth().setCustomUserClaims(uid, { admin: true });

// Função no frontend para verificar claims
const checkAdmin = async () => {
  const user = firebase.auth().currentUser;
  if (user) {
    const idTokenResult = await user.getIdTokenResult();
    if (idTokenResult.claims.admin) {
      // Acesso permitido
    } else {
      // Acesso negado
    }
  }
};
```

#### Tarefa 7: Configurar Firebase Hosting e Deploy com GitHub Actions (21 pontos)
**Descrição**: Configurar Firebase Hosting para hospedar a aplicação e usar GitHub Actions para automação de deploy contínuo.

**Exemplo de Código**:
```yaml
# .github/workflows/firebase-hosting-pull-request.yml
name: Firebase Hosting Pull Request

'on':
  push:
    branches:
      - main

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - run: npm install
      - run: npm run build
      - run: npm install -g firebase-tools
      - run: firebase deploy --only hosting --token ${{ secrets.FIREBASE_TOKEN }}
```

#### Tarefa 8: Implementar Funcionalidade de Upload de Arquivos (34 pontos)
**Descrição**: Adicionar suporte para upload de arquivos, utilizando Firebase Storage para armazenar os arquivos enviados pelos usuários.

**Exemplo de Código**:
```jsx
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const storage = getStorage();

const uploadFile = (file) => {
  const storageRef = ref(storage, 'uploads/' + file.name);
  const uploadTask = uploadBytesResumable(storageRef, file);

  uploadTask.on('state_changed', 
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
    }, 
    (error) => {
      console.error(error);
    }, 
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        console.log('File available at', downloadURL);
      });
    }
  );
};

// Exemplo de uso
const handleFileChange = (e) => {
  const file = e.target.files[0];
  uploadFile(file);
};
```

#### Tarefa 9: Implementar Sistema de Notificações com Firebase Cloud Messaging (34 pontos)
**Descrição**: Adicionar suporte a notificações push para melhorar a comunicação com os usuários, utilizando Firebase Cloud Messaging.

**Exemplo de Código**:
```jsx
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const messaging = getMessaging();

getToken(messaging, { vapidKey: 'YOUR_VAPID_KEY' }).then((currentToken) => {
  if (currentToken) {
    console.log('Token:', currentToken);
  } else {
    console.warn('No registration token available');
  }
}).catch((err) => {
  console.error('An error occurred while retrieving token', err);
});

onMessage(messaging, (payload) => {
  console.log('Message received. ', payload);
  // Mostrar notificação ao usuário
});
```

#### Tarefa 10: Desenvolver Painel de Administração com Visualização de Dados (55 pontos)
**Descrição**: Criar um painel de administração que permita visualizar dados importantes e realizar ações administrativas, utilizando Firestore para gerenciamento de dados.

**Exemplo de Código**:
```jsx
import React, { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs } from "firebase/firestore";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const db = getFirestore();

  useEffect(() => {
    const fetchUsers = async () => {
      const usersCollection = collection(db, 'users');
      const usersSnapshot = await getDocs(usersCollection);
      const usersList = usersSnapshot.docs.map(doc => doc.data());
      setUsers(usersList);
    };
    fetchUsers();
  }, [db]);

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name} - {user.email}</li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
```

#### Tarefa 11: Melhorar a Legibilidade dos Textos (3 pontos)
**Descrição**: Ajustar a tipografia dos textos para melhorar a legibilidade utilizando classes do Bootstrap.

**Exemplo de Código**:
```jsx
<div className="container">
  <h1 className="display-4">Título Principal</h1>
  <p className="lead">Este é um texto exemplo para melhorar a legibilidade.</p>
</div>
```

#### Tarefa 12: Adicionar Feedback Visual em Botões de Ação (3 pontos)
**Descrição**: Implementar feedback visual nos botões de ação, como mudanças de cor ao clicar, utilizando classes do Bootstrap.

**Exemplo de Código**:
```jsx
<button className="btn btn-primary" onMouseDown={(e) => e.target.classList.add('btn-dark')} onMouseUp={(e) => e.target.classList.remove('btn-dark')}>
  Clique Aqui
</button>
```

#### Tarefa 13: Melhorar a Responsividade dos Componentes de Navegação (3 pontos)
**Descrição**: Ajustar os componentes de navegação para serem totalmente responsivos em dispositivos móveis e tablets.

**Exemplo de Código**:
```jsx
<nav className="navbar navbar-expand-lg navbar-light bg-light">
  <a className="navbar-brand" href="#">Navbar</a>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarNav">
    <ul className="navbar-nav">
      <li className="nav-item active">
        <a className="nav-link" href="#">Home</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="#">Features</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="#">Pricing</a>
      </li>
    </ul>
  </div>
</nav>
```

#### Tarefa 14: Implementar Proteção de Rotas com Auth Guard (8 pontos)
**Descrição**: Proteger rotas específicas da aplicação, permitindo o acesso apenas a usuários autenticados.

**Exemplo de Código**:
```jsx
import { Navigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';

const ProtectedRoute = ({ children }) => {
  const auth = getAuth();
  const user = auth.currentUser;

  return user ? children : <Navigate to="/login" />;
};

// Exemplo de uso
<Route path="/protected" element={<ProtectedRoute><ProtectedComponent /></ProtectedRoute>} />
```

#### Tarefa 15: Adicionar Autenticação com LinkedIn (13 pontos)
**Descrição**: Adicionar suporte para login com LinkedIn utilizando Firebase Authentication.

**Exemplo de Código**:
```jsx
import { getAuth, signInWithPopup, OAuthProvider } from "firebase/auth";

const auth = getAuth();
const provider = new OAuthProvider('linkedin.com');

const signInWithLinkedIn = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      console.log(user);
    })
    .catch((error) => {
      console.error(error);
    });
};

// Botão de login com LinkedIn
<button onClick={signInWithLinkedIn}>Login com LinkedIn</button>
```

#### Tarefa 16: Implementar Monitoramento de Eventos com Google Analytics (21 pontos)
**Descrição**: Adicionar Google Analytics para monitorar eventos e interações dos usuários na aplicação.

**Exemplo de Código**:
```jsx
import ReactGA from 'react-ga';

// Inicializar Google Analytics
ReactGA.initialize('UA-000000-01');

// Rastrear página
ReactGA.pageview(window.location.pathname + window.location.search);

// Rastrear evento
const handleButtonClick = () => {
  ReactGA.event({
    category: 'User',
    action: 'Clicked Button'
  });
};

// Exemplo de uso
<button onClick={handleButtonClick}>Clique Aqui</button>
```

#### Tarefa 17: Implementar Integração com Stripe para Pagamentos (21 pontos)
**Descrição**: Adicionar suporte para pagamentos utilizando a API da Stripe.

**Exemplo de Código**:
```jsx
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe('your-publishable-key-here');

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const result = await stripe.createToken(elements.getElement(CardElement));

    if (result.error) {
      console.log(result.error.message);
    } else {
      console.log(result.token);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe}>Pagar</button>
    </form>
  );
};

// Exemplo de uso
const App = () => (
  <Elements stripe={stripePromise}>
    <CheckoutForm />
  </Elements>
);

export default App;
```

#### Tarefa 18: Adicionar Relatórios Personalizados com Firebase Analytics (34 pontos)
**Descrição**: Implementar relatórios personalizados utilizando Firebase Analytics para rastrear comportamentos específicos dos usuários.

**Exemplo de Código**:
```jsx
import { getAnalytics, logEvent } from "firebase/analytics";

const analytics = getAnalytics();

const trackCustomEvent = () => {
  logEvent(analytics, 'select_content', {
    content_type: 'image',
    content_id: 'P09QJ4HTP6'
  });
};

// Exemplo de uso
<button onClick={trackCustomEvent}>Track Event</button>
```

#### Tarefa 19: Desenvolver Funcionalidade de Chat em Tempo Real (34 pontos)
**Descrição**: Adicionar uma funcionalidade de chat em tempo real utilizando Firebase Firestore para armazenar e sincronizar as mensagens.

**Exemplo de Código**:
```jsx
import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, onSnapshot, query, orderBy } from 'firebase/firestore';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const db = getFirestore();

  useEffect(() => {
    const q = query(collection(db, 'messages'), orderBy('timestamp'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const messages = [];
      querySnapshot.forEach((doc) => {
        messages.push(doc.data());
      });
      setMessages(messages);
    });
    return () => unsubscribe();
  }, [db]);

  const handleSendMessage = async () => {
    await addDoc(collection(db, 'messages'), {
      text: newMessage,
      timestamp: new Date()
    });
    setNewMessage('');
  };

  return (
    <div>
      <div>
        {messages.map((message, index) => (
          <p key={index}>{message.text}</p>
        ))}
      </div>
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
};

export default Chat;
```

#### Tarefa 20: Implementar Testes de Integração com Cypress (55 pontos)
**Descrição**: Adicionar testes de integração utilizando Cypress para garantir que todas as funcionalidades da aplicação estejam funcionando corretamente.

**Exemplo de Código**:
```javascript
// Instalar Cypress
npm install cypress --save-dev

// Criar um arquivo de teste com Cypress
describe('Login Flow', () => {
  it('should allow a user to log in', () => {
    cy.visit('/login');
    cy.get('input[name=email]').type('user@example.com');
    cy.get('input[name=password]').type('password');
    cy.get('button[type=submit]').click();
    cy.url().should('include', '/dashboard');
  });
});

// Executar os testes
npx cypress open
```

#### Tarefa 21: Adicionar Placeholder Animado nos Campos de Entrada (3 pontos)
**Descrição**: Implementar placeholders animados nos campos de entrada para melhorar a experiência do usuário.

**Exemplo de Código**:
```jsx
// Adicionar animação de placeholder
<input type="text" className="form-control" placeholder="Digite seu nome" required />
<style>
  .form-control::placeholder {
    animation: fadein 1s infinite alternate;
  }
  @keyframes fadein {
    from { opacity: 0.5; }
    to { opacity: 1; }
  }
</style>
```

#### Tarefa 22: Implementar Tooltip Customizado em Campos de Entrada (3 pontos)
**Descrição**: Adicionar tooltips customizados em campos de entrada para fornecer dicas adicionais ao usuário.

**Exemplo de Código**:
```jsx
import { Tooltip, OverlayTrigger } from 'react-bootstrap';

const renderTooltip = (props) => (
  <Tooltip id="input-tooltip" {...props}>
    Digite seu email no formato correto.
  </Tooltip>
);

const InputWithTooltip = () => (
  <OverlayTrigger placement="right" overlay={renderTooltip}>
    <input type="email" className="form-control" placeholder="Email" />
  </OverlayTrigger>
);
```

#### Tarefa 23: Melhorar a Exibição de Erros no Formulário (3 pontos)
**Descrição**: Melhorar a exibição de mensagens de erro nos formulários, utilizando componentes do Bootstrap.

**Exemplo de Código**:
```jsx
<Form.Group controlId="formBasicPassword">
  <Form.Label>Password</Form.Label>
  <Form.Control type="password" placeholder="Password" isInvalid={true} />
  <Form.Control.Feedback type="invalid">
    A senha deve ter pelo menos 8 caracteres.
  </Form.Control.Feedback>
</Form.Group>
```

#### Tarefa 24: Implementar Redefinição de Senha (8 pontos)
**Descrição**: Adicionar funcionalidade de redefinição de senha para usuários, utilizando Firebase Authentication.

**Exemplo de Código**:
```jsx
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

const auth = getAuth();

const handlePasswordReset = (email) => {
  sendPasswordResetEmail(auth, email)
    .then(() => {
      console.log('Email de redefinição de senha enviado.');
    })
    .catch((error) => {
      console.error('Erro ao enviar email de redefinição de senha:', error);
    });
};

// Exemplo de uso
<button onClick={() => handlePasswordReset('user@example.com')}>Redefinir Senha</button>
```

#### Tarefa 25: Adicionar Suporte para Login com GitHub (13 pontos)
**Descrição**: Implementar autenticação com GitHub utilizando Firebase Authentication.

**Exemplo de Código**:
```jsx
import { getAuth, signInWithPopup, GithubAuthProvider } from "firebase/auth";

const auth = getAuth();
const provider = new GithubAuthProvider();

const signInWithGithub = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      console.log(user);
    })
    .catch((error) => {
      console.error(error);
    });
};

// Botão de login com GitHub
<button onClick={signInWithGithub}>Login com GitHub</button>
```

#### Tarefa 26: Implementar Logs de Auditoria com Firestore (21 pontos)
**Descrição**: Adicionar logs de auditoria para rastrear ações importantes dos usuários utilizando Firestore.

**Exemplo de Código**:
```jsx
import { getFirestore, collection, addDoc } from "firebase/firestore";

const db = getFirestore();

const logUserAction = async (action) => {
  try {
    await addDoc(collection(db, 'userActions'), {
      action: action,
      timestamp: new Date()
    });
  } catch (e) {
    console.error("Erro ao adicionar log de ação: ", e);
  }
};

// Exemplo de uso
logUserAction('User logged in');
```

#### Tarefa 27: Configurar CI/CD com GitHub Actions para Testes Automatizados (21 pontos)
**Descrição**: Configurar GitHub Actions para rodar testes automatizados em cada push para a branch principal.

**Exemplo de Código**:
```yaml
# .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v2
    - name: Set up Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '14'
    - run: npm install
    - run: npm test
```

#### Tarefa 28: Implementar Feedback Visual em Tempo Real com Firestore (34 pontos)
**Descrição**: Adicionar feedback visual em tempo real para atualizações de dados, utilizando Firestore e React.

**Exemplo de Código**:
```jsx
import React, { useState, useEffect } from 'react';
import { getFirestore, collection, onSnapshot } from "firebase/firestore";

const RealTimeUpdates = () => {
  const [data, setData] = useState([]);
  const db = getFirestore();

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'collectionName'), (snapshot) => {
      const updatedData = snapshot.docs.map(doc => doc.data());
      setData(updatedData);
    });
    return () => unsubscribe();
  }, [db]);

  return (
    <div>
      <h1>Dados em Tempo Real</h1>
      <ul>
        {data.map((item, index) => (
          <li key={index}>{item.fieldName}</li>
        ))}
      </ul>
    </div>
  );
};

export default RealTimeUpdates;
```

#### Tarefa 29: Adicionar Funcionalidade de Carrossel de Imagens (34 pontos)
**Descrição**: Implementar um carrossel de imagens para exibição de banners ou galerias.

**Exemplo de Código**:
```jsx
import { Carousel } from 'react-bootstrap';

const ImageCarousel = () => (
  <Carousel>
    <Carousel.Item>
      <img className="d-block w-100" src="image1.jpg" alt="First slide" />
      <Carousel.Caption>
        <h3>First slide label</h3>
        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
      </Carousel.Caption>
    </Carousel.Item>
    <Carousel.Item>
      <img className="d-block w-100" src="image2.jpg" alt="Second slide" />
      <Carousel.Caption>
        <h3>Second slide label</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </Carousel.Caption>
    </Carousel.Item>
    <Carousel.Item>
      <img className="d-block w-100" src="image3.jpg" alt="Third slide" />
      <Carousel.Caption>
        <h3>Third slide label</h3>
        <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
      </Carousel.Caption>
    </Carousel.Item>
  </Carousel>
);

export default ImageCarousel;
```

#### Tarefa 30: Desenvolver Relatórios de Uso com Gráficos (55 pontos)
**Descrição**: Criar relatórios de uso com gráficos interativos, utilizando bibliotecas como Chart.js e dados do Firestore.

**Exemplo de Código**:
```jsx
import React, { useState, useEffect } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { Chart } from 'react-chartjs-2';

const UsageReports = () => {
  const [chartData, setChartData] = useState({});
  const db = getFirestore();

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, 'usageData'));
      const data = querySnapshot.docs.map(doc => doc.data());
      
      const labels = data.map(d => d.date);
      const values = data.map(d => d.value);

      setChartData({
        labels: labels,
        datasets: [
          {
            label: 'Usage Data',
            data: values,
            backgroundColor: 'rgba(75,192,192,0.6)',
            borderColor: 'rgba(75,192,192,1)',
            borderWidth: 1,
          }
        ]
      });
    };

    fetchData();
  }, [db]);

  return (
    <div>
      <h2>Relatórios de Uso</h2>
      <Chart
        type='bar'
        data={chartData}
        options={{
          responsive: true,
          scales: {
            x: { beginAtZero: true },
            y: { beginAtZero: true }
          }
        }}
      />
    </div>
  );
};

export default UsageReports;
```

#### Tarefa 31: Melhorar a Experiência do Usuário com Animações de Transição (3 pontos)
**Descrição**: Adicionar animações de transição suaves entre as páginas utilizando a biblioteca `react-transition-group`.

**Exemplo de Código**:
```jsx
// Instalar react-transition-group
npm install react-transition-group

import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './transitions.css';

const PageTransition = ({ children }) => (
  <TransitionGroup>
    <CSSTransition
      timeout={300}
      classNames="fade"
    >
      {children}
    </CSSTransition>
  </TransitionGroup>
);

export default PageTransition;

/* transitions.css */
.fade-enter {
  opacity: 0;
}
.fade-enter-active {
  opacity: 1;
  transition: opacity 300ms;
}
.fade-exit {
  opacity: 1;
}
.fade-exit-active {
  opacity: 0;
  transition: opacity 300ms;
}
```

#### Tarefa 32: Adicionar Scroll Infinito para Listas (3 pontos)
**Descrição**: Implementar scroll infinito para listas longas utilizando a biblioteca `react-infinite-scroll-component`.

**Exemplo de Código**:
```jsx
// Instalar react-infinite-scroll-component
npm install react-infinite-scroll-component

import InfiniteScroll from 'react-infinite-scroll-component';

const InfiniteList = ({ items, fetchMoreData }) => (
  <InfiniteScroll
    dataLength={items.length}
    next={fetchMoreData}
    hasMore={true}
    loader={<h4>Loading...</h4>}
  >
    {items.map((item, index) => (
      <div key={index}>{item}</div>
    ))}
  </InfiniteScroll>
);

export default InfiniteList;
```

#### Tarefa 33: Melhorar o Layout com Grid Responsivo (3 pontos)
**Descrição**: Melhorar o layout da aplicação utilizando o sistema de grid responsivo do Bootstrap.

**Exemplo de Código**:
```jsx
<div className="container">
  <div className="row">
    <div className="col-md-4">Coluna 1</div>
    <div className="col-md-4">Coluna 2</div>
    <div className="col-md-4">Coluna 3</div>
  </div>
</div>
```

#### Tarefa 34: Implementar Suporte a Notificações por Email (8 pontos)
**Descrição**: Adicionar funcionalidade para enviar notificações por email aos usuários utilizando Firebase Functions e um serviço de email como SendGrid.

**Exemplo de Código**:
```javascript
// Firebase Function para enviar email
const functions = require('firebase-functions');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(functions.config().sendgrid.key);

exports.sendEmailNotification = functions.firestore.document('notifications/{id}')
  .onCreate((snap, context) => {
    const data = snap.data();
    const msg = {
      to: data.email,
      from: 'noreply@example.com',
      subject: data.subject,
      text: data.message,
    };
    return sgMail.send(msg);
  });
```

#### Tarefa 35: Adicionar Autenticação Multifator (13 pontos)
**Descrição**: Implementar autenticação multifator (MFA) para aumentar a segurança da aplicação utilizando Firebase Authentication.

**Exemplo de Código**:
```jsx
import { getAuth, multiFactor, PhoneMultiFactorGenerator } from "firebase/auth";

const auth = getAuth();

const enableMFA = async () => {
  const user = auth.currentUser;
  const session = await multiFactor(user).getSession();
  const phoneInfoOptions = {
    phoneNumber: '+1234567890',
    session,
  };
  const phoneAuthProvider = new PhoneMultiFactorGenerator();
  const verificationId = await phoneAuthProvider.verify(phoneInfoOptions);
  const verificationCode = window.prompt('Please enter the verification code that was sent to your mobile device.');
  const credential = PhoneMultiFactorGenerator.credential(verificationId, verificationCode);
  await multiFactor(user).enroll(credential, 'My personal phone number');
  console.log('MFA enabled');
};

// Exemplo de uso
<button onClick={enableMFA}>Enable MFA</button>
```

#### Tarefa 36: Implementar Upload de Imagens com Pré-visualização (21 pontos)
**Descrição**: Adicionar funcionalidade de upload de imagens com pré-visualização utilizando Firebase Storage.

**Exemplo de Código**:
```jsx
import { useState } from 'react';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const ImageUpload = () => {
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");
  const storage = getStorage();

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    const storageRef = ref(storage, `images/${image.name}`);
    uploadBytes(storageRef, image).then(() => {
      getDownloadURL(storageRef).then((url) => {
        setUrl(url);
      });
    });
  };

  return (
    <div>
      <input type="file" onChange={handleImageChange} />
      <button onClick={handleUpload}>Upload</button>
      {url && <img src={url} alt="Uploaded image" />}
    </div>
  );
};

export default ImageUpload;
```

#### Tarefa 37: Implementar Analytics Personalizados com Firebase (21 pontos)
**Descrição**: Adicionar eventos de analytics personalizados utilizando Firebase Analytics para rastrear interações específicas do usuário.

**Exemplo de Código**:
```jsx
import { getAnalytics, logEvent } from "firebase/analytics";

const analytics = getAnalytics();

const trackCustomEvent = () => {
  logEvent(analytics, 'custom_event', {
    item_id: 'item123',
    item_name: 'Item Name',
    content_type: 'image'
  });
};

// Exemplo de uso
<button onClick={trackCustomEvent}>Track Custom Event</button>
```

#### Tarefa 38: Implementar Funcionalidade de Comentários (34 pontos)
**Descrição**: Adicionar funcionalidade de comentários em posts utilizando Firestore para armazenar e sincronizar os comentários.

**Exemplo de Código**:
```jsx
import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, onSnapshot, query, orderBy } from 'firebase/firestore';

const Comments = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const db = getFirestore();

  useEffect(() => {
    const q = query(collection(db, `posts/${postId}/comments`), orderBy('timestamp'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const comments = [];
      querySnapshot.forEach((doc) => {
        comments.push(doc.data());
      });
      setComments(comments);
    });
    return () => unsubscribe();
  }, [db, postId]);

  const handleSendComment = async () => {
    await addDoc(collection(db, `posts/${postId}/comments`), {
      text: newComment,
      timestamp: new Date()
    });
    setNewComment('');
  };

  return (
    <div>
      <div>
        {comments.map((comment, index) => (
          <p key={index}>{comment.text}</p>
        ))}
      </div>
      <input
        type="text"
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
      />
      <button onClick={handleSendComment}>Enviar</button>
    </div>
  );
};

export default Comments;
```

#### Tarefa 39: Adicionar Funcionalidade de Pesquisa Avançada (34 pontos)
**Descrição**: Implementar uma funcionalidade de pesquisa avançada para permitir que os usuários filtrem e encontrem conteúdo facilmente.

**Exemplo de Código**:
```jsx
import { useState } from 'react';

const AdvancedSearch = ({ items }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);

  const handleSearch = () => {
    const results = items.filter(item => 
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredItems(results);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Pesquisar..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch}>Pesquisar</button>
      <ul>
        {filteredItems.map((item, index) => (
          <li key={index}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default AdvancedSearch;
```

#### Tarefa 40: Desenvolver Painel de Controle para Administradores (55 pontos)
**Descrição**: Criar um painel de controle completo para administradores, permitindo a gestão de usuários e conteúdo da aplicação, integrando com Firestore.

**Exemplo de Código**:
```jsx
import React, { useState, useEffect

 } from 'react';
import { getFirestore, collection, getDocs, doc, deleteDoc } from 'firebase/firestore';

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const db = getFirestore();

  useEffect(() => {
    const fetchUsers = async () => {
      const querySnapshot = await getDocs(collection(db, 'users'));
      const usersData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setUsers(usersData);
    };
    fetchUsers();
  }, [db]);

  const handleDeleteUser = async (userId) => {
    await deleteDoc(doc(db, 'users', userId));
    setUsers(users.filter(user => user.id !== userId));
  };

  return (
    <div>
      <h1>Admin Panel</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.name} - {user.email}
            <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPanel;
```
