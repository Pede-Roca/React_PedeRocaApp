# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# Documentação do Front-End do Projeto

---

## Introdução ao Front-End

O front-end deste projeto foi desenvolvido com o objetivo de criar uma interface de usuário interativa e amigável para os usuários finais. A interface permite que os usuários naveguem, interajam e utilizem as funcionalidades do sistema de forma eficiente e intuitiva.

### Tecnologias e Frameworks Utilizados

- **React**: Utilizado para o desenvolvimento de interfaces interativas e componentes reutilizáveis.
- **Context API**: Para gerenciamento de estado global.
- **Axios**: Para realizar chamadas HTTP e comunicação com a API backend.
- **Bootstrap**: Para estilização e criação de layouts responsivos.
- **Firebase**: Para autenticação e armazenamento de dados.

---

## Estrutura de Pastas

A organização das pastas no projeto segue uma estrutura lógica para facilitar a navegação e manutenção do código.

### Estrutura de Pastas

- **src**: Diretório principal onde o código-fonte está localizado.
  - **components**: Componentes reutilizáveis da interface.
  - **pages**: Páginas principais que utilizam os componentes.
    - **AdminPages**: Contém arquivos relacionados à página de administração.
    - **Home**: Contém arquivos relacionados à página inicial.
  - **services**: Serviços para lidar com chamadas à API e lógica de negócio do front-end.
  - **assets**: Arquivos estáticos, como imagens, ícones e fontes.
  - **styles**: Arquivos de estilização global.
  - **hooks**: Hooks personalizados para lógica de negócios e manipulação de estado.
  - **context**: Contextos para gerenciamento de estado global.
  - **App.css**: Estilização global da aplicação.
  - **App.jsx**: Componente raiz da aplicação.
  - **index.css**: Estilização global adicional.
  - **main.jsx**: Ponto de entrada da aplicação.
  - **normalize.css**: Reset de CSS para garantir consistência entre navegadores.

---

## Organização dos Arquivos

### Convenções de Nomeação

- **Componentes**: Nomeados com a primeira letra maiúscula e em formato PascalCase (ex.: `Home.jsx`, `AdminPage.jsx`).
- **Estilos**: Arquivos CSS correspondentes aos componentes, nomeados com o mesmo nome do componente seguido de `.module.css` (ex.: `Home.module.css`).
- **Serviços**: Nomeados de acordo com a funcionalidade que oferecem, em formato camelCase (ex.: `autenticacao.service.js`, `carrinho_compra.service.js`).

### Estruturação dos Componentes

Os componentes são estruturados de forma hierárquica, onde componentes menores e reutilizáveis são importados e utilizados em componentes maiores e páginas.

### Arquivos Principais

- **App.jsx**: Componente raiz da aplicação, responsável por configurar o roteamento e fornecer o contexto de autenticação.
- **main.jsx**: Ponto de entrada da aplicação, onde o ReactDOM renderiza o componente `App`.

### Exemplo de Adição de Novo Componente

Para adicionar um novo componente:

1. Crie um novo arquivo na pasta `components` com o nome do componente (ex.: `NovoComponente.jsx`).
2. Crie um arquivo de estilo correspondente na mesma pasta (ex.: `NovoComponente.module.css`).
3. Importe e utilize o novo componente em uma página ou outro componente conforme necessário.

---

## Comentários e Dicas Gerais

### Boas Práticas

- Utilize comentários significativos em áreas complexas do código para facilitar o entendimento.
- Mantenha a consistência na nomeação de arquivos e pastas.
- Separe a lógica de negócios em serviços para manter os componentes limpos e focados na interface.

### Dicas de Navegação

- A documentação do projeto pode ser encontrada no repositório, na pasta `docs`.
- Para configurar o ambiente local, siga as instruções no arquivo `README.md` do repositório.

---

## Links Úteis

- [Documentação do React](https://reactjs.org/docs/getting-started.html)
- [Documentação do Axios](https://axios-http.com/docs/intro)
- [Documentação do Bootstrap](https://getbootstrap.com/docs/5.1/getting-started/introduction/)
- [Documentação do Firebase](https://firebase.google.com/docs)

---