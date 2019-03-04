const rewireYarnWorkspaces = require('react-app-rewire-yarn-workspaces');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const WebpackBar = require('webpackbar');

const getBabelLoader = (config) => {
  const babelLoaderFilter = (rule) =>
    rule.loader && rule.loader.includes('babel') && rule.options && rule.options.plugins;

  // First, try to find the babel loader inside the oneOf array.
  // This is where we can find it when working with react-scripts@2.0.3.
  let loaders = config.module.rules.find((rule) => Array.isArray(rule.oneOf)).oneOf;

  let babelLoader = loaders.find(babelLoaderFilter);

  // If the loader was not found, try to find it inside of the "use" array, within the rules.
  // This should work when dealing with react-scripts@2.0.0.next.* versions.
  if (!babelLoader) {
    loaders = loaders.reduce((ldrs, rule) => ldrs.concat(rule.use || []), []);
    babelLoader = loaders.find(babelLoaderFilter);
  }
  return babelLoader;
};

const addBabelPlugin = (plugin) => (config) => {
  getBabelLoader(config).options.plugins.push(plugin);
  return config;
};

module.exports = function override(config, env) {
  config = rewireYarnWorkspaces(config, env);
  config = addBabelPlugin('@babel/proposal-export-default-from')(config);

  if (env === 'production') {
    config = Object.assign(config, {
      plugins: [new BundleAnalyzerPlugin(), new WebpackBar({ profile: true })],
      externals: { esprima: 'esprima' },
    });
  }

  return config;
};
