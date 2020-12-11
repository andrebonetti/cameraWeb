// TUDO QUE FICA DENTRO DESSA '$(function()' É EXECUTADO APOS O HTML SER GERADO 
$(function(){

    // VARIAVEIS DO HTML
    var camera = $('#camera');
    var canvas = $('#canvas');
    var imagemCaptura = $(".imagem-capturada");

    var botaoCapturar = $('#capturar');
    var botaoConfirmar = $('#confirmar');
    var botaoTrocar = $('#trocar');

    // ACOES INICIAIS
    imagemCaptura.hide();
    canvas.hide();
    botaoTrocar.hide();
    botaoConfirmar.hide();

    // CONECTAR CAMERA AO ELEMENTO DE VIDEO DO HTML
    navigator.mediaDevices.getUserMedia({ video: true }).then(function (stream) {
        camera[0].srcObject = stream;
        camera[0].play();
    });

    // FUNCAO QUE CONGELA O VIDEO DA CAMERA
    // EXIBE NO ELEMENTO CANVAS PARA PRE VISUALIZACAO DO USUARIO
    // GRAVA NO ELEMENTO IMG PARA SER ENVIADO
    var capturar = function() {
        var image = {};
        canvas[0].width = camera.outerWidth();
        canvas[0].height = camera.outerHeight();
        image.context = canvas[0].getContext('2d');
        image.context.drawImage(camera[0], 0, 0, camera.outerWidth(), camera.outerHeight());
        image.camImage = canvas[0].toDataURL('image/png');
        canvas.show();
        camera.hide();
        imagemCaptura.attr('src', image.camImage);
    }

    // EVENTOS DOS BOTOES
    botaoCapturar.click(function () {
        capturar();

        botaoCapturar.hide();
        botaoTrocar.show();
        botaoConfirmar.show();
    });

    botaoTrocar.click(function () {
        canvas.hide();
        camera.show();

        botaoTrocar.hide();
        botaoConfirmar.hide();
        botaoCapturar.show();
        
    });

    

});