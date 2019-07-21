
var jugando;

$(document).ready(inicio);
$(document).keydown(capturaTeclado);

function inicio(){
	jugando = true;
	miCanvas = $("#mi_canvas")[0];
	contexto = miCanvas.getContext("2d");
	buffer = document.createElement("canvas");
	gallina = new Gallina();
	carro = [new Carro(), new Carro(),
				   new Carro(), new Carro(), new Carro()];
	run();	
	
	$('#instrucciones').click(function(){
        $('#popup').fadeIn('slow');
        $('.popup-overlay').fadeIn('slow');
        $('.popup-overlay').height($(window).height());
        return false;
    });
    
    $('#close').click(function(){
        $('#popup').fadeOut('slow');
        $('.popup-overlay').fadeOut('slow');
        return false;
    });
    
    $("#iniciar").click(function(){	
		if(jugando==false)
			inicio();	
	});
}

function capturaTeclado(event){
	if(event.which==38 || event.which==87)
		gallina.actualizar('arriba');
	if(event.which==40 || event.which==83)
		gallina.actualizar('abajo');
	if(event.which==39 || event.which==68)
	gallina.actualizar('derecha');
	if(event.which==37 || event.which==65)
		gallina.actualizar('izquierda');
	
}

function run(){ 
	buffer.width = miCanvas.width;
	buffer.height = miCanvas.height;
	contextoBuffer = buffer.getContext("2d");
		 
	if(jugando){  
		contextoBuffer.clearRect(0,0,buffer.width,buffer.height);

		gallina.dibujar(contextoBuffer);
		for(i=0;i<carro.length;i++){
			carro[i].dibujar(contextoBuffer);
			carro[i].actualizar();
			if(gallina.colision(carro[i].x+40,carro[i].y)){
				gallina.sprite = 2;
				gallina.vida--;
				$('#pierde')[0].play();
			}
		}
		
		if(gallina.vida <= 0)
			jugando = false;
		
		contexto.clearRect(0,0,miCanvas.width,miCanvas.height);
		contexto.drawImage(buffer, 0, 0);
		setTimeout("run()",20);
		
	}else{
		contextoBuffer.clearRect(0,0,buffer.width,buffer.height);
		contextoBuffer.fillStyle = "#ffffff";
		gallina.sprite = 3;
		gallina.vida = 0;
		gallina.dibujar(contextoBuffer);
	


contextoBuffer.fillStyle = "red";	contextoBuffer.font = "50px sans-serif";
		
contextoBuffer.fillText("PERDISTE", 200, 50);
		contextoBuffer.fillStyle = "red";
		contexto.clearRect(0,0,miCanvas.width,miCanvas.height);
		contexto.drawImage(buffer, 0, 0);
	}
	
}


