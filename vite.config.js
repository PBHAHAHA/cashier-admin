import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import compressPlugin from 'vite-plugin-compression' //静态资源压缩
import Icons from 'unplugin-icons/vite' //icon  例：<i-ep-ArrowRight/>
import IconsResolver from 'unplugin-icons/resolver'

const pathResolve = dir => resolve(__dirname, dir)

export default ({ mode }) => {
    const env = loadEnv(mode, process.cwd())
    const outDir = env.VITE_APP_OUTDIR
    return defineConfig({
        plugins: [
            vue(),
            compressPlugin({
                //gzip静态资源压缩
                verbose: true, // 默认即可
                disable: false, //开启压缩(不禁用)，默认即可
                deleteOriginFile: false, //删除源文件
                threshold: 10240, //压缩前最小文件大小
                algorithm: 'gzip', //压缩算法
                ext: '.gz' //文件类型
            }),
            AutoImport({
                imports: ['vue'],
                extensions: ['vue', 'md'],
                include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
                resolvers: [
                    // }),
                    ElementPlusResolver(),
                    IconsResolver({
                        prefix: 'Icon',
                    }),
                ],
            }),
            Components({
                extensions: ['vue', 'md'],
                include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
                resolvers: [
                    ElementPlusResolver(),
                    IconsResolver({
                        enabledCollections: ['ep'],
                    }),
                ],
            }),
            Icons({
                autoInstall: true,
            }),
        ],
        server: {
            host:"0.0.0.0",
            port: 8800,
            open: false,
            cors: true,
        },
        clearScreen: false, // 设为false 可以避免 vite 清屏而错过在终端中打印某些关键信息

        resolve: {
            alias: {
                '@': pathResolve('./src'), // 设置@指向src目录
                '@scss': pathResolve('./src/scss'),
                '@components': pathResolve('./src/components'),
                '@views': pathResolve('./src/views'),
                '@utils': pathResolve('./src/utils'),
                '@store': pathResolve('./src/store')
            }
        },
        build: {
            outDir,
            minify: 'esbuild', // 最小化混淆 默认 esbuild   设置：terser  速度慢、更小 。 可以在开发环境使用esbuild ,生产环境使用terser
            esbuild: {
                drop: ["console", "debugger"],
            },
            chunkSizeWarningLimit: 1500, // chunk 大小警告的限制（以 kbs 为单位）
            rollupOptions: {
                output: {
                    // 最小化拆分包
                    manualChunks: id => {
                        if (id.includes('node_modules')) {
                            return id.toString().split('node_modules/')[1].split('/')[0].toString()
                        }
                    },
                    // 用于从入口点创建的块的打包输出格式[name]表示文件名,[hash]表示该文件内容hash值
                    entryFileNames: 'js/[name].[hash].js',
                    // 用于命名代码拆分时创建的共享块的输出命名
                    chunkFileNames: 'js/[name].[hash].js',
                    // 用于输出静态资源的命名，[ext]表示文件扩展名
                    assetFileNames: '[ext]/[name].[hash].[ext]'
                }
            }
        },

        // 解决 引入element-plus样式后打包警告问题
        css: {
            postcss: {
                plugins: [
                    {
                        postcssPlugin: 'internal:charset-removal',
                        AtRule: {
                            charset: (atRule) => {
                                if (atRule.name === 'charset') {
                                    atRule.remove();
                                }
                            }
                        }
                    }
                ]
            },
        },


    })
}