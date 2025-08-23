# Supabase Setup for Waitlist

## 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Note down your project URL and anon key from the project settings

## 2. Using Existing Profiles Table

The waitlist integration uses your existing `profiles` table:

```sql
CREATE TABLE public.profiles (
  id uuid not null default extensions.uuid_generate_v4 (),
  email text not null,
  name text not null,
  company text null,
  created_at timestamp with time zone null default now(),
  role text null default 'user'::text,
  constraint Profiles_pkey primary key (id)
) TABLESPACE pg_default;
```

## 3. Row Level Security (if not already enabled)

If you haven't already set up RLS for the profiles table, run:

```sql
-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Create policy to allow inserts for waitlist signups
CREATE POLICY "Allow public inserts" ON profiles
  FOR INSERT WITH CHECK (true);
```

## 4. Environment Variables

Create a `.env.local` file in your project root with:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Replace the values with your actual Supabase project URL and anon key.

## 5. Test the Integration

1. Start your development server: `npm run dev`
2. Click any "Get Started" button
3. Fill out the form with name, email, and optional company
4. Check your Supabase dashboard to see the new profile in the profiles table

## 6. Optional: Email Notifications

You can set up email notifications in Supabase:
1. Go to Database > Functions
2. Create a new function to send emails when someone joins the waitlist
3. Use the `pg_net` extension or integrate with services like Resend, SendGrid, etc.
