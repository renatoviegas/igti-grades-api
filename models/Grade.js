import mongoose from 'mongoose';

const schema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: [true, 'Disciplina é obrigatória'],
  },
  type: {
    type: String,
    required: [true, 'Tipo requerido'],
  },
  value: {
    type: Number,
    validate: {
      validator: (value) => value >= 0,
      message: (props) => `${props.value} deve ser maior ou igual a zero!`,
    },
    required: [true, 'nota requerida'],
  },
  lastModified: {
    type: Date,
    default: Date.now,
  },
});

const Grade = mongoose.model('grades', schema);

export default Grade;
