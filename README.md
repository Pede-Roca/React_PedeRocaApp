# Tarefas de Melhorias como Avaliação [11/06/2024] 
(As Sugestões de Códigos São Geradas para guiar exemplos não são implementações prontas. As utilize como guias de introdução)

## Tarefas de Melhoria para o Projeto 'Pede-Roca/React_PedeRocaApp'

#### Tarefa 1: Melhorar o Estilo dos Botões (3 pontos)
**Descrição**: Atualizar o estilo dos botões da aplicação para utilizar o Bootstrap, proporcionando um visual mais consistente e moderno.

**Exemplo de Código**:
```jsx
// Instalar Bootstrap via npm
npm install bootstrap

// Importar Bootstrap no arquivo principal de estilos (ex: index.js)
import 'bootstrap/dist/css/bootstrap.min.css';

// Atualizar um botão existente para utilizar as classes Bootstrap
<button className="btn btn-primary">Clique Aqui</button>
```

#### Tarefa 2: Adicionar Feedback Visual em Formulários (3 pontos)
**Descrição**: Implementar feedback visual para campos de formulário inválidos, melhorando a experiência do usuário ao preencher formulários.

**Exemplo de Código**:
```jsx
import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const MyForm = () => {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
  };

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" placeholder="Enter email" required />
        <Form.Control.Feedback type="invalid">
          Please provide a valid email.
        </Form.Control.Feedback>
      </Form.Group>
      <Button type="submit">Submit</Button>
    </Form>
  );
};

export default MyForm;
```

#### Tarefa 3: Centralizar o Conteúdo da Página Principal (3 pontos)
**Descrição**: Ajustar o layout da página principal para centralizar seu conteúdo horizontalmente e verticalmente.

**Exemplo de Código**:
```jsx
// Usar classes de Bootstrap para centralizar o conteúdo
<div className="d-flex justify-content-center align-items-center vh-100">
  <h1>Bem-vindo à Pede Roca</h1>
</div>
```

#### Tarefa 4: Implementar Autenticação com Google (8 pontos)
**Descrição**: Adicionar a opção de login com a conta do Google usando Firebase Authentication.

**Exemplo de Código**:
```jsx
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const auth = getAuth();
const provider = new GoogleAuthProvider();

const signInWithGoogle = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      // Sucesso no login
      const user = result.user;
      console.log(user);
    })
    .catch((error) => {
      // Tratamento de erros
      console.error(error);
    });
};

// Botão de login com Google
<button onClick={signInWithGoogle}>Login com Google</button>
```

#### Tarefa 5: Refatorar a Estrutura de Pastas do Projeto (13 pontos)
**Descrição**: Organizar os componentes e serviços em uma estrutura de pastas mais clara e intuitiva, facilitando a manutenção do código.

**Exemplo de Código**:
```bash
src/
|-- components/
|   |-- Button/
|   |   |-- Button.js
|   |   |-- Button.css
|   |-- Form/
|       |-- Form.js
|       |-- Form.css
|-- pages/
|   |-- HomePage/
|       |-- HomePage.js
|       |-- HomePage.css
|-- services/
|   |-- firebase.js
|-- App.js
|-- index.js
```

#### Tarefa 6: Implementar Controle de Acesso com Claims de Usuário (21 pontos)
**Descrição**: Utilizar custom claims do Firebase Authentication para controlar o acesso a diferentes partes da aplicação com base no tipo de usuário (ex: admin, usuário regular).

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

#### Tarefa 7: Adicionar Testes Unitários com Jest (21 pontos)
**Descrição**: Escrever testes unitários para componentes críticos da aplicação usando Jest, aumentando a cobertura de testes e garantindo a qualidade do código.

**Exemplo de Código**:
```jsx
// Exemplo de teste unitário com Jest
import { render, screen } from '@testing-library/react';
import MyComponent from './MyComponent';

test('renders learn react link', () => {
  render(<MyComponent />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
```

