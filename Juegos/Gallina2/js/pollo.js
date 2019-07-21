function Quica(){
	this.x = 310;
	this.y = 15;
	this.img = [$("#abajo")[0],$("#arriba")[0],$("#muerto")[0],$("#izquierda")[0],$("#derecha")[0],$("#choque")[0]];
	this.sprite = 0;
	this.vida = 100;
	this.puntos = 0;
	this.seguro = "arriba";

	this.dibujar = function(ctx){
		var img = this.img[this.sprite];
		var x = this.x;
		var y = this.y;
		ctx.drawImage(img, x, y);
		ctx.save();
		//Texto de vida y puntos
		ctx.font = "14px sans-serif";
		var gradient = ctx.createLinearGradient(0, 0, 90, 0);
		gradient.addColorStop("0","magenta");
		gradient.addColorStop("0.5", "blue");
		gradient.addColorStop("1.0", "red");
		ctx.fillStyle = gradient;
		ctx.fillText("Puntos: "+ this.puntos, 15, 15);
		ctx.fillText("Vida: "+ this.vida, 15, 30);
		ctx.fillText("Ultimo seguro: "+ this.seguro, 15, 45);
		//ctx.fillText("Puntos: "+ this.puntos, x, y + 65);
		//ctx.fillText("Vida: "+ this.vida, x, y);
		//ctx.fillText("Ultimo seguro: "+ this.seguro, x, y+75);
		if(this.sprite==5){
			ctx.fillStyle = "#ff0000";
			ctx.font = "20px sans-serif";
			ctx.fillText("HEY!!!!", x+65, y + 25);
		}
		ctx.restore();
	}

	this.actualizar = function(accion){
		if(accion=="arriba" && this.y > 15){
			this.y -= 10;
			this.sprite = 1;
		}
		if(accion=="abajo"  && this.y < 390){
			this.y += 10;
			this.sprite = 0;
		}
		if(accion=="izquierda"){
			this.x -= 10;
			this.sprite = 3;
		}
		if(accion=="derecha"){
			this.x += 10;
			this.sprite = 4;
		}
		this.x = (640 + this.x)%640;
		this.y = (480 + this.y)%480;

		if(this.y > 340 && this.seguro == "arriba"){
			this.seguro = "abajo";
			this.puntos++;
		}
		if(this.y < 20 && this.seguro == "abajo"){
			this.seguro = "arriba";
			this.puntos++;
		}
	}

	this.colision = function(x,y){
		var distancia=Math.sqrt( Math.pow( (x-this.x), 2)+Math.pow( (y-this.y),2));
		if(distancia>this.img[this.sprite].width)
		   return false;
		else
		   return true;
	}
}
