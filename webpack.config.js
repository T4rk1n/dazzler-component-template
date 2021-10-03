const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const exec = require('child_process').exec;
const tracker = require('./webpack-asset-tracker');

const LIBRARY = 'dazzler_component_template'

module.exports = function (env, argv) {
    const mode = (argv && argv.mode) || 'production';
    const devMode = mode === 'development';
    const devtool = mode === 'development' ? 'inline-source-map' : undefined;

    const output = {
        filename: `${LIBRARY}_[contenthash].js`,
        sourceMapFilename: `${LIBRARY}_[contenthash][ext].map`,
        library: LIBRARY,
        libraryTarget: 'umd',
        devtoolModuleFilenameTemplate: 'webpack:///[id]/[resource]?[loaders]',
    };

    if (devMode) {
        output.path = path.join(__dirname, `src/python/${LIBRARY}/assets/dev`);
    } else {
        output.path = path.join(__dirname, `src/python/${LIBRARY}/assets/dist`);
    }

    const entry = {[LIBRARY]: path.join(__dirname, 'src/ts/index.ts')};

    const externals = {
        react: {
            commonjs: 'react',
            commonjs2: 'react',
            amd: 'react',
            umd: 'react',
            root: 'React',
        },
        'react-dom': {
            commonjs: 'react-dom',
            commonjs2: 'react-dom',
            amd: 'react-dom',
            umd: 'react-dom',
            root: 'ReactDOM',
        },
    };

    const plugins = [
        tracker({
            path: output.path,
            filename: 'assets.json',
            integrity: !devMode,
        }),
        new MiniCssExtractPlugin({
            filename: 'dazzler_[name]_[contenthash].css',
            chunkFilename: 'dazzler_[name]_[contenthash].css',
        }),
    ];

    if (devMode && argv && argv.watch) {
        plugins.push({
            apply: (compiler) => {
                compiler.hooks.afterEmit.tap('BuildDazzlerPlugin', () => {
                    exec('npm run build:dazzler', (err, stdout, stderr) => {
                        if (stdout) process.stdout.write(stdout);
                        if (stderr) process.stderr.write(stderr);
                    });
                });
            },
        });
    }

    // Check argv is defined first for IDE analyse.
    if (argv && !argv.watch) {
        plugins.push(
            new CleanWebpackPlugin()
        );
    }

    return {
        mode,
        entry,
        output,
        externals,
        target: 'web',

        optimization: {
            splitChunks: {
                // Chunks not working good with dev
                // I think something with the proptypes lib.
                chunks: devMode ? undefined : 'all',
            },
        },

        watchOptions: {
            aggregateTimeout: 500,
            poll: 1000,
        },

        plugins,
        devtool,
        resolve: {
            extensions: ['.ts', '.tsx'],
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/,
                },
                {
                    test: /\.s?css$/,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader,
                            options: {
                                esModule: false,
                            },
                        },
                        {
                            loader: 'css-loader',
                        },
                        {
                            loader: 'sass-loader',
                        },
                    ],
                },
            ],
        },
    };
};
