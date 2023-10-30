const path = require('path');
module.exports = {
  apps: [
    {
      name: 'chat_server',
      script: './main.cjs',
      env: {
        OPENAI_API_KEY: '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',
      },
      // 可以启动多个实例来处理高并发，
      instances: 1,
      // 如果超出最大内存限制，自动重启应用程序
      max_memory_restart: '300M',
      // 设置应用程序异常退出重启的次数，默认15次（从0开始计数）；
      max_restarts: 3,
      // 避免一直重启，设置指数退避重启延迟：在重启几次后，就延迟重启
      exp_backoff_restart_delay: 15000,

      /**日志参数-start */
      out_file: './logs/out_file.log', // 文件路径一定要设置
      error_file: './logs/error_file.log',
      time: true, // 日志前加上时间
      merge_logs: false,
      /**日志参数-end */
    },
  ],
};

/**
 *
 * 在自动退出、事件循环为空或应用程序崩溃时会自动重启
 */

/**
 * 启动命令：pm2 start ecosystem.config.js
 * 修改配置参数重启命令：pm2 reload ecosystem.config.js
 * 重启：pm2 restart ecosystem.config.js
 */

/**
 * 日志按照每天的维度拆分为一个文件，一天一个文件
 * 安装：pm2 install pm2-logrotate
 * 重启：pm2 restart chat_server
 *
 *
 * 下面这一条不一定行
 * pm2 set pm2-logrotate:appName chat_server
 */
