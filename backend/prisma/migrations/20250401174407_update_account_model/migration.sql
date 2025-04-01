/*
  Warnings:

  - You are about to drop the column `icon` on the `Account` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Account_userId_key";

-- AlterTable
ALTER TABLE "Account" DROP COLUMN "icon";
