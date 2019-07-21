function aleatorio(piso,techo){
	return Math.floor(Math.random() * (techo - piso) + piso);
}

function Calaca(x,y){
	//var opc = aleatorio(1,100) % 2;
	var opc = aleatorio(1,5);
	if(opc==1)
		this.img = $("#auto1_der")[0];
	else if (opc==2)
		this.img = $("#auto2_der")[0];
	else if (opc==3)
		this.img = $("#auto3_der")[0];
	else
		this.img = $("#auto4_der")[0];
	this.x = aleatorio(0,620);
	this.y = aleatorio(100,330);
	this.velocidad = 0;
	while(this.velocidad == 0)
		this.velocidad=aleatorio(-6,6);

	this.dibujar = function(ctx){
		var img = this.img;
		ctx.drawImage(img,this.x,this.y);
	}

	this.actualizar = function(){
		this.x += this.velocidad;
		this.x = (640 + this.x)%640;
	}
}
