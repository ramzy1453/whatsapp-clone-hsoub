module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      "react-native-reanimated/plugin",  // إعداد آخر لأداء أفضل
      [
        "module:react-native-dotenv",
        {
          moduleName: "@env",
          path: ".env",  // مسار ملف .env
        },
      ],
    ],
  };
};
