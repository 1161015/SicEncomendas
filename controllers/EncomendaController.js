const Encomenda = require('../models/encomenda');
const Item = require('../models/Item');
const DTO = require('../dtos/EncomendaDTO');
const ItemDTO = require('../dtos/ItemDTO');
const Service = require('../service/EncomendaService')

var itensArvore = [];
exports.encomenda_post = async function (req, res, next) {
    //let validacaoObrigatoriedade = Service.validacaoObrigatoriedade(req.body.idProduto);
    //let validarTaxaOcupacao = Service.validarTaxaOcupacao(req.body.idProduto);
    itensArvore = [];
    let i;
    let filhos = false;
    //let inserirPais = inserirPais(req.body.itens);
    console.log(itensArvore);

   // Promise.all([inserirPais]).then(function (result) {

        let new_encomenda = new Encomenda(
            {
                name: req.body.name,
                itens: req.body.itens
            }
        );

        new_encomenda.save(function (err) {
            if (err) {
                return next(err);
            }
            //let encomendaDTO = new_encomenda.toDTO();
            res.send(new_encomenda);
        });
  //  });
}


exports.findAll = function (req, res, next) {
    Encomenda.find({}).populate({
        path: 'itens',
        populate: {
            path: 'itemPai'
        }
    }).exec(function (err, encomenda) {
        if (err) return next(err);
        // let encomendasDTO = [];
        let i;
        /*  for (i = 0; i < encomenda.length; i++) {
              encomendasDTO.push(encomenda[i].toDTO());
          }*/
        res.send(encomenda);
    })
}

exports.encomenda_get = function (req, res, next) {
    Encomenda.findById(req.params.id).populate({
        path: 'itens',
        populate: {
            path: 'itemPai'
        }
    }).exec(function (err, encomenda) {
        if (err) return next(err);
        //let encomendaDTO = encomenda.toDTO();
        res.send(encomenda);
    })
};

exports.encomenda_delete = function (req, res, next) {
    Encomenda.findById(req.params.id, function (err, encomenda) {
        console.log(encomenda.itens);
        encomenda.itens.forEach(element => {
            Item.item_delete;
        });
    })

    Encomenda.findByIdAndRemove(req.params.id, function (err) {
        if (err) return next(err);
        res.send('Deleted successfully!');
    })

};

exports.encomenda_put = function (req, res, next) {
    Encomenda.findByIdAndUpdate(req.params.id, { $set: req.body }, function (err, encomenda) {
        if (err) return next(err);
        res.send("Updated Successfully");
    });
};

exports.get_itens = function (req, res, next) {
    Encomenda.findById(req.params.id).populate({
        path: 'itens',
        populate: {
            path: 'itemPai'
        }
    }).exec(function (err, encomenda) {
        if (err) return next(err);
        // let encomendaDTO = encomenda.toDTO();
        res.send(encomenda.itens);
    })
};

exports.get_item = function (req, res, next) {
    Encomenda.findById(req.params.id1, function (err, encomenda) {
        if (err) return next(err);
        encomenda.itens.forEach(element => {
            if (element == req.params.id2) {
                Item.findById(req.params.id2, function (err, item) {
                    if (err) return next(err);
                    //  let itemDTO = item.toDTO();
                    res.send(item);
                })
            }

        })
    })
};

function inserirPais(itens){
    for (i = 0; i < itens.length; i++) {
        console.log(i)
        console.log(itens[i]);
        Item.findById(itens[i]).exec(function (err, itemRecebido) {
            if (err) return next(err);
            preencherItens(itemRecebido);
        })
        console.log(i);
        if (i == itens.length) {
            filhos = true;
        }
    }
    if (filhos) return resolve();
    return reject();
}

function preencherItens(item) {
    console.log("AAA");
    console.log(item._id);
    itensArvore.push(item._id);
    console.log(itensArvore);
    console.log(item.itemPai);
    if (item.itemPai != null) {
        itensArvore.push(item.itemPai._id);
    }
}



