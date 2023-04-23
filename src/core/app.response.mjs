export function badRequest(res){
    res.status(500).json({
        tm:'Ýalňyşlyk ýüze çykdy',
        en: 'Something went wrong'
    })
}

export function resGenerator(body){
    return {
        error: false,
        message:'success',
        body: body
    }
}