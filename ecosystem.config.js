module.exports = {
  apps: [
    {
      name: 'apexcraft-backend',
      script: './server/server.js',
      instances: 'max',
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
        PORT: 5000
      },
      max_memory_restart: '500M',
      restart_delay: 3000,
      autorestart: true,
      watch: false
    }
  ]
};
