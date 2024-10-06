/*
  Warnings:

  - You are about to drop the `_UserContacts` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_UserContacts" DROP CONSTRAINT "_UserContacts_A_fkey";

-- DropForeignKey
ALTER TABLE "_UserContacts" DROP CONSTRAINT "_UserContacts_B_fkey";

-- DropIndex
DROP INDEX "User_mail_key";

-- DropTable
DROP TABLE "_UserContacts";

-- CreateTable
CREATE TABLE "_userContact" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_userContact_AB_unique" ON "_userContact"("A", "B");

-- CreateIndex
CREATE INDEX "_userContact_B_index" ON "_userContact"("B");

-- AddForeignKey
ALTER TABLE "_userContact" ADD CONSTRAINT "_userContact_A_fkey" FOREIGN KEY ("A") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_userContact" ADD CONSTRAINT "_userContact_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
