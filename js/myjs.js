/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */



function mostrar(id) {
  
    $('#' + id).css('display', '');
}

function redondear(valor) {
    var amt = parseFloat(valor);
    return (amt.toFixed(2));
}

function ocultar(id) {
    $('#' + id).css('display', 'none');
}
