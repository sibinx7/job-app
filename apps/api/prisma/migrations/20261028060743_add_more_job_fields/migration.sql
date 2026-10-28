/*
  Warnings:

  - Added the required column `experience_max` to the `Job` table without a default value. This is not possible if the table is not empty.
  - Added the required column `experience_min` to the `Job` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[Job] ADD [experience_max] INT NOT NULL,
[experience_min] INT NOT NULL,
[is_hybrid] BIT NOT NULL CONSTRAINT [Job_is_hybrid_df] DEFAULT 0,
[is_onsite] BIT NOT NULL CONSTRAINT [Job_is_onsite_df] DEFAULT 0,
[is_remote] BIT NOT NULL CONSTRAINT [Job_is_remote_df] DEFAULT 0,
[job_type] NVARCHAR(1000),
[notice_period_max] INT,
[notice_perion_min] INT,
[salary_max] FLOAT(53),
[salary_min] FLOAT(53);

-- CreateTable
CREATE TABLE [dbo].[CompanyLocation] (
    [id] INT NOT NULL IDENTITY(1,1),
    [company_id] INT NOT NULL,
    [name] NVARCHAR(1000) NOT NULL,
    [address] NVARCHAR(1000) NOT NULL,
    [address_line_1] NVARCHAR(1000) NOT NULL,
    [address_line_2] NVARCHAR(1000) NOT NULL,
    [city] NVARCHAR(1000) NOT NULL,
    [state] NVARCHAR(1000) NOT NULL,
    [country] NVARCHAR(1000) NOT NULL,
    [country_code] INT NOT NULL,
    [pincode] NVARCHAR(1000) NOT NULL,
    [created_at] DATETIME2 NOT NULL CONSTRAINT [CompanyLocation_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [updated_at] DATETIME2 NOT NULL,
    [deleted_at] DATETIME2,
    CONSTRAINT [CompanyLocation_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[JobLocation] (
    [id] INT NOT NULL IDENTITY(1,1),
    [job_id] INT NOT NULL,
    [company_location_id] INT NOT NULL,
    [created_at] DATETIME2 NOT NULL CONSTRAINT [JobLocation_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [updated_at] DATETIME2 NOT NULL,
    [deleted_at] DATETIME2,
    CONSTRAINT [JobLocation_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [JobLocation_job_id_key] UNIQUE NONCLUSTERED ([job_id]),
    CONSTRAINT [JobLocation_company_location_id_key] UNIQUE NONCLUSTERED ([company_location_id])
);

-- CreateIndex
CREATE NONCLUSTERED INDEX [CompanyLocation_name_idx] ON [dbo].[CompanyLocation]([name]);

-- AddForeignKey
ALTER TABLE [dbo].[CompanyLocation] ADD CONSTRAINT [CompanyLocation_company_id_fkey] FOREIGN KEY ([company_id]) REFERENCES [dbo].[Company]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[JobLocation] ADD CONSTRAINT [JobLocation_job_id_fkey] FOREIGN KEY ([job_id]) REFERENCES [dbo].[Job]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[JobLocation] ADD CONSTRAINT [JobLocation_company_location_id_fkey] FOREIGN KEY ([company_location_id]) REFERENCES [dbo].[CompanyLocation]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
