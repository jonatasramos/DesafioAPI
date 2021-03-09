import { Joi } from 'express-validation';
/**
 * Arquivo responsável pelas validações do sistema
 * 
 * @author Jônatas Ramos
 */

/**
 * Item com a validação criação de cartas
 */
export const validateLetterCreate = {
    body: Joi.object({
        sender_name: Joi.string()
            .required()
            .empty()
            .min(3),
        sender_adress: Joi.string()
            .required()
            .empty()
            .min(3),
        text: Joi.string()
            .required()
            .empty()
            .min(10),
        status: Joi.number()
            .required()
            .empty()
            .min(0)
            .max(1),
    })
}

/**
 * Item com a validação atualização de cartas
 */
export const validateLetterUpdate = {
    body: Joi.object({
        id: Joi.number()
            .required()
            .empty(),
        sender_name: Joi.string()
            .required()
            .empty()
            .min(3),
        sender_adress: Joi.string()
            .required()
            .empty()
            .min(3),
        text: Joi.string()
            .required()
            .empty()
            .min(10),
        status: Joi.number()
            .required()
            .empty()
            .min(0)
            .max(1),
    })
}

/**
 * Item com a validação de remover cartas
 */
export const validateLetterDelete = {
    body: Joi.object({
        id: Joi.number()
            .required()
            .empty()
    })
}

/**
 * Item com a validação de usuário
 */
export const validateUser = {
    body: Joi.object({
        login: Joi.string()
            .required()
            .empty()
            .min(3),
        password: Joi.string()
            .required()
            .empty()
            .regex(/[a-zA-Z0-9]{3,30}/)
            .min(3),
    })
}
