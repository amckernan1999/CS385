
/*Author: Andrew McKernan
*CS385 HW 2
*  2/9/22
* Summary: initializes canvas, creates a cone object, and renders it
*/
 
function init() {
    const canvas = document.getElementById("webgl-canvas");
    const gl = canvas.getContext("webgl2");

    function render() {
        gl.clear(gl.COLOR_BUFFER_BIT);
        cone.render();
    }

    gl.clearColor(0, 0, 0, .5);
    let cone = new Cone(gl, 300);
    render();
}
window.onload = init;



