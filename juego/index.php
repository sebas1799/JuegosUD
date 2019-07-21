<!DOCTYPE html>
<html>
	<head>
		<link rel="stylesheet" type="text/css" href="style.css">
		<title>Juegos Friv UD</title>
		<meta charset="UTF-8">
		<style>
	</style>
	</head>
	<body>
	<form action="index.php" method="POST">
			<h1><center> JUEGOS FRIV UD </h1>
			<center>
				<br><br>
					<input type="text" name="usuario_juego">
				<br><br>
				<button type="submit">Ingresar</button>
			</center>
		</form>
	<?php
	if ($_POST)
	{
		if ($_POST['usuario_juego'] =="")
		{
			?>
			<h3><center> Falta registrar un usuario </h3>
			<?php
			
		}
		else
		{
			$usuario_V=$_POST['usuario_juego'];
			$usuario = "root";
			$password = "123456789";  // en mi caso tengo contraseña pero en casa caso introducidla aquí.
			$servidor = "localhost";
			$basededatos = "juegos";
			$conn = mysqli_connect($servidor, $usuario, $password, $basededatos);
			if (!$conn) {
				die("Connection failed: " . mysqli_connect_error());
				echo "error";
			}
			$consulta = "SELECT * FROM usuarios where idusuarios = '$usuario_V'";
			$resultado = mysqli_query( $conn, $consulta ) or die ( "Algo ha ido mal en la consulta a la base de datos");
			if ($columna = mysqli_fetch_array($resultado))
			{
				header("Location: /juego/menu.php?usuario=$columna[idusuarios]");
				
			}
			else
			{
				$crear_usuario ="INSERT INTO usuarios (idusuarios) values ('$usuario_V');";
				$resultado = mysqli_query($conn, $crear_usuario);
				header("Location: /juego/menu.php?usuario=$usuario_V");
			}
			mysqli_close($conn);
		}
	}
	?>
	
		
	</body>
</html>