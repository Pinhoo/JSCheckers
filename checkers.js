const squares = document.getElementsByClassName('square');

let addOne = false;
let selectedId = -1;

//Coloca cor e o onClick de cada quadrado
for(let i = 0; i < squares.length; i++ ){
    
    squares[i].addEventListener("click", function() {
        jogada(i);
    });

    //Inverte as cores toda troca de coluna
    if(i % 8 == 0){
        addOne = !addOne;
    }
    
    //Adiciona a cor
    squares[i].classList.add('gridColor'+ ((i + addOne) % 2 ));
    
    //APENAS PARA DEBUG!
    squares[i].innerHTML =`<h1>` + i + `</h1>`; 
} 

//Função principal do jogo, todo click em um quadrado leva para ela.
function jogada (idE) {

    //Se uma jogada for feita, realiza o swap
    if(squares[idE].classList.contains('showPossibleMoves')){
        changePiecePosition(idE);
    }

    else{
        //Apaga o espectro de jogadas possíveis
        for(let i = 0; i < squares.length; i++ ){
            squares[i].classList.remove('showPossibleMoves');
        }   

        //Verifica se uma peça foi selecionada
        if(squares[idE].classList.contains('checkerSquare')){
            checkersMechanics(idE);
        }
    }

    //Se qualquer jogada for feita sem selecionar a peça, tira o marcador
    if(!squares[idE].classList.contains('selectedPiece') && selectedId != -1){
        squares[selectedId].classList.remove('selectedPiece');
        selectedId = -1;
    }

    

}

function checkersMechanics(idE){
    //Tira o marcador da peça selecionada anterior
    if(selectedId != -1){
        squares[selectedId].classList.remove('selectedPiece');
    }

    //Marca a peça como a selecionada atual
    squares[idE].classList.add('selectedPiece');
    selectedId = idE;

    //Possivel Move Esquerda
    if(idE % 8 != 0 && squares[idE - 9].classList.contains('blankSquare')){
        squares[idE - 9].classList.add('showPossibleMoves');
    }
   
    //Possivel Move Direita
    if((idE - 7) % 8 != 0 && squares[idE - 7].classList.contains('blankSquare')){
        squares[idE - 7].classList.add('showPossibleMoves');
    }


}

function changePiecePosition (idE){
    //Troca as classes entre selecionado e posição nova
    if(squares[selectedId].classList.contains('checkerSquare')){
        squares[selectedId].classList.replace('checkerSquare', 'blankSquare')
        squares[idE].classList.replace('blankSquare', 'checkerSquare')
    }

    selectedId = -1;
    for(let i = 0; i < squares.length; i++ ){
        squares[i].classList.remove('showPossibleMoves');
        squares[i].classList.remove('selectedPiece');
    }   


}