class ItemService {

    constructor() { }

    validarProduto(idProduto) {
        const pedidoHTTP = require('request');
        let url = 'https://sicarqsi2018.azurewebsites.net/api/produto/verificaProduto/';
        let urlFinal = url.concat(idProduto);
        return new Promise(function (resolve, reject) {
            pedidoHTTP(urlFinal, function (error, response, body) {
                console.log(response.statusCode);
                if (response.statusCode != 200) {
                    reject(false);
                } else {
                    resolve(true);
                }
            });
        });
    }



    validarDimensoes(idProduto, altura, largura, profundidade) {
        const pedidoHTTP = require('request');
        let url = 'https://sicarqsi2018.azurewebsites.net/api/produto/validarDimensoes/';
        let url1 = url.concat(idProduto);
        let url2 = url1.concat('/');
        let url3 = url2.concat(altura);
        let url4 = url3.concat('/');
        let url5 = url4.concat(largura);
        let url6 = url5.concat('/');
        let url7 = url6.concat(profundidade);
        return new Promise(function (resolve, reject) {
            pedidoHTTP(url7, function (error, response, body) {
                console.log(url7);
                if (body == 'false') {
                    console.log("dimensao");
                    reject(false);
                } else {
                    resolve(true);
                }
            });
        });
    }

    validarMaterialAcabamento(idProduto, idMaterial, idAcabamento) {
        const pedidoHTTP = require('request');
        let url = 'https://sicarqsi2018.azurewebsites.net/api/produto/verificarMaterialAcabamento/';
        let url1 = url.concat(idProduto);
        let url2 = url1.concat('/');
        let url3 = url2.concat(idMaterial);
        let url4 = url3.concat('/');
        let url5 = url4.concat(idAcabamento);
        console.log(url5);
        return new Promise(function (resolve, reject) {
            pedidoHTTP(url5, function (error, response, body) {
                if (body == 'false') {
                    console.log("acabamento");
                    reject(false);
                } else {
                    resolve(true);
                }
            });
        });
    }

}

module.exports = new ItemService();
