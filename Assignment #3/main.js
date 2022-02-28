/*Author: Andrew McKernan
*CS385 HW 2
*  2/9/22
* Summary: initializes canvas, creates a Cube object, and renders it, applies a view, projection, and mv rotate transform
*/



function init() {
    const canvas = document.getElementById("webgl-canvas");
    const gl = canvas.getContext("webgl2");
    gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.CULL_FACE);


    function render() {
        gl.clear(gl.COLOR_BUFFER_BIT, gl.DEPTH_BUFFER_BIT);
        cube.t += .25;


        // cool looking rotate
        cube.MV = mult(rotateX(cube.t),rotateY(cube.t));

        cube.P = perspective(60,1,1,3);
        cube.V = lookAt([-1.5,-1.5,-1.5],[0,0,0], [0,1,1]);

        //Do I need to multiply outside of Cube.html to ensure right order?
        cube.MV = mult(mult(cube.P, cube.V), cube.MV);
        cube.render();
        requestAnimationFrame(render);
    }

   // requestAnimationFrame(render);


    gl.clearColor(0, 0, 0, 1);
    let cube = new Cube(gl);
    render();
}
window.onload = init;



