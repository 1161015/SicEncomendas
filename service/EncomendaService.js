const Item = require('../models/Item');

class EncomendaService {

	constructor() { }

	validacaoObrigatoriedade(idItemPai) {
		const pedidoHTTP = require('request');
		let urlPost = "https://sicarqsi2018.azurewebsites.net/api/produto/obrigatoriedade/";
		let idsFilhos = [];
		let i;
		Item.findById(idItemPai, function (err, itemPai) {
			Item.findAll({ itemPai: idItemPai }, function (err, ItensFilhos) {
				ItensFilhos.forEach(element => {
					idsFilhos.push(element.idProduto);
				})
			})
			let args = {
				data: {
					"ProdutoPaiId": itemPai,
					"ProdutosFilhosIds": idsFilhos
				},
				headers: { "Content-Type": "application/json" }
			}
			return new Promise(function (resolve, reject) {
				pedidoHTTP.post(urlPost, args, function (data, response) {
					if (data) return resolve();
					return reject();
				});
			});
		});
	};


	validarTaxaOcupacao(idItemPai) {
		const pedidoHTTP = require('request');
		let urlPost = "https://sicarqsi2018.azurewebsites.net/api/produto/verificarTaxaOcupacao/";

		let idsFilhos = [];
		let i;
		Item.findById(idItemPai, function (err, itemPai) {
			Item.findAll({ itemPai: idItemPai }, function (err, ItensFilhos) {
				ItensFilhos.forEach(element => {
					idsFilhos.push(element.idProduto);
				})
			})
			let volume = calcularVolume(idsFilhos);
			let args = {
				data: {
					"ProdutoPaiId": itemPai,
					"ProdutosFilhosIds": idsFilhos,
					"Volume": volume
				},
				headers: { "Content-Type": "application/json" }
			}
			return new Promise(function (resolve, reject) {
				pedidoHTTP.post(urlPost, args, function (data, response) {
					if (data) return resolve();
					return reject();
				});
			});
		});
	}
	

	calcularVolume(idsFilhos) {
		var i = 0;
		var altura = 0;
		var largura = 0;
		var profundidade = 0;
		var volume = 0;
		var volumeTotal = 0;

		idsFilhos.forEach(element => {
			altura = element.altura;
			largura = element.largura;
			profundidade = element.profundidade;
			volume = altura * largura * profundidade;
			volumeTotal += volume;
		});
		return volumeTotal;
	}
}

module.exports = new EncomendaService();