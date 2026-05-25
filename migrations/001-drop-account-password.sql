BEGIN;

-- Drop Password column from Account table if it exists
ALTER TABLE "Account" DROP COLUMN IF EXISTS "Password";

-- In case a merged Students table had a Password column
ALTER TABLE "Students" DROP COLUMN IF EXISTS "Password";

COMMIT;
