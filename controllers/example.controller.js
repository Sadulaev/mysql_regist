//Контроллер для проверки работоспособности

module.exports.exampleController = {
    showMessage: async (req, res) => {
        res.json('Пример удался')
    }
}