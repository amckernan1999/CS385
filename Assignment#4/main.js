//Author: Andrew McKernan
//Description: a 3d depiction of the sun, earth, and moon all in orbit. This project utilizes view, and projection
//              transformations as well as a matrix stack in order to handle multiple translation and scales.
//Date: 3/15/22
"use strict";

var gl;


function init() {
    var canvas = document.getElementById("webgl-canvas");
    gl = canvas.getContext("webgl2");

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.enable(gl.DEPTH_TEST);

    let t = 0;
    function render() {
        t+= .005;
        console.log(t);
        gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);

        // sets up viewing perspective
        moon.P = perspective(81,1,5,34)
        moon.V = lookAt([0,.1,30],[0,0,0], [0,0,1]);
        sun.P = perspective(81,1,5,34)
        sun.V = lookAt([0,.1,30],[0,0,0], [0,0,1]);
        earth.P = perspective(81,1,5,34)
        earth.V = lookAt([0,0.1,30],[0,0,0], [0,0,1]);

        let ms = new MatrixStack();
        //loads ms with all view transformations
        ms.load(sun.V);
        ms.translate(0,0,0);
        ms.scale(sun.radius,sun.radius,sun.radius);
        sun.MV = ms.current();
        ms.pop();

        ms.load(earth.V);
        let earthPos = [Math.cos(t)*earth.orbit, Math.sin(t)*earth.orbit,0];
        ms.translate(earthPos[0],earthPos[1],earthPos[2]);
        ms.scale(earth.radius ,earth.radius,earth.radius)
        earth.MV = ms.current();
        ms.pop();

        ms.load(moon.V);
        ms.translate(earthPos[0] + Math.cos(2*t)*moon.orbit, earthPos[1] + Math.sin(2*t)*moon.orbit, earthPos[2]);
        //ms.translate(Math.cos(t)*moon.orbit, Math.sin(t)*moon.orbit,0)
        ms.scale(moon.radius ,moon.radius,moon.radius);
        moon.MV = ms.current();
        ms.pop();

        moon.render();
        sun.render();
        earth.render()
        requestAnimationFrame(render);
    }

    //creates basic planet types
    let sun = new Sphere(20,12);
    sun.radius = 6;
    sun.color = vec4(1.0, 0.0, 0.0, 1.0) //red

    let earth = new Sphere(20,12);
    earth.radius = 3
    earth.orbit = 10 + sun.radius
    earth.color = vec4(0.0, 0.0, 1.0, 1.0) //green

    // Add your sphere creation and configuration code here
    let moon = new Sphere(20,12);
    moon.radius = 1;
    moon.orbit = 3 + earth.radius;
    moon.color = vec4(0.5, 0.5, 0.5, 1.0) //blue
    requestAnimationFrame(render);
}



window.onload = init;