#### Tarefa 8: Melhorar a Performance da Aplicação com Lazy Loading (34 pontos)
**Descrição**: Implementar o carregamento preguiçoso (lazy loading) para componentes e rotas, reduzindo o tempo de carregamento inicial da aplicação.

**Exemplo de Código**:
```jsx
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const HomePage = lazy(() => import('./pages/HomePage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));

const App = () => (
  <Router>
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/about" component={AboutPage} />
      </Switch>
    </Suspense>
  </Router>
);

export default App;
```

#### Tarefa 9: Integrar Análise de Dados com Firebase Analytics (34 pontos)
**Descrição**: Configurar e integrar Firebase Analytics para monitorar o comportamento do usuário e métricas de uso da aplicação.

**Exemplo de Código**:
```jsx
import { getAnalytics, logEvent } from "firebase/analytics";

const analytics = getAnalytics();

const logPageView = (page) => {
  logEvent(analytics, 'page_view', { page_path: page });
};

// Chamar a função ao navegar para uma nova página
logPageView('/home');
```

#### Tarefa 10: Implementar Dashboard de Administração (55 pontos)
**Descrição**: Desenvolver uma visão de dashboard para administradores, permitindo a visualização e gestão de usuários e dados da aplicação.

**Exemplo de Código**:
```jsx
import React, { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs } from "firebase/firestore";

const Dashboard = () => {
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

export default Dashboard;
```

#### Tarefa 11: Melhorar a Responsividade dos Componentes (3 pontos)
**Descrição**: Ajustar os componentes para serem totalmente responsivos em dispositivos móveis e tablets.

**Exemplo de Código**:
```jsx
// Usar classes de Bootstrap para responsividade
<div className="container">
  <div className="row">
    <div className="col-md-6 col-sm-12">
      <h2>Responsivo</h2>
    </div>
  </div>
</div>
```

#### Tarefa 12: Adicionar Placeholder em Campos de Formulário (3 pontos)
**Descrição**: Inserir placeholders descritivos nos campos de formulário para melhorar a usabilidade.

**Exemplo de Código**:
```jsx
<Form.Group controlId="formBasicPassword">
  <Form.Label>Password</Form.Label>
  <Form.Control type="password" placeholder="Enter your password" required />
</Form.Group>
```

#### Tarefa 13: Customizar o Tema da Aplicação (3 pontos)
**Descrição**: Aplicar um tema customizado utilizando variáveis CSS ou uma biblioteca de temas.

**Exemplo de Código**:
```css
:root {
  --primary-color: #3498db;
  --secondary-color: #2ecc71;
}

body {
  background-color: var(--primary-color);
  color: white;
}
```

#### Tarefa 14: Implementar Logout Automático (8 pontos)
**Descrição**: Adicionar funcionalidade de logout automático após um período de inatividade.

**Exemplo de Código**:
```jsx
import { useEffect } from 'react';
import { getAuth, signOut } from "firebase/auth";

const useAutoLogout = () => {
  useEffect(() => {
    const timer = setTimeout(() => {
      const auth = getAuth();
      signOut(auth);
    }, 1800000); // 30 minutos

    return () => clearTimeout(timer);
  }, []);
};

export default useAutoLogout;
```

#### Tarefa 15: Adicionar Validação de Formulário com Formik (13 pontos)
**Descrição**: Utilizar a biblioteca Formik para adicionar validação aos formulários da aplicação.

**Exemplo de Código**:
```jsx
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const SignupForm = () => (
  <Formik
    initialValues={{ email: '', password: '' }}
    validationSchema={Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string().min(6, 'Must be 6 characters or more').required('Required')
    })}
    onSubmit={(values, { setSubmitting }) => {
      setTimeout(() => {
        console.log(values);
        setSubmitting(false);
      }, 400);
    }}
  >
    {({ isSubmitting }) => (
      <Form>
        <Field type="email" name="email" />
        <ErrorMessage name="email" component="div" />
        <Field type="password" name="password" />
        <ErrorMessage name="password" component="div" />
        <button type="submit" disabled={isSubmitting}>
          Submit
        </button>
      </Form>
    )}
  </Formik>
);
```

