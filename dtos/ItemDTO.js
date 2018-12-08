class ItemDTO {
    constructor(name, idProduto, idMaterial, idAcabamento, altura, largura, profundidade, unidade) {
        this.name;
        this.idProduto = idProduto;
        this.idMaterial = idMaterial;
        this.idAcabamento = idAcabamento;
        this.altura = altura;
        this.largura = largura;
        this.profundidade = profundidade;

    }
}

module.exports = ItemDTO;