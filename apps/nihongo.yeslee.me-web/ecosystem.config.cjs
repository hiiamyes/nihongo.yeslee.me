module.exports = {
  apps: [
    {
      name: "yeslee.me",
      port: "8077",
      instances: "max",
      exec_mode: "cluster",
      cwd: "./",
      script: "node_modules/next/dist/bin/next",
      args: "start",
    },
  ],
};
