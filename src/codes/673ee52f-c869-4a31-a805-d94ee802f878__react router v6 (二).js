const describe = {
  title: "React Router v6 demo",
  cover: "r6.png",
  subhead: "辅助强化 React-router v6 的功能",
  date: "2022/4/2",
  tags: "react"
}

const getReactCode = () => {
  let a = `const {
    useRoutes,
    useNavigate,
    MemoryRouter: Rouer
  } = ReactRouterDOM
  const { Button } = antd
  const LoginPage = () => {
    const navigateTo = useNavigate()
    return (
      <div>
        <div >React Router v6 Demo</div>
        <div>
          <Button
            type="primary"  
            onClick={() => {
              navigateTo('center')
            }}
          >
            跳回
          </Button>
        </div>
      </div>
    )
  }
  const CenterPage = () => {
    const navigateTo = useNavigate()
    return (
      <div>
        <div>includes useRoutes and useNavigate api</div>
        <div>
          <Button
            type="primary"  
            onClick={() => {
              navigateTo('/')
            }}
          >
            跳转
          </Button>
        </div>
      </div>
    )
  }
  const App = () => {
    const Routes = () => {
      return useRoutes([
        {
          path: '/',
          element: <LoginPage />
        },
        {
          path: '/center',
          element: <CenterPage />
        }
      ])
    }
    return <Routes></Routes>
  }
  const Index = () => {
    return (
      <Rouer>
        <App />
      </Rouer>
    )
  }
  ReactDOM.render(
    <h1>
      <div className={'title'} >Hello Moderate, let's play!</div>
      <Index />
    </h1>,
    document.getElementById('root')
  )`;
  return a;
};
const config = {
  describe,
  template: {
    js: getReactCode(),
    css: `.title{
        color: red;
        font-weight:bold;
        font-size:50px;
    }`,
    html: `<div id="root"></div>`,
  },
  resources: {
    css: [
      {
        name: "antd-css",
        url: "https://cdn.bootcdn.net/ajax/libs/antd/4.19.4/antd.css",
      },
    ],
    js: [
      {
        name: "React",
        url: "https://cdnjs.cloudflare.com/ajax/libs/react/16.13.1/umd/react.production.min.js",
      },
      {
        name: "react-dom",
        url: "https://cdnjs.cloudflare.com/ajax/libs/react-dom/16.13.1/umd/react-dom.production.min.js",
      },
      {
        name: "history",
        url: "https://cdnjs.cloudflare.com/ajax/libs/history/5.3.0/history.production.min.js",
      },
      {
        name: "react-router",
        url: "https://cdnjs.cloudflare.com/ajax/libs/react-router/6.0.1/react-router.production.min.js",
      },
      {
        name: "react-router-dom",
        url: "https://cdnjs.cloudflare.com/ajax/libs/react-router-dom/6.0.1/react-router-dom.production.min.js",
      },
      {
        name: "antd",
        url: "https://cdnjs.cloudflare.com/ajax/libs/antd/4.23.5/antd.min.js",
      },
    ],
  },
};

module.exports = config
