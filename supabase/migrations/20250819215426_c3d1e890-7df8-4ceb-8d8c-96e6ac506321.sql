-- Create categories table
CREATE TABLE public.categories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create tools table
CREATE TABLE public.tools (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
  status VARCHAR(50) NOT NULL DEFAULT 'Active',
  description TEXT,
  image_url TEXT,
  proxy_config JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tools ENABLE ROW LEVEL SECURITY;

-- Create policies for categories (read-only for now)
CREATE POLICY "Categories are viewable by everyone" 
ON public.categories 
FOR SELECT 
USING (true);

CREATE POLICY "Admin can manage categories" 
ON public.categories 
FOR ALL 
USING (true);

-- Create policies for tools (read-only for now)
CREATE POLICY "Tools are viewable by everyone" 
ON public.tools 
FOR SELECT 
USING (true);

CREATE POLICY "Admin can manage tools" 
ON public.tools 
FOR ALL 
USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_tools_updated_at
BEFORE UPDATE ON public.tools
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert initial categories
INSERT INTO public.categories (name) VALUES 
  ('design'),
  ('ia'),
  ('marketing'),
  ('produtividade');

-- Insert initial tools (get category IDs first)
INSERT INTO public.tools (name, category_id, status, description) 
SELECT 
  'Canva Pro',
  c.id,
  'Active',
  'Design tool for creating graphics and presentations'
FROM public.categories c WHERE c.name = 'design';

INSERT INTO public.tools (name, category_id, status, description) 
SELECT 
  'ChatGPT',
  c.id,
  'Active',
  'AI-powered conversational assistant'
FROM public.categories c WHERE c.name = 'ia';

INSERT INTO public.tools (name, category_id, status, description) 
SELECT 
  'Semrush',
  c.id,
  'Paused',
  'SEO and marketing analytics platform'
FROM public.categories c WHERE c.name = 'marketing';