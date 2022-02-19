/*
  Warnings:

  - Added the required column `ruleAcceptMessage` to the `Server` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ruleAcceptRole` to the `Server` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Server" ADD COLUMN     "ruleAcceptMessage" TEXT NOT NULL,
ADD COLUMN     "ruleAcceptRole" TEXT NOT NULL;
