const DEV = 'development';

const NODE_ENV = process.env.NODE_ENV || DEV;

const plugins = [
  [
    '@babel/plugin-transform-runtime',
    {
      regenerator: true,
    },
  ],
];

if (NODE_ENV === DEV) {
  plugins.push('react-refresh/babel');
}

module.exports = {
  presets: ['@babel/preset-env', ['@babel/preset-react', { runtime: 'automatic' }]],
  plugins,
};