#### Tarefa 16: Implementar Notificações Push (21 pontos)
**Descrição**: Adicionar suporte a notificações push usando Firebase Cloud Messaging.

**Exemplo de Código**:
```jsx
import { getMessaging, getToken } from "firebase/messaging";

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
```

#### Tarefa 17: Implementar Recuperação de Senha (21 pontos)
**Descrição**: Adicionar funcionalidade para recuperação de senha via email utilizando Firebase Authentication.

**Exemplo de Código**:
```jsx
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

const auth = getAuth();

const handlePasswordReset = (email) => {
  sendPasswordResetEmail(auth, email)
    .then(() => {
      console.log('Password reset email sent');
    })
    .catch((error) => {
      console.error('Error sending password reset email', error);
    });
};

// Exemplo de uso
handlePasswordReset('user@example.com');
```

#### Tarefa 18: Adicionar Modo Escuro/Claro (34 pontos)
**Descrição**: Implementar a funcionalidade de alternância entre modo escuro e claro na aplicação.

**Exemplo de Código**:
```jsx
import { useState } from 'react';

const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={darkMode ? 'dark-mode' : 'light-mode'}>
      <button onClick={toggleDarkMode}>
        {darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      </button>
    </div>
  );
};

export default App;
```

#### Tarefa 19: Adicionar Logs de Auditoria com Firebase Functions (34 pontos)
**Descrição**: Implementar logs de auditoria para registrar ações importantes dos usuários utilizando Firebase Functions.

**Exemplo de Código**:
```javascript
// Firebase Function para registrar logs
const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.logUserAction = functions.firestore
  .document('users/{userId}/actions/{actionId}')
  .onCreate((snap, context) => {
    const newValue = snap.data();
    console.log(`User ${context.params.userId} performed action: `, newValue);
  });
```

#### Tarefa 20: Implementar Relatórios de Atividades de Usuário (55 pontos)
**Descrição**: Desenvolver uma visão de relatórios que mostra as atividades dos usuários, integrando com Firebase Firestore para coleta de dados.

**Exemplo de Código**:
```jsx
import React, { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs } from "firebase/firestore";

const ActivityReport = () => {
  const [activities, setActivities] = useState([]);
  const db = getFirestore();

  useEffect(() => {
    const fetchActivities = async () => {
      const activitiesCollection = collection(db, 'activities');
      const activitiesSnapshot = await getDocs(activitiesCollection);
      const activitiesList = activitiesSnapshot.docs.map(doc => doc.data());
      setActivities(activitiesList);
    };
    fetchActivities();
  }, [db]);

  return (
    <div>
      <h1>Activity Report</h1>
      <ul>
        {activities.map(activity => (
          <li key={activity.id}>{activity.user} - {activity.action}</li>
        ))}
      </ul>
    </div>
  );
};

export default ActivityReport;
```

### Novas Tarefas de Melhoria para o Projeto 'Pede-Roca/React_PedeRocaApp'

#### Tarefa 11: Melhorar a Responsividade dos Componentes (3 pontos)
**Descrição**: Ajustar os componentes para serem totalmente responsivos em dispositivos móveis e tablets.

**Exemplo de Código**:
```jsx
// Usar classes de Bootstrap para responsividade
<div className="container">
  <div className="row">
    <div className="col-md-6 col-sm-12">
      <h2>Responsivo</h2>
    </div>
  </div>
</div>
```

#### Tarefa 12: Adicionar Placeholder em Campos de Formulário (3 pontos)
**Descrição**: Inserir placeholders descritivos nos campos de formulário para melhorar a usabilidade.

**Exemplo de Código**:
```jsx
<Form.Group controlId="formBasicPassword">
  <Form.Label>Password</Form.Label>
  <Form.Control type="password" placeholder="Enter your password" required />
</Form.Group>
```

#### Tarefa 13: Customizar o Tema da Aplicação (3 pontos)
**Descrição**: Aplicar um tema customizado utilizando variáveis CSS ou uma biblioteca de temas.

