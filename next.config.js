/* eslint-env node */

const path = require("path");

module.exports = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")]
  },
  async redirects() {
    return [
      { source: "/pages/c_waup6uzi4", destination: "/pages/001_next-ogp-image", permanent: true },
      { source: "/pages/c1yyo3dlsu", destination: "/pages/002_approvers-king-bot", permanent: true },
      { source: "/pages/4tx3adg59", destination: "/pages/003_probability-rate", permanent: true },
      { source: "/pages/u0tppcmg72", destination: "/pages/004_stylelint-gh-actions", permanent: true },
      { source: "/pages/kxr125k9s9o", destination: "/pages/005_auto-diary", permanent: true },
      { source: "/pages/7phhdfqjfqs3", destination: "/pages/006_gas-web-app", permanent: true },
      { source: "/pages/ti1t7oyht", destination: "/pages/007_minecraft-backup", permanent: true },
      { source: "/pages/yhiutoodm5uf", destination: "/pages/008_csharp-assembly-type", permanent: true },
      { source: "/pages/a4f0xzfe1ou", destination: "/pages/009_unity-test-runner", permanent: true },
      { source: "/pages/5uvwzraln50l", destination: "/pages/010_bomber-01", permanent: true },
      { source: "/pages/s_omzsilv-q0", destination: "/pages/011_bomber-02", permanent: true },
      { source: "/pages/n0oeufsdhol", destination: "/pages/012_bomber-03", permanent: true }
    ];
  }
};
