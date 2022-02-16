/*
  Warnings:

  - The primary key for the `Server` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `Info` to the `Rule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Title` to the `Rule` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Rule" DROP CONSTRAINT "Rule_serverId_fkey";

-- AlterTable
ALTER TABLE "Rule" ADD COLUMN     "Info" TEXT NOT NULL,
ADD COLUMN     "Title" TEXT NOT NULL,
ALTER COLUMN "serverId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Server" DROP CONSTRAINT "Server_pkey",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Server_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "Rule" ADD CONSTRAINT "Rule_serverId_fkey" FOREIGN KEY ("serverId") REFERENCES "Server"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
