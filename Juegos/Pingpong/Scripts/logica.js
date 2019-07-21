var jugando;
var velocidad;
var velocidadjugador;

var canvas;
var ancho;
var alto;
var ctx;
var puntosJ1;
var puntosJ2;

var tamanobarra = 80;
var superficie;


var bola;
var barraJ1;
var barraJ2;


function dibujar(){
	ctx.clearRect(0,0, ancho, alto);
	bola.dibujarbola();
	barraJ1.dibujar();
	barraJ2.dibujar();
}

function animar(){
	bola.mover();
	barraJ1.mover();
	barraJ2.mover();
	dibujar();
	choque();
	if(puntosJ1<7 && puntosJ2<7){
		jugando = requestAnimationFrame(animar);
	}else{
		if(puntosJ1 == 7){
			ganador("Jugador 1");
		}else{
			ganador("Jugador 2");
		}
	}
}

function ganador(juganador){
	ctx.clearRect(0,0, ancho, alto);
	ctx.fillText("FELICIDADES "+juganador, ancho/4, alto/2);
}

function iniciar(){
	puntosJ1 = 0;
	puntosJ2 = 0;
	velocidad = 3;
	velocidadjugador = 4;
	canvas = document.getElementById('canvas');
	ancho = canvas.width;
	alto = canvas.height;
	superficie = alto - tamanobarra;
	ctx = canvas.getContext("2d");
	bola = new Bola();
	barraJ1 = new Barra(30);
	barraJ2 = new Barra(ancho-50);
	animar();
}




function moverbarra(event){
	var tecla = event.keyCode;
	if(tecla == 79){
		barraJ2.direccion = -velocidadjugador;
	}
	if(tecla == 76){
		barraJ2.direccion = velocidadjugador;
	}
	if(tecla == 87){
		barraJ1.direccion = -velocidadjugador;
	}
	if(tecla == 83){
		barraJ1.direccion = velocidadjugador;
	}
}

function detenerbarra(event){
	var tecla = event.keyCode;
	if(tecla == 79 || tecla == 76){
		barraJ2.direccion = 0;
	}
	if(tecla == 87 || tecla == 83){
		barraJ1.direccion = 0;
	}
}

function choque(){
	if(bola.choque(barraJ1) || bola.choque(barraJ2)){
		bola.direccionX = -bola.direccionX;
	}
}



class BaseGolpe{
	choque(obj){
		if(this.fondo < obj.y || this.y > obj.fondo || this.derecha < obj.x || this.x > obj.derecha){
			return false;
		}else{
			return true;
		}
	}
}


class Bola extends BaseGolpe{
	constructor(){
		super();
		this.img = document.getElementById("bolaimagen");
		this.t = 17;
		this.x = ancho/2;
		this.y = Math.floor(Math.random()*(alto-this.t));
		if(Math.random()>0.5){
			this.direccionX = velocidad;
			this.direccionY = velocidad;
		}else{
			this.direccionX = -velocidad;
			this.direccionY = -velocidad;
		}
		this.p1 = new Puntos(30);
		this.p2 = new Puntos(ancho-50);
	}

	mover(){
		this.x += this.direccionX;
		this.y += this.direccionY;
		this.fondo = this.y+this.t;
		this.derecha = this.x+this.t;
		this.golpeAA();
		this.golpeDI();
	}

	dibujarbola(){
		ctx.drawImage(this.img,this.x,this.y);
		this.p1.dibujar();
		this.p2.dibujar();
	}

	golpeAA(){
		if(this.y<=0 || this.y>=alto-this.t){
			this.direccionY = -this.direccionY;
		}
	}

	golpeDI(){
		if(this.x <=0){
			this.direccionX = -this.direccionX;
			puntosJ2++;
			this.x = ancho/2;
			this.y = Math.floor(Math.random()*(alto-this.t));
			this.p2.punto = puntosJ2;
		}
		if (this.x >= ancho-this.t){
			this.direccionX = -this.direccionX;
			puntosJ1++,
			this.x = ancho/2;
			this.y = Math.floor(Math.random()*(alto-this.t));
			this.p1.punto = puntosJ1;
		}
	}
}

class Barra extends BaseGolpe{
	constructor(x){
		super();
		this.x = x;
		if(this.x==30){
			this.imagen = document.getElementById("barraIzqimagen");
		}else{
			this.imagen = document.getElementById("barraDerimagen");
		}
		this.tamX = 20;
		this.tamY = tamanobarra;
		this.y = Math.floor(Math.random() * superficie);
		this.direccion = 0;
	}

	dibujar(){
		ctx.drawImage(this.imagen,this.x,this.y);
	}

	mover(){
		this.y += this.direccion;
		this.derecha = this.tamX+this.x;
		this.fondo = this.tamY+this.y;
		if(this.y<=0){
			this.y = 0;
			this.direccion = 0;
		}
		if(this.y>=superficie){
			this.y = superficie;
			this.direccion = 0;
		}
	}
}

class Puntos{
	constructor(x){
		this.x = x;
		this.y = 10;
		this.punto = 0;
	}

	dibujar(){
		ctx.font = "10px Arial";
		ctx.fillText(this.punto.toString(), this.x, this.y);
	}
}