**Exemplo de Código**:
```css
:root {
  --primary-color: #3498db;
  --secondary-color: #2ecc71;
}

body {
  background-color: var(--primary-color);
  color: white;
}
```

#### Tarefa 14: Implementar Logout Automático (8 pontos)
**Descrição**: Adicionar funcionalidade de logout automático após um período de inatividade.

**Exemplo de Código**:
```jsx
import { useEffect } from 'react';
import { getAuth, signOut } from "firebase/auth";

const useAutoLogout = () => {
  useEffect(() => {
    const timer = setTimeout(() => {
      const auth = getAuth();
      signOut(auth);
    }, 1800000); // 30 minutos

    return () => clearTimeout(timer);
  }, []);
};

export default useAutoLogout;
```

#### Tarefa 15: Adicionar Validação de Formulário com Formik (13 pontos)
**Descrição**: Utilizar a biblioteca Formik para adicionar validação aos formulários da aplicação.

**Exemplo de Código**:
```jsx
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const SignupForm = () => (
  <Formik
    initialValues={{ email: '', password: '' }}
    validationSchema={Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string().min(6, 'Must be 6 characters or more').required('Required')
    })}
    onSubmit={(values, { setSubmitting }) => {
      setTimeout(() => {
        console.log(values);
        setSubmitting(false);
      }, 400);
    }}
  >
    {({ isSubmitting }) => (
      <Form>
        <Field type="email" name="email" />
        <ErrorMessage name="email" component="div" />
        <Field type="password" name="password" />
        <ErrorMessage name="password" component="div" />
        <button type="submit" disabled={isSubmitting}>
          Submit
        </button>
      </Form>
    )}
  </Formik>
);
```

#### Tarefa 16: Implementar Notificações Push (21 pontos)
**Descrição**: Adicionar suporte a notificações push usando Firebase Cloud Messaging.

**Exemplo de Código**:
```jsx
import { getMessaging, getToken } from "firebase/messaging";

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
```

#### Tarefa 17: Implementar Recuperação de Senha (21 pontos)
**Descrição**: Adicionar funcionalidade para recuperação de senha via email utilizando Firebase Authentication.

**Exemplo de Código**:
```jsx
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

const auth = getAuth();

const handlePasswordReset = (email) => {
  sendPasswordResetEmail(auth, email)
    .then(() => {
      console.log('Password reset email sent');
    })
    .catch((error) => {
      console.error('Error sending password reset email', error);
    });
};

// Exemplo de uso
handlePasswordReset('user@example.com');
```

#### Tarefa 18: Adicionar Modo Escuro/Claro (34 pontos)
**Descrição**: Implementar a funcionalidade de alternância entre modo escuro e claro na aplicação.

**Exemplo de Código**:
```jsx
import { useState } from 'react';

const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={darkMode ? 'dark-mode' : 'light-mode'}>
      <button onClick={toggleDarkMode}>
        {darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      </button>
    </div>
  );
};

export default App;
```

#### Tarefa 19: Adicionar Logs de Auditoria com Firebase Functions (34 pontos)
**Descrição**: Implementar logs de auditoria para registrar ações importantes dos usuários utilizando Firebase Functions.

**Exemplo de Código**:
```javascript
// Firebase Function para registrar logs
const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.logUserAction = functions.firestore
  .document('users/{userId}/actions/{actionId}')
  .onCreate((snap, context) => {
    const newValue = snap.data();
    console.log(`User ${context.params.userId} performed action: `, newValue);
  });
```

#### Tarefa 20: Implementar Relatórios de Atividades de Usuário (55 pontos)
**Descrição**: Desenvolver uma visão de relatórios que mostra as atividades dos usuários, integrando com Firebase Firestore para coleta de dados.

