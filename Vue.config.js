module.exports = {
    devServer: {
        open: true, //浏览器自动打开页面
        proxy: {
            '/api': {
                target: 'http://baobab.kaiyanapp.com/api/v4',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
}