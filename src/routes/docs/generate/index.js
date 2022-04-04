let dimension;
let config;
//后台
const backend = {
  nodes: [
    {
      id: "backend",
      name: "后端开发",
      level: 0,
      childrenNum: 2,
      tag: "backend",
    },
    {
      id: "go",
      name: "Go语言",
      level: 1,
      tag: "go",
      isLeaf: false,
      tags: ["backend"],
    },
    {
      id: "node",
      name: "NodeJs",
      level: 1,
      tag: "node",
      isLeaf: false,
      tags: ["backend"],
    },
  ],
};
// 脚手架开发
const template = {
  nodes: [
    {
      id: "template",
      name: "脚手架开发",
      level: 0,
      childrenNum: 3,
      tag: "template",
    },
    {
      id: "router_1",
      name: "路由配置",
      level: 2,
      isLeaf: true,
      tags: ["template", "template2"],
      docId: "asdasdasd",
    },
    {
      id: "mock",
      name: "mock",
      level: 2,
      isLeaf: true,
      tags: ["template"],
    },
    {
      id: "pageBookmark",
      name: "页面书签",
      level: 2,
      isLeaf: true,
      tags: ["template"],
    },
  ],
  edges: [],
};
let partArr = [backend, template];
let result = { nodes: [], edges: [] };

exports.initEdges = () => {
  const { frontend, backend } = config;
  const getedgeArr = (data) => {
    let edgeArr = [];
    data.slice(1).forEach((item2) => {
        edgeArr.push({
          source: data[0].id,
          target: item2.id,
        });
    });
    return edgeArr
  };
  let result = [...getedgeArr(Object.values(frontend)),...getedgeArr(Object.values(backend))];
  return result;
};
const createEdges = (data) => {
  let tagsTemp = checkTag(data);
  let edge=undefined;
  if(tagsTemp.length){
     edge = {
      source: dimension[tagsTemp[0]].id,
      target: data.id,
    };
  }
  return edge;
};
const checkTag = (data) => {
  const { tags } = data;
  // 如果出现tags不存在的就不要创建节点了
  let tagsTemp = [];
  for (let i = 0; i < tags.length; i++) {
    let tag = tags[i];
    if (tag in dimension) {
      tagsTemp.push(tag);
      break;
    }
  }
  return tagsTemp;
};

const createDocNode = (data) => {
  const { id, title: name } = data;
  // 如果出现tags不存在的就不要创建节点了
  let tagsTemp = checkTag(data);
  return tagsTemp.length
    ? {
        id,
        name,
        tags: tagsTemp,
        isLeaf:true,
        level: 2,
      }
    : null;
};

exports.generate = (data, type = 0) => {
  config = config || require(`./config/config_${type}`);
  dimension = dimension || config.dimension;
  const node = createDocNode(data, dimension);
  const edge = createEdges(data, dimension);
  if (!node) {
    return null;
  }
  return { node, edge };
};

exports.getDimension = (type = 0) => {
  config = config || require(`./config/config_${type}`);
  dimension = dimension || config.dimension;
  return dimension;
};
