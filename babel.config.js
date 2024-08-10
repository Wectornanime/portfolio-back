module.exports = {
    presets: [
        [
            '@babel/preset-env',
            { targets: { node: 'current' } }
        ],
        '@babel/preset-typescript'
    ],
    plugins: [
        ['module-resolver', {
            alias: {
                '@types/*': './src/@types/*',
                '@models/*': './src/models/*',
                '@controllers/*': './src/controllers/*',
                '@dtos/*': './src/dtos/*',
                '@services/*': './src/services/*',
                '@middlewares/*': './src/middlewares/*'
            }
        }]
    ],
    ignore: ['**/*.spec.ts']
};
