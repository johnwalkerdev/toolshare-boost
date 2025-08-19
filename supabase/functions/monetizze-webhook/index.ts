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

    const body = await req.json();
    console.log('Monetizze webhook received:', body);

    // Validate webhook (basic validation - in production you should validate the signature)
    if (!body.codigo_venda || !body.venda) {
      throw new Error('Invalid webhook payload');
    }

    const {
      codigo_venda,
      venda,
      produto,
      comprador,
      postback_evento,
      monetizze_data
    } = body;

    // Find or create order based on Monetizze transaction ID
    const { data: existingOrder } = await supabaseAdmin
      .from('orders')
      .select('*')
      .eq('monetizze_transaction_id', codigo_venda)
      .maybeSingle();

    if (existingOrder) {
      // Update existing order
      const updatedStatus = getOrderStatus(postback_evento, venda.status);
      
      await supabaseAdmin
        .from('orders')
        .update({
          status: updatedStatus,
          monetizze_data: body,
          updated_at: new Date().toISOString()
        })
        .eq('id', existingOrder.id);

      console.log(`Order ${existingOrder.id} updated with status: ${updatedStatus}`);
    } else {
      // Create new order from webhook
      const orderData = {
        customer_name: comprador?.nome || 'Unknown',
        customer_email: comprador?.email || 'unknown@example.com',
        customer_phone: comprador?.telefone || null,
        amount: parseFloat(venda?.valor) || 0,
        status: getOrderStatus(postback_evento, venda?.status),
        payment_method: venda?.formaPagamento?.toLowerCase() || 'unknown',
        monetizze_transaction_id: codigo_venda,
        monetizze_data: body
      };

      // Try to match with existing products
      if (produto?.nome) {
        const { data: matchingProduct } = await supabaseAdmin
          .from('products')
          .select('id')
          .eq('name', produto.nome)
          .maybeSingle();

        if (matchingProduct) {
          orderData.product_id = matchingProduct.id;
        }
      }

      const { data: newOrder, error } = await supabaseAdmin
        .from('orders')
        .insert(orderData)
        .select()
        .single();

      if (error) throw error;

      console.log(`New order created: ${newOrder.id} from Monetizze transaction: ${codigo_venda}`);
    }

    return new Response(
      JSON.stringify({ success: true, message: 'Webhook processed successfully' }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );

  } catch (error) {
    console.error('Webhook processing error:', error);
    
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    );
  }
});

// Helper function to map Monetizze status to our order status
function getOrderStatus(postbackEvento: string, vendaStatus: string): string {
  // Monetizze postback events:
  // 1 = Aguardando pagamento
  // 2 = Finalizada
  // 3 = Cancelada
  // 4 = Devolvida
  // 5 = Bloqueada
  // 6 = Completa

  switch (postbackEvento) {
    case '1':
      return 'pending';
    case '2':
    case '6':
      return 'paid';
    case '3':
    case '5':
      return 'failed';
    case '4':
      return 'refunded';
    default:
      // Fallback to status text analysis
      if (vendaStatus?.toLowerCase().includes('finalizada') || vendaStatus?.toLowerCase().includes('completa')) {
        return 'paid';
      } else if (vendaStatus?.toLowerCase().includes('cancelada') || vendaStatus?.toLowerCase().includes('bloqueada')) {
        return 'failed';
      } else if (vendaStatus?.toLowerCase().includes('devolvida')) {
        return 'refunded';
      }
      return 'pending';
  }
}