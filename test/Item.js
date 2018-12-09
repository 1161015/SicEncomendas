process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let Item = require('../models/Item');
let item_controller = require('../controllers/ItemController')
let itemDTO = require('../dtos/ItemDTO')

//Require the dev-dependencies
let chai = require('chai');
let assert = require('chai').assert;
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();


chai.use(chaiHttp);


    describe('Test toDTO', function (){
        it('it should return dto', function() {
            let item = new Item("teste", 1, 1, 1, 10, 10, 10, 1);
            let dto = item.toDTO();
            let itemDTO = new itemDTO("teste", 1, 1, 1, 10, 10, 10, 1);
            assert.equal(dto, itemDTO);
        })
    })
    
