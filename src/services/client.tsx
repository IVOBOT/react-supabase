import { createClient } from "@supabase/supabase-js";

const projectURL: string = process.env.REACT_APP_SUPABASE_PROJECT_URL as string;
const projectKey: string = process.env.REACT_APP_SUPABASE_PROJECT_KEY as string;

export const supabase = createClient(projectURL, projectKey, {
    // Optional arguments
    auth: {
        storage: localStorage,
        persistSession: true,
    }
});