import Joi from "joi";

export const updateTweetPayloadSchema = Joi.object({
    text: Joi.string().optional(),
    scheduleAt: Joi.string().optional(),
    media: Joi.allow().optional(),
})

export const tweetPayloadSChema = Joi.object({
    text: Joi.string().required(),
    media: Joi.allow().optional(),
})

export const scheduleTweetPayloadSchema = Joi.object({
    text: Joi.string().required(),
    scheduleAt: Joi.string().optional()
})

export const josnPayloadSchema = Joi.object().min(1).messages({
    'Object.min': 'JONS cannot be empty.'
});