/*
  Warnings:

  - A unique constraint covering the columns `[authorId,genre,date]` on the table `Diary` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Diary_authorId_genre_date_key" ON "Diary"("authorId", "genre", "date");