**Exemplo de Código**:
```jsx
import React, { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs } from "firebase/firestore";

const ActivityReport = () => {
  const [activities, setActivities] = useState([]);
  const db = getFirestore();

  useEffect(() => {
    const fetchActivities = async () => {
      const activitiesCollection = collection(db, 'activities');
      const activitiesSnapshot = await getDocs(activitiesCollection);
      const activitiesList = activitiesSnapshot.docs.map(doc => doc.data());
      setActivities(activitiesList);
    };
    fetchActivities();
  }, [db]);

  return (
    <div>
      <h1>Activity Report</h1>
      <ul>
        {activities.map(activity => (
          <li key={activity.id}>{activity.user} - {activity.action}</li>
        ))}
      </ul>
    </div>
  );
};

export default ActivityReport;
```

#### Tarefa 21: Melhorar Acessibilidade dos Componentes (3 pontos)
**Descrição**: Adicionar atributos ARIA para melhorar a acessibilidade dos componentes da aplicação.

**Exemplo de Código**:
```jsx
<button aria-label="Close" className="btn btn-secondary">
  Fechar
</button>
```

#### Tarefa 22: Adicionar Tooltip em Botões (3 pontos)
**Descrição**: Implementar tooltips nos botões para fornecer informações adicionais ao usuário.

**Exemplo de Código**:
```jsx
import { Tooltip, OverlayTrigger } from 'react-bootstrap';

const renderTooltip = (props) => (
  <Tooltip id="button-tooltip" {...props}>
    Informação adicional
  </Tooltip>
);

const MyButton = () => (
  <OverlayTrigger placement="top" overlay={renderTooltip}>
    <button className="btn btn-info">Hover me</button>
  </OverlayTrigger>
);
```

#### Tarefa 23: Ajustar Margens e Padding para Consistência Visual (3 pontos)
**Descrição**: Revisar e ajustar margens e padding dos componentes para garantir consistência visual em toda a aplicação.

**Exemplo de Código**:
```css
.my-component {
  margin: 1rem;
  padding: 1rem;
}
```

#### Tarefa 24: Implementar Cache de Dados com Service Workers (8 pontos)
**Descrição**: Utilizar Service Workers para cache de dados e melhorar a performance e a experiência offline da aplicação.

**Exemplo de Código**:
```javascript
// Registering a service worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js')
    .then(registration => {
      console.log('ServiceWorker registered: ', registration);
    })
    .catch(registrationError => {
      console.log('ServiceWorker registration failed: ', registrationError);
    });
}
```

#### Tarefa 25: Refatorar Componentes para Hooks (13 pontos)
**Descrição**: Refatorar componentes de classe para usar React Hooks, modernizando o código.

**Exemplo de Código**:
```jsx
// Antes (componente de classe)
class MyComponent extends React.Component {
  state = { count: 0 };

  increment = () => {
    this.setState({ count: this.state.count + 1 });
  };

  render() {
    return <button onClick={this.increment}>{this.state.count}</button>;
  }
}

// Depois (componente funcional com hooks)
const MyComponent = () => {
  const [count, setCount] = useState(0);

  return <button onClick={() => setCount(count + 1)}>{count}</button>;
};
```

#### Tarefa 26: Implementar Upload de Arquivos com Firebase Storage (21 pontos)
**Descrição**: Adicionar funcionalidade para upload de arquivos utilizando Firebase Storage.

**Exemplo de Código**:
```jsx
import { getStorage, ref, uploadBytes } from "firebase/storage";

const storage = getStorage();

const uploadFile = (file) => {
  const storageRef = ref(storage, 'uploads/' + file.name);
  uploadBytes(storageRef, file).then((snapshot) => {
    console.log('Uploaded a blob or file!', snapshot);
  });
};

// Exemplo de uso
const handleFileChange = (e) => {
  const file = e.target.files[0];
  uploadFile(file);
};
```

#### Tarefa 27: Adicionar Paginação em Listas de Dados (21 pontos)
**Descrição**: Implementar paginação em listas de dados para melhorar a usabilidade e a performance.

**Exemplo de Código**:
```jsx
import { useState } from 'react';

const PaginatedList = ({ items }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div>
      <ul>
        {currentItems.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
      <button onClick={() => setCurrentPage(currentPage - 1)}>Previous</button>
      <button onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
    </div>
  );
};
```

