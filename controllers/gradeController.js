import { db } from '../models/index.js';
import { logger } from '../config/logger.js';
import Grade from '../models/Grade.js';

const create = async (req, res) => {
  try {
    const grade = new Grade(req.body);
    await grade.save();
    res.status(201).send({ message: 'Grade inserido com sucesso', grade });
    logger.info(`POST /grade - ${JSON.stringify(grade)}`);
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || 'Algum erro ocorreu ao salvar' });
    logger.error(`POST /grade - ${JSON.stringify(error.message)}`);
  }
};

const findAll = async (req, res) => {
  const name = req.query.name;

  const condition = name
    ? { name: { $regex: new RegExp(name), $options: 'i' } }
    : {};

  try {
    res.status(200).send(await Grade.find(condition));
    logger.info(`GET /grade - condition: ${JSON.stringify(condition)}`);
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || 'Erro ao listar todos os documentos' });
    logger.error(`GET /grade - ${JSON.stringify(error.message)}`);
  }
};

const findOne = async (req, res) => {
  const id = req.params.id;

  try {
    res.status(200).send(await Grade.findById(id));
    logger.info(`GET /grade - ${id}`);
  } catch (error) {
    res.status(500).send({ message: 'Erro ao buscar o Grade id: ' + id });
    logger.error(`GET /grade - ${JSON.stringify(error.message)}`);
  }
};

const update = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: 'Dados para atualizacao vazio',
    });
  }

  const id = req.params.id;

  try {
    const grade = await Grade.findByIdAndUpdate({ _id: id }, req.body, {
      new: true,
    });

    if (!grade) {
      return res.status(404).send({
        message: 'Grade não localizado para atualizar',
      });
    }

    res.status(202).send({ message: 'Dados atualizados com sucesso', grade });
    logger.info(`PUT /grade - ${id} - ${JSON.stringify(grade)}`);
  } catch (error) {
    res.status(500).send({ message: 'Erro ao atualizar a Grade id: ' + id });
    logger.error(`PUT /grade - ${JSON.stringify(error.message)}`);
  }
};

const remove = async (req, res) => {
  const id = req.params.id;

  try {
    const isDeleted = await Grade.findByIdAndDelete(id);

    if (!isDeleted) {
      return res.status(404).send({
        message: 'Grade não localizado para remover',
      });
    }

    res.status(200).send({ message: 'Grade removido com sucesso' });
    logger.info(`DELETE /grade - ${id}`);
  } catch (error) {
    res
      .status(500)
      .send({ message: 'Nao foi possivel deletar o Grade id: ' + id });
    logger.error(`DELETE /grade - ${JSON.stringify(error.message)}`);
  }
};

const removeAll = async (req, res) => {
  try {
    await Grade.remove({});
    res.status(200).send({ message: 'Notas removidas com sucesso' });
    logger.info(`DELETE /grade`);
  } catch (error) {
    res.status(500).send({ message: 'Erro ao excluir todos as Grades' });
    logger.error(`DELETE /grade - ${JSON.stringify(error.message)}`);
  }
};

export default { create, findAll, findOne, update, remove, removeAll };
