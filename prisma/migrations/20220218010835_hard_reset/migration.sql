/*
  Warnings:

  - You are about to drop the column `Info` on the `Rule` table. All the data in the column will be lost.
  - You are about to drop the column `Number` on the `Rule` table. All the data in the column will be lost.
  - You are about to drop the column `Title` on the `Rule` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[serverId,number]` on the table `Rule` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `info` to the `Rule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `number` to the `Rule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Rule` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Rule" DROP COLUMN "Info",
DROP COLUMN "Number",
DROP COLUMN "Title",
ADD COLUMN     "info" TEXT NOT NULL,
ADD COLUMN     "number" INTEGER NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Rule_serverId_number_key" ON "Rule"("serverId", "number");
