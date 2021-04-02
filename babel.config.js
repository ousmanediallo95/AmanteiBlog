const presets = [
    [
        "@babel/preset-env",
        {
            useBuiltIns: "usage",
            debug: true,
            corejs: 3,
            targets: "> 30%, not dead"
        }
    ]
];

module.exports = { presets };