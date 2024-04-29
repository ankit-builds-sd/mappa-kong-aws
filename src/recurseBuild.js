async function build(seed, cache) {
  const actualModel = require(`../src/models/${seed}/model.json`);
  const namespace = actualModel.namespace;
  const ext = actualModel.extends || [];

  for (const model of ext) {
    const dependencyNamespace = model.substring(3, model.length);
    if (cache.includes(dependencyNamespace)) {
      console.log(`avoiding rebuild of ${dependencyNamespace}`);
    } else {
      await build(dependencyNamespace, cache);
    }
  }
  const result = await doBuild(namespace);
  if (result) cache.push(namespace);
}

async function doBuild(namespace) {
  //here execute your build and generator scripts
  console.log(`building: ${namespace}`);
  return true;
}

async function start() {
  const cache = [];
  const model = 'sdplus';
  await build(model, cache);
  console.log(`final build order: ${cache}`);
}

start();
