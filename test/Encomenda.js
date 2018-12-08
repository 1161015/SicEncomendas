process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let Encomenda = require('../models/Encomenda');
let Item = require('../models/Item');
let encomenda_controller = require('../controllers/EncomendaController')
let encomenda_service = require('../service/EncomendaService')
let assert = require('assert');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();


chai.use(chaiHttp);

/*describe('Test toDTO', function (){
    it('it should return dto', function() {
        let item = new Item({name:"teste", idMaterial:1, idAcabamento:1, altura:1, largura:10, profundidade:10, unidade:10});
        let itens = [item];
        let encomenda = new Encomenda({name:"teste",itens: []})
        let dto = encomenda.toDTO();
        let encomendaDTO = new encomendaDTO({name:"teste",itens: []});
        assert.equal(dto, encomendaDTO);
    })
})*/

describe('Test calcularVolume', function(){
    it('it should return',function(){
        let item = new Item({name:"teste", idMaterial:1, idAcabamento:1, altura:10, largura:10, profundidade:10, unidade:10});
        let item2 = new Item({name:"teste", idMaterial:1, idAcabamento:1, altura:10, largura:10, profundidade:10, unidade:10});
        
        var itensL = new Array();
        itensL.push(item);

        let encomenda = new Encomenda({name:"teste",itens:itensL});

        let volume = encomenda_service.calcularVolume(itensL,1); 

        let v = 1000;
        assert.equal(1000,v);

        itensL.push(item2);
        let volume2 = encomenda_service.calcularVolume(itensL,1); 
        let v2 = 2000;
        assert.equal(2000,v2);
    })
})