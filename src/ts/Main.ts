/// <reference path="../../lib/def/phaser.d.ts"/>

class Main {
    run() {
        var game:Phaser.Game = new Phaser.Game(800, 600, Phaser.AUTO, 'content', {
            preload: preload,
            create: create,
            update: update,
            render: render
        });

        function preload() {
            console.log("Preloading...");
        }

        function create() {
            console.log("Initialising...");
        }

        function update() {
            console.log("Updating...");
        }

        function render() {
            console.log("Rendering...");
        }
    }
}

export = Main;