/*
  Warnings:

  - You are about to drop the `_userContact` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `department` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_userContact" DROP CONSTRAINT "_userContact_A_fkey";

-- DropForeignKey
ALTER TABLE "_userContact" DROP CONSTRAINT "_userContact_B_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "department" TEXT NOT NULL;

-- DropTable
DROP TABLE "_userContact";
