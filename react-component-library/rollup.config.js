import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import copy from "rollup-plugin-copy";
import postcss from 'rollup-plugin-postcss';
import resolve from '@rollup/plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';
import commonjs from '@rollup/plugin-commonjs';
import packageJson from './package.json';

export default {
    preserveModules: true,
    input: packageJson.source,
    output: [
        {
            dir: packageJson.target.cjs,
            format: 'cjs',
            sourcemap: true,
        },
        {
            dir: packageJson.target.esm,
            format: 'esm',
            sourcemap: true,
        },
    ],
    plugins: [
        peerDepsExternal(),
        postcss({
            modules: true,
            extensions: ['module.scss'],
            use: ['sass'],
        }),
        resolve(),
        commonjs(),
        typescript({ useTsconfigDeclarationDir: true }),
        copy({
            targets: [
                {
                    src: 'node_modules/ag-grid-community/dist/styles/**/*',
                    dest: 'dist/styles/agGrid'
                }
            ]
        })
    ],
};
