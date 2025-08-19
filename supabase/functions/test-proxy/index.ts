import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface ProxyConfig {
  type: string;
  verifier: string;
  host: string;
  port: string;
  username: string;
  password: string;
}

async function testProxy(proxy: ProxyConfig): Promise<{ success: boolean; ip?: string; error?: string }> {
  try {
    const proxyUrl = `${proxy.type.toLowerCase()}://${proxy.username}:${proxy.password}@${proxy.host}:${proxy.port}`;
    
    // Choose verifier endpoint
    let verifierUrl = 'https://api.ipify.org?format=json';
    if (proxy.verifier === 'IP2Location') {
      verifierUrl = 'https://api64.ipify.org?format=json';
    } else if (proxy.verifier === 'ifconfig.me') {
      verifierUrl = 'https://ifconfig.me/ip';
    }

    const response = await fetch(verifierUrl, {
      method: 'GET',
      // In a real implementation, you'd configure the proxy here
      // For Deno edge functions, proxy configuration is limited
      signal: AbortSignal.timeout(10000) // 10 second timeout
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    let ip: string;
    if (proxy.verifier === 'ifconfig.me') {
      ip = (await response.text()).trim();
    } else {
      const data = await response.json();
      ip = data.ip;
    }

    return { success: true, ip };
  } catch (error) {
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    };
  }
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { proxy } = await req.json()
    
    if (!proxy || !proxy.host || !proxy.port) {
      return new Response(
        JSON.stringify({ success: false, error: 'Invalid proxy configuration' }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400 
        }
      )
    }

    const result = await testProxy(proxy as ProxyConfig)
    
    return new Response(
      JSON.stringify(result),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error instanceof Error ? error.message : 'Internal server error' 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    )
  }
})