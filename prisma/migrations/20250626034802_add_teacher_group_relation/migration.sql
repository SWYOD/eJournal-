-- CreateTable
CREATE TABLE "_GroupToTeacher" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_GroupToTeacher_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_GroupToTeacher_B_index" ON "_GroupToTeacher"("B");

-- AddForeignKey
ALTER TABLE "_GroupToTeacher" ADD CONSTRAINT "_GroupToTeacher_A_fkey" FOREIGN KEY ("A") REFERENCES "Group"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GroupToTeacher" ADD CONSTRAINT "_GroupToTeacher_B_fkey" FOREIGN KEY ("B") REFERENCES "Teacher"("id") ON DELETE CASCADE ON UPDATE CASCADE;