#### Tarefa 28: Integrar Firebase Authentication com Redes Sociais (34 pontos)
**Descrição**: Implementar autenticação com redes sociais como Facebook e Twitter utilizando Firebase Authentication.

**Exemplo de Código**:
```jsx
import { getAuth, signInWithPopup, FacebookAuthProvider, TwitterAuthProvider } from "firebase/auth";

const auth = getAuth();
const facebookProvider = new FacebookAuthProvider();
const twitterProvider = new TwitterAuthProvider();

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

const signInWithTwitter = () => {
  signInWithPopup(auth, twitterProvider)
    .then((result) => {
      const user = result.user;
      console.log(user);
    })
    .catch((error) => {
      console.error(error);
    });
};

// Botões de login com redes sociais
<button onClick={signInWithFacebook}>Login com Facebook</button>
<button onClick={signInWithTwitter}>Login com Twitter</button>
```

#### Tarefa 29: Melhorar a Segurança com Regras do Firestore (34 pontos)
**Descrição**: Definir e implementar regras de segurança no Firestore para proteger os dados sensíveis.

**Exemplo de Código**:
```json
// Firestore security rules example
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

#### Tarefa 30: Implementar Sistema de Notificações em Tempo Real (55 pontos)
**Descrição**: Adicionar suporte para notificações em tempo real usando Firebase Cloud Messaging e Firestore.

**Exemplo de Código**:
```jsx
import { getMessaging, onMessage } from "firebase/messaging";
import { getFirestore, collection, onSnapshot } from "firebase/firestore";

const messaging = getMessaging();
const db = getFirestore();

// Configurar notificações em tempo real
onMessage(messaging, (payload) => {
  console.log('Message received. ', payload);
  // Mostrar notificação ao usuário
});

// Exemplo de Firestore snapshot listener
const setupRealtimeUpdates = () => {
  const q = collection(db, 'notifications');
  onSnapshot(q, (snapshot) => {
    snapshot.docChanges().forEach((change) => {
      if (change.type === "added") {
        console.log("New notification: ", change.doc.data());
      }
    });
  });
};

setupRealtimeUpdates();
```

#### Tarefa 31: Adicionar Ícones Personalizados aos Botões (3 pontos)
**Descrição**: Integrar uma biblioteca de ícones como Font Awesome e adicionar ícones personalizados aos botões.

**Exemplo de Código**:
```jsx
// Instalar Font Awesome
npm install @fortawesome/react-fontawesome @fortawesome/free-solid-svg-icons

// Importar e usar ícones
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

const IconButton = () => (
  <button className="btn btn-primary">
    <FontAwesomeIcon icon={faCoffee} /> Café
  </button>
);
```

#### Tarefa 32: Adicionar Animações de Carregamento (3 pontos)
**Descrição**: Implementar animações de carregamento utilizando uma biblioteca como `react-spinners`.

**Exemplo de Código**:
```jsx
// Instalar react-spinners
npm install react-spinners

// Importar e usar um spinner
import { ClipLoader } from 'react-spinners';

const LoadingComponent = () => (
  <div className="loading-container">
    <ClipLoader size={50} color={"#123abc"} loading={true} />
  </div>
);
```

#### Tarefa 33: Implementar Mensagens de Erro Customizadas (3 pontos)
**Descrição**: Adicionar mensagens de erro customizadas para validação de formulários.

**Exemplo de Código**:
```jsx
<Form.Group controlId="formBasicEmail">
  <Form.Label>Email address</Form.Label>
  <Form.Control type="email" placeholder="Enter email" required />
  <Form.Control.Feedback type="invalid">
    Por favor, insira um endereço de email válido.
  </Form.Control.Feedback>
</Form.Group>
```

#### Tarefa 34: Implementar Localização com i18next (8 pontos)
**Descrição**: Adicionar suporte para múltiplos idiomas utilizando a biblioteca `i18next`.

**Exemplo de Código**:
```jsx
// Instalar i18next
npm install i18next react-i18next

