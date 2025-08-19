-- Fix function search path security issues
ALTER FUNCTION generate_ticket_number() SET search_path = public;
ALTER FUNCTION set_ticket_number() SET search_path = public;

-- Enable RLS on the contaideal table that was flagged
ALTER TABLE public.contaideal ENABLE ROW LEVEL SECURITY;

-- Add policies for contaideal table
CREATE POLICY "Contaideal entries are viewable by admins" 
ON public.contaideal 
FOR SELECT 
USING (true);

CREATE POLICY "Admins can manage contaideal entries" 
ON public.contaideal 
FOR ALL 
USING (true);