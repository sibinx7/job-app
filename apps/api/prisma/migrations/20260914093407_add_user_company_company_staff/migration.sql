BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[User] (
    [id] INT NOT NULL IDENTITY(1,1),
    [first_name] NVARCHAR(1000) NOT NULL,
    [middle_name] NVARCHAR(1000),
    [last_name] NVARCHAR(1000) NOT NULL,
    [email] NVARCHAR(1000) NOT NULL,
    [password_hash] NVARCHAR(1000) NOT NULL,
    [phone] NVARCHAR(1000) NOT NULL,
    [country_code] INT NOT NULL,
    [country] NVARCHAR(1000) NOT NULL,
    [pincode] NVARCHAR(1000),
    [state] NVARCHAR(1000),
    [role] NVARCHAR(1000) NOT NULL CONSTRAINT [User_role_df] DEFAULT 'JOB_SEEKER',
    [status] NVARCHAR(1000) NOT NULL CONSTRAINT [User_status_df] DEFAULT 'INACTIVE',
    [created_at] DATETIME2 NOT NULL CONSTRAINT [User_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [updated_at] DATETIME2,
    [deleted_at] DATETIME2,
    CONSTRAINT [User_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [User_email_key] UNIQUE NONCLUSTERED ([email]),
    CONSTRAINT [User_password_hash_key] UNIQUE NONCLUSTERED ([password_hash]),
    CONSTRAINT [User_phone_key] UNIQUE NONCLUSTERED ([phone])
);

-- CreateTable
CREATE TABLE [dbo].[CompanyAddress] (
    [id] INT NOT NULL IDENTITY(1,1),
    [company_id] INT NOT NULL,
    [address] NVARCHAR(1000),
    [address_line_1] NVARCHAR(1000),
    [address_line_2] NVARCHAR(1000),
    [country_code] INT NOT NULL,
    [country] NVARCHAR(1000) NOT NULL,
    [pincode] NVARCHAR(1000),
    [state] NVARCHAR(1000),
    [created_at] DATETIME2 NOT NULL CONSTRAINT [CompanyAddress_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [updated_at] DATETIME2,
    [deleted_at] DATETIME2,
    CONSTRAINT [CompanyAddress_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Company] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(1000) NOT NULL,
    [company_code] NVARCHAR(1000),
    [registration_number] NVARCHAR(1000),
    [email] NVARCHAR(1000) NOT NULL,
    [phone] NVARCHAR(1000) NOT NULL,
    [country_code] INT NOT NULL,
    [country] NVARCHAR(1000) NOT NULL,
    [pincode] NVARCHAR(1000),
    [state] NVARCHAR(1000),
    [employee_count] INT,
    [website] NVARCHAR(1000),
    [description] NVARCHAR(1000),
    [address] NVARCHAR(1000),
    [address_line_1] NVARCHAR(1000),
    [address_line_2] NVARCHAR(1000),
    [created_at] DATETIME2 NOT NULL CONSTRAINT [Company_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [updated_at] DATETIME2,
    [deleted_at] DATETIME2,
    CONSTRAINT [Company_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Company_company_code_key] UNIQUE NONCLUSTERED ([company_code]),
    CONSTRAINT [Company_registration_number_key] UNIQUE NONCLUSTERED ([registration_number]),
    CONSTRAINT [Company_email_key] UNIQUE NONCLUSTERED ([email]),
    CONSTRAINT [Company_phone_key] UNIQUE NONCLUSTERED ([phone])
);

-- CreateTable
CREATE TABLE [dbo].[CompanyStaff] (
    [id] INT NOT NULL IDENTITY(1,1),
    [company_id] INT NOT NULL,
    [user_id] INT NOT NULL,
    [role] NVARCHAR(1000) NOT NULL,
    [created_at] DATETIME2 NOT NULL CONSTRAINT [CompanyStaff_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [updated_at] DATETIME2,
    [deleted_at] DATETIME2,
    CONSTRAINT [CompanyStaff_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [CompanyStaff_company_id_key] UNIQUE NONCLUSTERED ([company_id]),
    CONSTRAINT [CompanyStaff_user_id_key] UNIQUE NONCLUSTERED ([user_id])
);

-- CreateIndex
CREATE NONCLUSTERED INDEX [CompanyAddress_company_id_idx] ON [dbo].[CompanyAddress]([company_id]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [CompanyStaff_company_id_idx] ON [dbo].[CompanyStaff]([company_id]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [CompanyStaff_user_id_idx] ON [dbo].[CompanyStaff]([user_id]);

-- AddForeignKey
ALTER TABLE [dbo].[CompanyAddress] ADD CONSTRAINT [CompanyAddress_company_id_fkey] FOREIGN KEY ([company_id]) REFERENCES [dbo].[Company]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[CompanyStaff] ADD CONSTRAINT [CompanyStaff_company_id_fkey] FOREIGN KEY ([company_id]) REFERENCES [dbo].[Company]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[CompanyStaff] ADD CONSTRAINT [CompanyStaff_user_id_fkey] FOREIGN KEY ([user_id]) REFERENCES [dbo].[User]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
