import { createClient } from '@supabase/supabase-js'

// As duas variáveis abaixo vêm do seu projeto Supabase.
// Veja o arquivo INSTRUCOES.md para saber onde encontrá-las.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
