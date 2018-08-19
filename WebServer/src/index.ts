import tablero from './tablero';

let asd = new tablero(8);

//console.log(asd.getLegalMoves(1));
console.log('Inicio de juego...');
console.log(asd.tableroJuego);
asd.movida([4,2],1);
console.log('Turno 1: Blanco');
console.log(asd.tableroJuego);
asd.movida([5,2],2);
console.log('Turno 2: Negro');
console.log(asd.tableroJuego);