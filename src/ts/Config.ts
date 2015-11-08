/// <reference path="../../lib/def/require.d.ts" />

require.config({
  baseUrl: "./ts",
  paths: {
    lib: "../../" + "lib"
  }
});

require(
  ["./lib/p2"],
  (p2) => {
    require(
      ["./lib/phaser"],
      (Phaser) => {
        require(
          ["./Main"],
          (Main) => {
            new Main().run();
          }
          );
      }
      );
  }
  );
