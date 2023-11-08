// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Separation
// Via Reynolds: http://www.red3d.com/cwr/steer/

// A list of vehicles
let vehicles = [] ;

let slider1;
let slider2;
let slider3;

function setup() {

  createCanvas(640, 640);
  // We are now making random vehicles and storing them in an array
  for (let i = 0; i < 50; i++) {
    vehicles.push(new Vehicle(random(width), random(height)));
  }


}

function draw() {
  background(255);

  for (let v of vehicles) {
    v.applyBehaviors(vehicles);
    v.update();
    v.borders();
    v.show();
  }

}