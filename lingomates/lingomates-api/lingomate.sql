\echo 'Delete and recreate lingo db?'
\prompt 'Return for yes or control-C to cancel > ' foo
DROP  DATABASE lingomate;
CREATE DATABASE lingomate;
\connect lingomate;
\i lingomate-schema.sql