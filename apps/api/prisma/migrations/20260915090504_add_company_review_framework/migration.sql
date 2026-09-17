BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[CompanyReview] (
    [id] INT NOT NULL IDENTITY(1,1),
    [company_id] INT NOT NULL,
    [user_id] INT NOT NULL,
    [rating] INT NOT NULL,
    [review] NVARCHAR(1000),
    [created_at] DATETIME2 NOT NULL CONSTRAINT [CompanyReview_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [updated_at] DATETIME2,
    [deleted_at] DATETIME2,
    [anonymous] BIT NOT NULL CONSTRAINT [CompanyReview_anonymous_df] DEFAULT 0,
    CONSTRAINT [CompanyReview_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[CompanyTechnology] (
    [id] INT NOT NULL IDENTITY(1,1),
    [company_id] INT NOT NULL,
    [technology] NVARCHAR(1000) NOT NULL,
    [created_at] DATETIME2 NOT NULL CONSTRAINT [CompanyTechnology_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [updated_at] DATETIME2,
    [deleted_at] DATETIME2,
    CONSTRAINT [CompanyTechnology_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[ProgramingLanguage] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(1000) NOT NULL,
    [description] NVARCHAR(1000),
    [created_at] DATETIME2 NOT NULL CONSTRAINT [ProgramingLanguage_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [updated_at] DATETIME2,
    [deleted_at] DATETIME2,
    CONSTRAINT [ProgramingLanguage_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [ProgramingLanguage_name_key] UNIQUE NONCLUSTERED ([name])
);

-- CreateTable
CREATE TABLE [dbo].[ProgramingFramework] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(1000) NOT NULL,
    [description] NVARCHAR(1000),
    [created_at] DATETIME2 NOT NULL CONSTRAINT [ProgramingFramework_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [updated_at] DATETIME2,
    [deleted_at] DATETIME2,
    [programming_language_id] INT NOT NULL,
    CONSTRAINT [ProgramingFramework_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [ProgramingFramework_name_key] UNIQUE NONCLUSTERED ([name])
);

-- CreateIndex
CREATE NONCLUSTERED INDEX [CompanyReview_company_id_idx] ON [dbo].[CompanyReview]([company_id]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [CompanyReview_user_id_idx] ON [dbo].[CompanyReview]([user_id]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [CompanyTechnology_company_id_idx] ON [dbo].[CompanyTechnology]([company_id]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [ProgramingFramework_programming_language_id_idx] ON [dbo].[ProgramingFramework]([programming_language_id]);

-- AddForeignKey
ALTER TABLE [dbo].[CompanyReview] ADD CONSTRAINT [CompanyReview_company_id_fkey] FOREIGN KEY ([company_id]) REFERENCES [dbo].[Company]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[CompanyReview] ADD CONSTRAINT [CompanyReview_user_id_fkey] FOREIGN KEY ([user_id]) REFERENCES [dbo].[User]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[CompanyTechnology] ADD CONSTRAINT [CompanyTechnology_company_id_fkey] FOREIGN KEY ([company_id]) REFERENCES [dbo].[Company]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[ProgramingFramework] ADD CONSTRAINT [ProgramingFramework_programming_language_id_fkey] FOREIGN KEY ([programming_language_id]) REFERENCES [dbo].[ProgramingLanguage]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
