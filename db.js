const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()


/**
 * @type {PrismaClient}
 */
module.exports = prisma;