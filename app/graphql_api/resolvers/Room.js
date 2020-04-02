module.exports = {
    id(room){
        return room.room_id
    },
    url(room){
        return room.room_url
    },
    name(room){
        return room.room_name
    },
    quantity(room){
        return room.room_qtd
    },
    status(room){
        return room.room_status
    },
    category(category){
        return category
    }
}