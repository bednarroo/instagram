import {createClient} from "@supabase/supabase-js"

const supabaseUrl = 'https://vfxbeefgfhemwvzdsabt.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZmeGJlZWZnZmhlbXd2emRzYWJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTE3NTgxODgsImV4cCI6MjAwNzMzNDE4OH0.fT63IY0CRc7gihKTROHPWBHwe8nu9vm2lVPscUZVAMU'

export const supabase = createClient(supabaseUrl, supabaseKey)
export default supabase;