// Configurar i18next
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          "Welcome": "Welcome to Pede Roca"
        }
      },
      pt: {
        translation: {
          "Welcome": "Bem-vindo à Pede Roca"
        }
      }
    },
    lng: "en",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    }
  });

// Usar a tradução no componente
import { useTranslation } from 'react-i18next';

const MyComponent = () => {
  const { t } = useTranslation();

  return <h1>{t('Welcome')}</h1>;
};
```

#### Tarefa 35: Implementar Lazy Loading de Imagens (13 pontos)
**Descrição**: Adicionar lazy loading para imagens utilizando a biblioteca `react-lazyload`.

**Exemplo de Código**:
```jsx
// Instalar react-lazyload
npm install react-lazyload

// Usar LazyLoad
import LazyLoad from 'react-lazyload';

const ImageComponent = () => (
  <div>
    <LazyLoad height={200} offset={100}>
      <img src="path/to/image.jpg" alt="Descrição" />
    </LazyLoad>
  </div>
);
```

#### Tarefa 36: Implementar Autenticação com Apple ID (21 pontos)
**Descrição**: Adicionar suporte para login com Apple ID utilizando Firebase Authentication.

**Exemplo de Código**:
```jsx
import { getAuth, signInWithPopup, OAuthProvider } from "firebase/auth";

const auth = getAuth();
const provider = new OAuthProvider('apple.com');

const signInWithApple = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      console.log(user);
    })
    .catch((error) => {
      console.error(error);
    });
};

// Botão de login com Apple ID
<button onClick={signInWithApple}>Login com Apple</button>
```

#### Tarefa 37: Adicionar Dark Mode com CSS Variables (21 pontos)
**Descrição**: Implementar dark mode utilizando variáveis CSS para alternar entre temas claro e escuro.

**Exemplo de Código**:
```css
:root {
  --background-color: #ffffff;
  --text-color: #000000;
}

[data-theme="dark"] {
  --background-color: #000000;
  --text-color: #ffffff;
}

body {
  background-color: var(--background-color);
  color: var(--text-color);
}
```

```jsx
// Alternar entre temas
const toggleTheme = () => {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", newTheme);
};

<button onClick={toggleTheme}>Toggle Dark Mode</button>
```

#### Tarefa 38: Adicionar Monitoramento de Performance com Firebase (34 pontos)
**Descrição**: Integrar Firebase Performance Monitoring para rastrear e melhorar o desempenho da aplicação.

**Exemplo de Código**:
```jsx
import { getPerformance } from "firebase/performance";

// Inicializar o monitoramento de performance
const performance = getPerformance();

// Rastrear um evento de desempenho personalizado
const trace = performance.trace('custom_trace');
trace.start();
// Código a ser monitorado
trace.stop();
```

#### Tarefa 39: Implementar Funcionalidade de Pesquisa (34 pontos)
**Descrição**: Adicionar uma funcionalidade de pesquisa para filtrar dados na aplicação.

**Exemplo de Código**:
```jsx
import { useState } from 'react';

const SearchComponent = ({ items }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
      <ul>
        {filteredItems.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};
```

#### Tarefa 40: Criar Painel de Controle de Configurações (55 pontos)
**Descrição**: Desenvolver um painel de controle para que os administradores possam gerenciar configurações da aplicação.

**Exemplo de Código**:
```jsx
import React, { useState, useEffect } from 'react';
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const SettingsPanel = () => {
  const [settings, setSettings] = useState({});
  const db = getFirestore();

  useEffect(() => {
    const fetchSettings = async () => {
      const docRef = doc(db, 'config', 'settings');
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setSettings(docSnap.data());
      }
    };
    fetchSettings();
  }, [db]);

  const handleSave = async () => {
    const docRef = doc(db, 'config', 'settings');
    await setDoc(docRef, settings);
  };

  return (
    <div>
      <h1>Settings Panel</h1>
      <label>
        Setting 1:
        <input
          type="text"
          value={settings.setting1 || ''}
          onChange={(e) => setSettings({ ...settings, setting1: e.target.value })}
        />
      </label>
      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default SettingsPanel;
```
