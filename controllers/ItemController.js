const Item = require('../models/Item');
const Service = require('../service/ItemService');
const DTO = require('../dtos/ItemDTO');
const EncomendaDTO = require('../dtos/EncomendaDTO');

exports.item_post = function (req, res, next) {
    let validacaoProduto = Service.validarProduto(req.body.idProduto);
    let validacaoMaterialAcabamento = Service.validarMaterialAcabamento(req.body.idProduto, req.body.idMaterial, req.body.idAcabamento);
    let validacaoDimensoes = Service.validarDimensoes(req.body.idProduto, req.body.altura, req.body.largura, req.body.profundidade);
    Promise.all([validacaoProduto, validacaoMaterialAcabamento, validacaoDimensoes]).then(function (result) {
        let new_item = new Item(
            {
                name: req.body.name,
                idProduto: req.body.idProduto,
                idMaterial: req.body.idMaterial,
                idAcabamento: req.body.idAcabamento,
                altura: req.body.altura,
                largura: req.body.largura,
                profundidade: req.body.profundidade,
                unidade: req.body.unidade,
                itemPai: req.body.itemPai

            }
        );

        new_item.save(function (err) {
            if (err) {
                return next(err);
            }

           itemDTO = new_item.toDTO();
            res.send(itemDTO);
        });
    }).catch (result => res.send(result));

};

exports.findAll = function (req, res, next) {
    Item.find({}).populate({
        path : 'itens',
        populate:{
            path: 'itemPai'
        }
    }).exec(function (err, itens) {
        if (err) return next(err);
         let itensDTO = [];
        let i;
       /* for (i = 0; i < itens.length; i++) {
            itensDTO.push(itens[i].toDTO());
        }*/
        res.send(itens);
    })
}

exports.item_get = function (req, res, next) {
    Item.findById(req.params.id).populate({
        path : 'itens',
        populate:{
            path: 'itemPai'
        }
    }).exec(function (err, item) {
        if (err) return next(err);
        //let itemDTO = item.toDTO();
        res.send(item);
    })
};

exports.item_delete = function (req, res, next) {

    /* Item.deleteMany({itemPai : req.params.id}, function (err) {
         if (err) return next(err);
     })*/

    Item.findByIdAndRemove(req.params.id, function (err) {
        if (err) return next(err);
        res.send('Deleted successfully!');
    })
};

exports.item_put = function (req, res, next) {
    Item.findByIdAndUpdate(req.params.id, { $set: req.body }, function (err, item) {
        if (err) return next(err);
        res.send("Updated Successfully");
    });
};

