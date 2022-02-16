/*
  Warnings:

  - Added the required column `ruleChannelId` to the `Server` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Server" ADD COLUMN     "ruleChannelId" TEXT NOT NULL;
