const router = require('express').Router();

router.get('/notes', (req,res) => {
    res.send('Notas de basde de datos');
});

module.exports = router;