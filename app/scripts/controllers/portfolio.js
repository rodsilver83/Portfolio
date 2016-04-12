'use strict';

/**
 * @ngdoc function
 * @name portfolioApp.controller:PortfolioCtrl
 * @description
 * # PortfolioCtrl
 * Controller of the portfolioApp
 */
angular.module('portfolioApp')
  .controller('PortfolioCtrl', function ($scope) {

    $scope.activeLink = 'Home';
    var goAboutInterval = null;
    $scope.go = function(link){
      $scope.activeLink = link;
      T = 0;
      goAboutInterval = setInterval(speedParticlesX,24);
      END_GRADIENT = "#ffffff";
    };

    var canvas = document.getElementById("canvas-element");
    resizeCanvas();
    var context = canvas.getContext("2d");

    var particles = [];
    var dots = Math.floor(window.innerWidth/10);

    var MAX_VEL = 0.2;
    var MIN_VEL = 0.01;

    var MAX_DISTANCE = 150;//px
    var WINDOW_OFFSET = 50;//px

    var CONST_VY = -0.4;
    var CONST_VX = -0.0;
    var MAX_CONST_VX = -0.0;

    var DOT_COLOR = "#2A4F6E";
    var START_GRADIENT = "#042037";
    var END_GRADIENT = "#003A23";

    var INIT_SIZE_DOT = 0;

    var DOT_GROW_SIZE = 0.5;
    if(window.innerWidth >= 992){
      initCanvas();
    }

    var date = new Date();

    var T = 0;
    function speedParticlesX(){
      T+=20;
      var ease = easeInOutQuad(T,0,1,2000);
      if(ease < 0) {
        clearInterval(goAboutInterval);
        CONST_VX = 0;
      }else{
        CONST_VX = ease * MAX_CONST_VX;
      }
    }

    /**
     *
     * @param t current Time
     * @param b start Value
     * @param c change in value
     * @param d duration
     * @returns {*}
     */
    function easeInOutQuad(t, b, c, d) {
      t /= d/2;
      if (t < 1) return c/2*t*t + b;
      t--;
      return -c/2 * (t*(t-2) - 1) + b;
    };

    function easeInQuad(t, b, c, d) {
      t /= d;
      return c*t*t + b;
    };

    /**
     * Created by Rodrigo on 4/6/16.
     */

    function initCanvas() {
      for (var i = 0; i < dots; i++) {
        particles.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          vx: randomVelX(i),
          vy: randomVelY(i),
          size: INIT_SIZE_DOT,
          color: DOT_COLOR,
          id: 0
        });
      }

      setInterval(frameUpdate,20);
    }

    function randomVelX(i){
      if( i % 4 == 0){
        return -Math.random()*MAX_VEL-MIN_VEL;
      }
      if( i % 4 == 1){
        return Math.random()*MAX_VEL+MIN_VEL;
      }
      return 0.0;
    }

    function randomVelY(i){
      if( i % 4 == 2){
        return -Math.random()*MAX_VEL-MIN_VEL;
      }
      if( i % 4 == 3){
        return Math.random()*MAX_VEL+MIN_VEL;
      }
      return 0.0;
    }

    function frameUpdate(){
      context.clearRect(0, 0, window.innerWidth, window.innerHeight);
      //fillCanvasGradient();
      for( var i = 0; i < particles.length; i++ ) {
        particles[i].size = INIT_SIZE_DOT;
        particles[i].id = i;
        moveParticles(i);
        calculateLines(i);
        drawDot(particles[i]);
      }
    }

    function fillCanvasGradient(){
      // Create gradient
      var grd = context.createLinearGradient(0,0,0,window.innerHeight);
      grd.addColorStop(0,START_GRADIENT);
      grd.addColorStop(1,END_GRADIENT);

      // Fill with gradient
      context.fillStyle = grd;
      context.fillRect(0,0,window.innerWidth,window.innerHeight);
    }

    function calculateLines(i){
      for(var j=i + 1; j<particles.length; j++){
        var distance = distanceBetweenDots(particles[i],particles[j]);
        if(distance < MAX_DISTANCE){
          particles[i].size += DOT_GROW_SIZE;
          particles[j].size += DOT_GROW_SIZE;
          drawLine(particles[i],particles[j], distance);
        }
      }
    }

    function drawLine(p1,p2, distance) {
      //context.strokeStyle = DOT_COLOR;
      //0.164 0.309 0.431 1
      var alpha = 1 - ( distance / MAX_DISTANCE);
      if(alpha > 1) {
        alpha = 1;
      }
      if(alpha < 0) {
        alpha = 0;
      }

      context.moveTo(p1.x,p1.y);
      context.strokeStyle = "rgba(42, 79, 110, "+alpha+")";
      context.lineTo(p2.x,p2.y);
      context.stroke();

      //Test Alpha
      //testLineAlpha(p1,p2,alpha);
    }

    function testLineAlpha(p1,p2,alpha){
      context.font = "15px Arial";
      context.fillStyle = "rgba(42, 79, 110, "+alpha+")";
      context.fillText(alpha,p1.x + ((p2.x-p1.x)/2),p1.y + ((p2.y-p1.y)/2));
    }

    function distanceBetweenDots(p1,p2) {
      var dx = 0;
      if(p1.x > p2.x){
        dx = p1.x - p2.x;
      }else{
        dx = p2.x - p1.x;
      }
      var dy = 0;
      if(p1.y > p2.y){
        dy = p1.y - p2.y;
      }else{
        dy = p2.y - p1.y;
      }
      return Math.sqrt(dx*dx + dy*dy);
    }

    function moveParticles(i){
      particles[i].y += particles[i].vy + CONST_VY;
      particles[i].x += particles[i].vx + CONST_VX;

      if(particles[i].x > window.innerWidth + WINDOW_OFFSET){
        particles[i].x = - WINDOW_OFFSET;
      }

      if(particles[i].x < -WINDOW_OFFSET){
        particles[i].x = window.innerWidth + WINDOW_OFFSET;
      }

      if(particles[i].y > window.innerHeight + WINDOW_OFFSET){
        particles[i].y = - WINDOW_OFFSET;
      }

      if(particles[i].y < - WINDOW_OFFSET){
        particles[i].y = window.innerHeight + WINDOW_OFFSET;
      }
    }

    function drawDot(dot) {
      context.fillStyle = dot.color;
      context.beginPath();
      context.arc(dot.x, dot.y, dot.size, 0, 2 * Math.PI);
      context.closePath();
      context.fill();

      //Test Text
      //context.font = "15px Arial";
      //context.fillText(dot.id,dot.x+5,dot.y-5);
    }

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
  });
