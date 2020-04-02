// APENAS PARA FIM DE TESTE
let id = 1

function proximoId(){
    return id++
}

const categories = [
    { id: 1, url: 'nerd', name: 'nerd', status: 1 },
    { id: 2, url: 'musica', name: 'musica', status: 1 }
]

const rooms = [{
    id: proximoId(),
    url: 'hq',
    name: 'hq',
    qtd: 20,
    category_id: 2,
    status: 1
}, {
    id: proximoId(),
    url: 'manga',
    name: 'manga',
    qtd: 22,
    category_id: 1,
    status: 1
}, {
    id: proximoId(),
    url: 'gospel',
    name: 'gospel',
    qtd: 20,
    category_id: 2,
    status: 1
}]

module.exports = { categories, rooms, proximoId }