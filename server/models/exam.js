const { Schema, model} = require('mongoose');

const examSchema = new Schema({
    type:{
        type: String,
        required: true,
        enum: ['schedule', 'mock', 'practice']
    },
    title:{
        type: String,
        required: true
    },
    examDate:{
        type: String,
        required: true
    },
    examStartTime:{
        type: String,
        required: true
    },
    examEndTime:{
        type: String,
        required: true
    },
    examDuration:{
        type: String,
        required: true
    },
    mark:{
        type: Number,
        required: true
    },
    negativeMark:{
        type: Number,
        required: true
    },
    questionCategory:[
        {
            id:{
                type: Schema.Types.ObjectId,
                ref: 'questionBank',
                required: true
            },
            title:{
                type: String,
                required: true
            },
            questionList:[
                {
                    id:{
                        type: Schema.Types.ObjectId,
                        ref: 'questionsBankCollection',
                        required: true
                    },
                }
            ]
        }
    ],
    actualAnswerList:{
        type: Array,
        default: []
    },
    studentsPerformance:[
        {
            id:{
                type: Schema.Types.ObjectId,
                ref: 'User',
                required: true
            },
            name:{
                type: String,
                required: true
            },
            studentAnswerList:{
                type: Array,
                default: []
            },
            correctedAnswerList:{
                type: Array,
                default: []
            },
            mark:{
                type: Number,
                default: 0
            },
            negativeMark:{
                type: Number,
                default: 0
            },
            totalMark:{
                type: Number,
                default: 0
            }
        }    
    ],
    createdAt:{
        type: Date,
        default: Date.now
    },
    updatedAt:{
        type: Date,
        default: Date.now
    }
});
