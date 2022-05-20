/*Author: Andrew McKernan
*CS385 HW 2
*  2/9/22
* Summary: initializes canvas,creates a room out of a cube, renders a sphere for the device, handles translations
* as well as updates the datagrid in js
*/


"use strict";

var gl;

function init() {
    const canvas = document.getElementById("webgl-canvas");
    gl = canvas.getContext("webgl2");
    gl.enable(gl.DEPTH_TEST);


    var accCurrLine = 1;
    var bvpCurrLine =1;
    var edaCurrLine =1;
    var hrCurrLine =1;
    var idiCurrLine =1;
    var tempCurrLine =1;

    var currPos = [0.0,0.0,0.0];
    var dataSplit = [0,0,0,0,0,0,0,0,0];

    function render() {


        gl.clear(gl.COLOR_BUFFER_BIT, gl.DEPTH_BUFFER_BIT);
        cube.P = perspective(60,1,1,65);
        cube.V = lookAt([0,0,-2],[0,0,0], [0,1,1]);


        cube.MV = mult(cube.P, cube.V);
        cube.render();
        sphere.render();

        if(sphere.bioData !== undefined)
        {
            console.log(sphere.bioData[accCurrLine]);

            dataSplit = sphere.bioData[accCurrLine].split(",")
            document.getElementById("accData").innerHTML = "X:" + dataSplit[0] +  " Y:" + dataSplit[1] +  " Z:" + dataSplit[2];
            document.getElementById("bvpData").innerHTML = sphere.bioData[bvpCurrLine].split(",")[3];
            document.getElementById("edaData").innerHTML = sphere.bioData[edaCurrLine].split(",")[4];
            document.getElementById("hrData").innerHTML = sphere.bioData[hrCurrLine].split(",")[5];
            document.getElementById("idiData").innerHTML = sphere.bioData[idiCurrLine].split(",")[6] + " " + sphere.bioData[idiCurrLine].split(",")[7];
            document.getElementById("tempData").innerHTML = sphere.bioData[tempCurrLine].split(",")[8];
            currPos[0] = dataSplit[0] / 128.0;
            currPos[1] = dataSplit[1] / 128.0;
            currPos[2] = dataSplit[2] / 128.0;
            sphere.MV = mult(translate(currPos[0],currPos[1],currPos[2]), scalem(0.10,0.10,0.10));

        }

        requestAnimationFrame(render);

    }




    gl.clearColor(0, 0, 0, 1);
    let cube = new Cube(gl);
    let sphere = new Sphere(40,24);
    sphere.radius = 0.5;
    sphere.color = vec4(1,0.70,0.10,1);
    sphere.MV = scalem(0.10,0.10,0.10);

    render();

    document.getElementById('file').onchange = function(){
        var file = this.files[0];
        var reader = new FileReader();
        var lines = [];
        reader.onload = function(progressEvent){
            sphere.bioData = this.result.split(/\r\n|\n/);
            setInterval(function(){accCurrLine++},32);
            setInterval(function(){bvpCurrLine++},15.625);
            setInterval(function(){edaCurrLine++},250);
            setInterval(function(){hrCurrLine++},1000);
            setInterval(function(){idiCurrLine++},1667);
            setInterval(function(){tempCurrLine++},250);
        };

        reader.readAsText(file);


    };

}
window.onload = init;