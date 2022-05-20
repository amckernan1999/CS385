//Modified cube to act as the room
// The front face is removed and that is where the eye goes

function Cube(gl) {

    var program = initShaders(gl, "Cube-vertex-shader", "Cube-fragment-shader");

    var positions = [
        //x   y   z
        -2,-2,-2,  //0
        2,-2,-2,   //1
        2,2,-2,    //2
        -2,2,-2,   //3
        2,2,2,     //4
        2,-2,2,    //5
        -2,-2,2,   //6
        -2,2,2     //7
    ];

    //determined by looking at which 3 vertices must contribute to make a triangle
   // var indices = [7,6,4,4,6,5,];
    var indices = [0,6,3,3,6,7,7,6,4,4,6,5,5,1,2,2,4,5,5,6,1,1,6,0,2,3,7,7,4,2];





    positions.numComponents = 3;

    this.uniforms = {
        t : gl.getUniformLocation(program, "t"),
        MV : gl.getUniformLocation(program, "MV"),
        P : gl.getUniformLocation(program, "P"),
        V : gl.getUniformLocation(program, "V")
    };
    this.P = mat4();

    this.t = 0;


    positions.buffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, positions.buffer );
    gl.bufferData( gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW );

    indices.buffer = gl.createBuffer();
    gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, indices.buffer );
    gl.bufferData( gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW );



    positions.aPosition = gl.getAttribLocation( program, "aPosition" );
    gl.enableVertexAttribArray( positions.aPosition );

    this.MV = mat4();
    let MV = gl.getUniformLocation(program, "MV");
    this.P = mat4 ();
    let P = gl.getUniformLocation(program,"P");
    this.V = mat4();
    let V = gl.getUniformLocation(program,"V");

    this.render = function () {
        gl.useProgram( program );

        gl.bindBuffer( gl.ARRAY_BUFFER, positions.buffer );
        gl.vertexAttribPointer( positions.aPosition, positions.numComponents,
            gl.FLOAT, false, 0, 0 );

        gl.uniformMatrix4fv(MV, false, flatten(this.MV));
        gl.uniformMatrix4fv(P, false, flatten(this.P));
        gl.uniformMatrix4fv(V, false, flatten(this.V));


        // Render the solid version of the cube
        gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, indices.buffer );
        gl.drawElements( gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0 );
    }
};