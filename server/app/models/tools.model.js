const mongoose = require('mongoose');

const sheetSchema = mongoose.Schema({
    status_sheet:
    {
        profile: Object,
        monitor: Object,
        pool: [Object],
        persistence: Object,
        policy: [Object],
        virtual: [Object],
        node: [Object],
    },
    pivot_sheet: [{
        Status: String,
        F5_type: String,
        F5_SubType: String,
        len: Number,
    }]
})

module.exports = mongoose.model('sheet', sheetSchema);