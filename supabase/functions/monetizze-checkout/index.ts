import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      { auth: { persistSession: false } }
    );

    const { product_id, customer_data, checkout_type = 'ecommerce' } = await req.json();

    if (!product_id || !customer_data) {
      throw new Error('Product ID and customer data are required');
    }

    // Get product details
    const { data: product, error: productError } = await supabaseAdmin
      .from('products')
      .select('*')
      .eq('id', product_id)
      .single();

    if (productError || !product) {
      throw new Error('Product not found');
    }

    if (!product.monetizze_checkout_code) {
      throw new Error('Product does not have Monetizze checkout configured');
    }

    const monetizzeApiKey = Deno.env.get('MONETIZZE_API_KEY');
    if (!monetizzeApiKey) {
      throw new Error('Monetizze API key not configured');
    }

    // Create order in our database first
    const orderData = {
      customer_name: customer_data.name,
      customer_email: customer_data.email,
      customer_phone: customer_data.phone || null,
      product_id: product.id,
      amount: product.price,
      status: 'pending',
      payment_method: customer_data.payment_method || 'unknown'
    };

    const { data: newOrder, error: orderError } = await supabaseAdmin
      .from('orders')
      .insert(orderData)
      .select()
      .single();

    if (orderError) throw orderError;

    if (checkout_type === 'ecommerce') {
      // Create Monetizze ecommerce checkout
      const checkoutData = {
        checkout: product.monetizze_checkout_code,
        tempo_expiracao: 20,
        valor_soma_produtos: product.price,
        valor_desconto: 0,
        valor_total: product.price,
        bloquear_dados_comprador: false,
        dados_comprador: {
          nome: customer_data.name,
          email: customer_data.email,
          celular: customer_data.phone || '',
          exigir_cnpj_cpf: false,
          exigir_endereco_entrega: false
        },
        produtos: [
          {
            nome: product.name,
            preco: product.price,
            quantidade: 1,
            descricao: product.description || product.name
          }
        ]
      };

      const monetizzeResponse = await fetch('https://api.monetizze.com.br/2.1/ecommerce/checkout', {
        method: 'POST',
        headers: {
          'TOKEN': monetizzeApiKey,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(checkoutData)
      });

      if (!monetizzeResponse.ok) {
        throw new Error(`Monetizze API error: ${monetizzeResponse.statusText}`);
      }

      const monetizzeResult = await monetizzeResponse.json();

      // Update order with Monetizze checkout info
      await supabaseAdmin
        .from('orders')
        .update({
          monetizze_data: { checkout_code: monetizzeResult.codigo_checkout }
        })
        .eq('id', newOrder.id);

      return new Response(
        JSON.stringify({
          success: true,
          order_id: newOrder.id,
          checkout_url: monetizzeResult.url_checkout,
          checkout_code: monetizzeResult.codigo_checkout
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200 
        }
      );
    } else {
      // Generate transparent checkout key
      const checkoutKeyUrl = `https://app.monetizze.com.br/checkout/transparente/js?ctk=${Deno.env.get('MONETIZZE_CTK')}&referencia=${product.monetizze_checkout_code}`;
      
      const keyResponse = await fetch(checkoutKeyUrl);
      const keyText = await keyResponse.text();
      
      const keyMatch = keyText.match(/chave_checkout = '([^']+)'/);
      const checkoutKey = keyMatch ? keyMatch[1] : null;
      
      if (!checkoutKey) {
        throw new Error('Failed to generate checkout key');
      }

      return new Response(
        JSON.stringify({
          success: true,
          order_id: newOrder.id,
          checkout_key: checkoutKey,
          product: {
            name: product.name,
            price: product.price,
            checkout_code: product.monetizze_checkout_code
          }
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200 
        }
      );
    }

  } catch (error) {
    console.error('Checkout creation error:', error);
    
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    );
  }
});