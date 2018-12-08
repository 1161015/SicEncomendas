var mongoose     = require('mongoose');
var idvalidator = require('mongoose-id-validator');
var Schema       = mongoose.Schema;
var itemDTO = require('../dtos/ItemDTO')

var ItemSchema   = new Schema({
    name : {type: String, required: 'Nome obrigatório'},
    idProduto: {type: Number, require: 'Produto obrigatório'},
    idMaterial : {type: Number, required: 'Material obrigatório'},
    idAcabamento : {type: Number, required: 'Acabamento obrigatório'},
    altura : {type:Number, min:0, required: 'Altura obrigatória'},
    largura : {type:Number, min:0, required: 'Altura obrigatória'},
    profundidade : {type:Number, min:0, required: 'Altura obrigatória'},
    unidade : {type: Number, required: 'Unidade obrigatória'},
    itemPai : { type: Schema.Types.ObjectId, ref: "Item", autopopulate:true}
});

var Item = mongoose.model('Item', ItemSchema);

ItemSchema.methods.toDTO = function(){
    let itemPaiDTO;
   /* if(this.itemPai!=null){
        itemPaiDTO = this.itemPai.toDTO();
    }
    let dto =  new itemDTO(this.name, this.idProduto, this.idMaterial, this.idAcabamento
        , this.altura, this.largura, this.profundidade, this.unidade, itemPaiDTO);*/
        let dto = new itemDTO("x",1,1,1,10,10,10,1, itemPaiDTO);

    return dto;
}

ItemSchema.plugin(idvalidator);
ItemSchema.plugin(require("mongoose-autopopulate"));

module.exports = mongoose.model('Item', ItemSchema);
