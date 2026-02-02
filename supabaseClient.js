// public/supabaseClient.js
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

// Твой адрес проекта
const supabaseUrl = 'https://cdgigerutnnsjjqyqqrk.supabase.co'

// Твой ANON KEY (Длинный, который начинается на eyJ...)
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNkZ2lnZXJ1dG5uc2pqcXlxcXJrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAwNDAyOTcsImV4cCI6MjA4NTYxNjI5N30.LtGQ4GKCg6XAMJ5YWONS7mkowwN8p8eb5oTQfocSXYg'

export const supabase = createClient(supabaseUrl, supabaseKey)
console.log("Supabase клиент загружен!") // Эта надпись появится в консоли, если файл подключен верно