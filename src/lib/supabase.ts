import { createClient } from '@supabase/supabase-js';


// Initialize database client
const supabaseUrl = 'https://yfoedfibhlzzecobtsvh.databasepad.com';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjVjYzdiYTdmLWZmZmMtNDczNC05ZDk3LWI2YWE3MzJkN2NmMyJ9.eyJwcm9qZWN0SWQiOiJ5Zm9lZGZpYmhsenplY29idHN2aCIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNzc5MDAyMDAwLCJleHAiOjIwOTQzNjIwMDAsImlzcyI6ImZhbW91cy5kYXRhYmFzZXBhZCIsImF1ZCI6ImZhbW91cy5jbGllbnRzIn0.bcmAvh4iQOyEgaPy4eiwHVuaHm7kF-iguEX5sNMikpQ';
const supabase = createClient(supabaseUrl, supabaseKey);


export { supabase };