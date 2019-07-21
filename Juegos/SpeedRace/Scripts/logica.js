var jugando;

var velocidad;

var canvas;
var ancho;
var alto;
var ctx;

var jugador1;
var jugador2;
var jugador3;
var jugador4;



function iniciar(){
	velocidad = 2;
	canvas = document.getElementById('jcanvas');
	ancho = canvas.width;
	alto = canvas.height;
	ctx = canvas.getContext("2d");

	jugador1 = new Carro(1);
	jugador2 = new Carro(2);
	jugador3 = new Carro(3);
	jugador4 = new Carro(4);

	animar();
}

function animar(){
	dibujar();
	if(!jugador1.llegada() && !jugador2.llegada() && !jugador3.llegada() && !jugador4.llegada()){
		jugando = requestAnimationFrame(animar);
	}else{
		if(jugador1.llegada()){
			ganador(jugador1.nombre);
		}else if(jugador2.llegada()){
			ganador(jugador2.nombre);
		}else if(jugador3.llegada()){
			ganador(jugador3.nombre);
		}else{
			ganador(jugador4.nombre);
		}
	}
}

function dibujar(){
	ctx.clearRect(0,0, ancho, alto);
	jugador1.dibujar();
	jugador2.dibujar();
	jugador3.dibujar();
	jugador4.dibujar();
}

function ganador(juganador){
	ctx.clearRect(0,0, ancho, alto);
	ctx.fillStyle="#55FF00";
	ctx.fillRect(25, 15, ancho-50, alto-30);
	ctx.fillStyle="#000000";
	ctx.font = "25px Arial";
	ctx.fillText("Ganador: "+juganador, ancho/8, alto/2);
}

function mover(event){
	var tecla = event.keyCode;
	if(tecla == 83){
		jugador1.mover();
	}
	if(tecla == 66){
		jugador2.mover();
	}
	if(tecla == 76){
		jugador3.mover();
	}
	if(tecla == 13){
		jugador4.mover();
	}
}






class Carro{
	constructor(tipo){
		this.tipo = tipo;
		this.x = 0;
		switch(this.tipo){
			case 1:
				this.y = 7;
				this.img = document.getElementById('carro1');
				this.nombre = "Jugador 1";
			break;
			case 2:
				this.y = 45;
				this.img = document.getElementById('carro2');
				this.nombre = "Jugador 2";
			break;
			case 3:
				this.y = 80;
				this.img = document.getElementById('carro3');
				this.nombre = "Jugador 3";
			break;
			case 4:
				this.y = 118;
				this.img = document.getElementById('carro4');
				this.nombre = "Jugador 4";
			break;
		}
	}

	dibujar(){
		ctx.drawImage(this.img, this.x, this.y);
	}

	mover(){
		this.x += velocidad;
	}

	llegada(){
		if(this.x+54>=ancho-10){
			return true;
		}else{
			return false;
		}
	}
}