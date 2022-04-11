const describe = {
  title: "Redux demo",
  cover: "redux.png",
  subhead: "Redux demo",
  date: "2022/4/3",
  tags: "react"
}
  
const getReactCode = () => {
  let a = 
  `function counter(state, action) {
    if (typeof state === 'undefined') {
      return 0
    }
  
    switch (action.type) {
      case 'INCREMENT':
        return state + 1
      case 'DECREMENT':
        return state - 1
      default:
        return state
    }
  }
  
  var store = Redux.createStore(counter)
  var valueEl = document.getElementById('value')
  
  function render() {
    valueEl.innerHTML = store.getState().toString()
  }
  
  render()
  store.subscribe(render)
  
  document.getElementById('increment')
    .addEventListener('click', function () {
      store.dispatch({ type: 'INCREMENT' })
    })
  
  document.getElementById('decrement')
    .addEventListener('click', function () {
      store.dispatch({ type: 'DECREMENT' })
    })
  
  document.getElementById('incrementIfOdd')
    .addEventListener('click', function () {
      if (store.getState() % 2 !== 0) {
        store.dispatch({ type: 'INCREMENT' })
      }
    })
  
  document.getElementById('incrementAsync')
    .addEventListener('click', function () {
      setTimeout(function () {
        store.dispatch({ type: 'INCREMENT' })
      }, 1000)
    })`;
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
  }
  .info{
    color: rgba(0, 0, 0, 0.85);
    font-weight: 400;
    font-size: 2em;
    margin-bottom: 30px;
  }
  `,
    html: `<div>
    <div class='title' >Hello Moderate, let's play!</div>
    <div class='info' >React Redux Demo</div>
    
    <p>
      Clicked: <span id="value">0</span> times
      <button id="increment">+</button>
      <button id="decrement">-</button>
      <button id="incrementIfOdd">Increment if odd</button>
      <button id="incrementAsync">Increment async</button>
    </p>
  </div>`,
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
        url: "https://unpkg.com/react/umd/react.development.js",
      },
      {
        name: "react-dom",
        url: "https://unpkg.com/react-dom/umd/react-dom.development.js",
      },
      {
        name: "history",
        url: "https://unpkg.com/history@5/umd/history.development.js",
      },
      {
        name: "react-router",
        url: "https://unpkg.com/react-router@6/umd/react-router.development.js",
      },
      {
        name: "react-router-dom",
        url: "https://unpkg.com/react-router-dom@6/umd/react-router-dom.development.js",
      },
      {
        name: "antd",
        url: "https://cdn.bootcdn.net/ajax/libs/antd/4.19.4/antd.js",
      },
      {
        name: "antd",
        url: "https://cdn.bootcdn.net/ajax/libs/antd/4.19.4/antd.js",
      },
      {
        name: "immer",
        url: "https://cdn.bootcdn.net/ajax/libs/immer/9.0.12/index.min.js",
      },
      {
        name: "redux",
        url: "https://cdn.bootcdn.net/ajax/libs/redux/4.1.2/redux.min.js",
      },
      {
        name: "reduxThunk",
        url: "https://cdn.bootcdn.net/ajax/libs/redux-thunk/2.4.1/redux-thunk.min.js",
      },
      {
        name: "reselect",
        url: "https://cdn.bootcdn.net/ajax/libs/reselect/4.1.5/reselect.js",
      },
      {
        name: "reactRedux",
        url: "https://cdn.bootcdn.net/ajax/libs/react-redux/7.2.6/react-redux.min.js",
      },
      {
        name: "reduxToolkit",
        url: "/resources/redux-toolkit.cjs.production.min.js",
      },
      {
        name: "vue3",
        url: "https://cdn.bootcdn.net/ajax/libs/vue/3.2.0-beta.7/vue.global.js",
      },
    ],
  },
};

module.exports = config
