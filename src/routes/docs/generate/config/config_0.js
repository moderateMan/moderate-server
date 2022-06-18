const frontend = {
  engineering: {
    id: "engineering",
    name: "工程化项目搭建",
    level: 0,
    childrenNum: 0,
    tag: "engineering",
    tags: ["frontend"],
  },
  scaffolding: {
    id: "scaffolding",
    name: "脚手架开发",
    level: 0,
    childrenNum: 0,
    tag: "scaffolding",
    tags: ["frontend"],
  },
  devops: {
    id: "devops",
    name: "devops",
    level: 0,
    childrenNum: 0,
    tag: "devops",
    tags: ["frontend"],
  },
  standard: {
    id: "standard",
    name: "前端规范",
    level: 0,
    childrenNum: 0,
    tag: "standard",
    tags: ["frontend"],
  },
  basics: {
    id: "basics",
    name: "读书&基础",
    level: 0,
    childrenNum: 0,
    tag: "basics",
    tags: ["frontend"],
  },
  react: {
    id: "react",
    name: "React开发",
    level: 0,
    childrenNum: 0,
    tag: "react",
    tags: ["frontend"],
  },
  miniApp: {
    id: "miniApp",
    name: "小程序开发",
    level: 0,
    childrenNum: 0,
    tag: "miniApp",
    tags: ["frontend"],
  },
  game: {
    id: "game",
    name: "游戏开发",
    level: 0,
    childrenNum: 0,
    tag: "game",
    tags: ["frontend"],
  },
  graph: {
    id: "graph",
    name: "图形2d&3d",
    level: 0,
    childrenNum: 0,
    tag: "graph",
    tags: ["frontend"],
  },
};

const backend = {
  rust: {
    id: "rust",
    name: "Rust学习",
    level: 0,
    childrenNum: 0,
    tag: "rust",
    tags: ["backend"],
  },
  go: {
    id: "go",
    name: "Go语言",
    level: 0,
    childrenNum: 0,
    tag: "go",
    isLeaf: false,
    tags: ["backend"],
  },
  node: {
    id: "node",
    name: "NodeJs",
    level: 0,
    childrenNum: 0,
    tag: "node",
    isLeaf: false,
    tags: ["backend"],
  },
};

exports.dimension = {
  ...frontend,
  ...backend,
};

exports.frontend = frontend;
exports.backend = backend;
