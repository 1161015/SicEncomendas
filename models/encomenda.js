const mongoose     = require('mongoose');
var idvalidator = require('mongoose-id-validator');
const Schema       = mongoose.Schema;
var encomendaDTO = require('../dtos/EncomendaDTO');

var EncomendaSchema = new Schema({
    name: {type: String, required: 'Nome obrigatório'},
    itens: [{ type: Schema.Types.ObjectId, ref: 'Item' , autopopulate:true}]
});

function encomendaDTO(encomenda){
    return {
        name: encomenda.name,
        itens: encomenda.itens
      }
  }
 

EncomendaSchema.methods.toDTO = function(){
    let itensDTO = [];
    let i;
    for (i = 0; i < this.itens.length; i++) {
            itensDTO.push(this.itens[i].toDTO());
    }

    let dto = new encomendaDTO(this.name,itensDTO);
    return dto;
}

EncomendaSchema.plugin(idvalidator);
EncomendaSchema.plugin(require("mongoose-autopopulate"));

module.exports = mongoose.model('Encomenda', EncomendaSchema);
