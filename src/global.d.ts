declare global {
  // 全局变量
  var example1: string;
  var buildMode: 'all' | 'spa' | 'dll' | 'ssr' | 'ssr-material' | 'dev';
  var project_config: Record<string, any>;
  // var NODE_MODULES_PATH: string;

  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production';
      NODE_MODULES_PATH: string;
      MODE: string;
      // 在这里定义其他的环境变量和类型
    }
  }
}

export {};
