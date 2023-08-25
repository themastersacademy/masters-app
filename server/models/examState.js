const {Schema, model} = require('mongoose');

const examStateSchema = new Schema({   
    examID:{   
        type:Schema.Types.ObjectId,
        ref:'exam',
        required:true,
    },
    userID:{
        type:Schema.Types.ObjectId,
        ref:'User',
        unique:true,
        required:true,
        
    },
})

module.exports = model('examState',examStateSchema);
