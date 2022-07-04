import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://rphoxuifyjqiqqtshvfy.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJwaG94dWlmeWpxaXFxdHNodmZ5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY1Njc0ODg5NCwiZXhwIjoxOTcyMzI0ODk0fQ.6JwQgMlDB15TOuGQriZo_cDF09Dr2N_buAlLz4aT5Vw"

const useSupabase = () => {
    const supabase = createClient(supabaseUrl, supabaseKey)
    return {
        supabase
    }
}

export default useSupabase