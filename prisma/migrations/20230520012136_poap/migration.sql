-- CreateTable
CREATE TABLE "Token" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,

    CONSTRAINT "Token_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "address" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_UserToTokens" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_address_key" ON "User"("address");

-- CreateIndex
CREATE UNIQUE INDEX "_UserToTokens_AB_unique" ON "_UserToTokens"("A", "B");

-- CreateIndex
CREATE INDEX "_UserToTokens_B_index" ON "_UserToTokens"("B");

-- AddForeignKey
ALTER TABLE "_UserToTokens" ADD CONSTRAINT "_UserToTokens_A_fkey" FOREIGN KEY ("A") REFERENCES "Token"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserToTokens" ADD CONSTRAINT "_UserToTokens_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
