// services/supabase.js

import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

const supabaseUrl = 'https://vtnpiyszfmgqtyfeiaps.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ0bnBpeXN6Zm1ncXR5ZmVpYXBzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQyMjYzMTgsImV4cCI6MjA3OTgwMjMxOH0.2A8Duz63as9G37jIgZlPnpx2c0zDKQAXkDCuB7FXQG8';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});