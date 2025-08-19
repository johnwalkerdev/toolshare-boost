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

  const url = new URL(req.url);
  const toolId = url.searchParams.get('tool');
  const targetUrl = url.searchParams.get('url') || 'https://www.google.com';

  if (!toolId) {
    return new Response('Tool ID required', { 
      status: 400, 
      headers: corsHeaders 
    });
  }

  try {
    // Get tool configuration from database
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { data: tool, error } = await supabase
      .from('tools')
      .select('proxy_config, name')
      .eq('id', toolId)
      .single();

    if (error || !tool) {
      return new Response('Tool not found', { 
        status: 404, 
        headers: corsHeaders 
      });
    }

    const proxyConfig = tool.proxy_config as any;
    
    if (!proxyConfig || !proxyConfig.host || !proxyConfig.port) {
      return new Response('No proxy configuration found for this tool', { 
        status: 400, 
        headers: corsHeaders 
      });
    }

    // Make request through proxy
    let response;
    try {
      const proxyUrl = `${proxyConfig.type.toLowerCase()}://${proxyConfig.host}:${proxyConfig.port}`;
      
      const fetchOptions: RequestInit = {
        method: req.method === 'GET' ? 'GET' : req.method,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
      };

      // Add proxy authentication if provided
      if (proxyConfig.username && proxyConfig.password) {
        const auth = btoa(`${proxyConfig.username}:${proxyConfig.password}`);
        fetchOptions.headers = {
          ...fetchOptions.headers,
          'Proxy-Authorization': `Basic ${auth}`
        };
      }

      console.log(`Making request to ${targetUrl} via proxy ${proxyUrl}`);
      
      // For now, we'll make a direct request and add proxy headers
      // Note: Deno doesn't support HTTP/SOCKS proxies directly, so this is a simplified version
      response = await fetch(targetUrl, {
        method: 'GET',
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8'
        }
      });

    } catch (error) {
      console.error('Proxy request failed:', error);
      return new Response(`Proxy request failed: ${error.message}`, { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'text/plain' }
      });
    }

    let content = await response.text();
    
    // Inject proxy navigation bar and scripts
    const proxyBar = `
      <div id="proxy-toolbar" style="
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 50px;
        background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
        border-bottom: 2px solid #00ff88;
        z-index: 999999;
        display: flex;
        align-items: center;
        padding: 0 15px;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        box-shadow: 0 2px 10px rgba(0,255,136,0.3);
      ">
        <div style="color: #00ff88; font-weight: bold; margin-right: 15px;">
          🛡️ ${tool.name} Proxy
        </div>
        <input 
          type="text" 
          id="proxy-url" 
          value="${targetUrl}"
          style="
            flex: 1;
            padding: 8px 12px;
            border: 1px solid #404040;
            border-radius: 20px;
            background: #2a2a2a;
            color: #ffffff;
            margin-right: 10px;
            font-size: 14px;
          "
          placeholder="Digite a URL..."
        />
        <button 
          onclick="navigateProxy()" 
          style="
            background: linear-gradient(135deg, #00ff88 0%, #00cc6a 100%);
            color: #000;
            border: none;
            padding: 8px 16px;
            border-radius: 15px;
            cursor: pointer;
            font-weight: bold;
            margin-right: 10px;
            font-size: 14px;
          "
        >
          IR
        </button>
        <button 
          onclick="window.close()" 
          style="
            background: #ff4444;
            color: white;
            border: none;
            padding: 8px 12px;
            border-radius: 15px;
            cursor: pointer;
            font-size: 14px;
          "
        >
          ✕
        </button>
      </div>
      <script>
        // Adjust page content to account for toolbar
        document.body.style.paddingTop = '60px';
        
        function navigateProxy() {
          const url = document.getElementById('proxy-url').value;
          if (url) {
            window.location.href = '${req.url.split('?')[0]}?tool=${toolId}&url=' + encodeURIComponent(url);
          }
        }
        
        // Handle form submissions and links through proxy
        document.addEventListener('DOMContentLoaded', function() {
          // Intercept all links
          const links = document.querySelectorAll('a[href]');
          links.forEach(link => {
            const originalHref = link.getAttribute('href');
            if (originalHref && !originalHref.startsWith('javascript:') && !originalHref.startsWith('#')) {
              let newUrl = originalHref;
              if (!newUrl.startsWith('http')) {
                const base = new URL('${targetUrl}');
                newUrl = new URL(originalHref, base.origin + base.pathname).href;
              }
              link.setAttribute('href', '${req.url.split('?')[0]}?tool=${toolId}&url=' + encodeURIComponent(newUrl));
            }
          });
        });
      </script>
    `;

    // Inject the toolbar at the beginning of body
    if (content.includes('<body')) {
      content = content.replace(/<body[^>]*>/i, (match) => match + proxyBar);
    } else {
      content = proxyBar + content;
    }

    return new Response(content, {
      status: response.status,
      headers: {
        ...corsHeaders,
        'Content-Type': 'text/html; charset=utf-8',
        'X-Frame-Options': 'SAMEORIGIN'
      }
    });

  } catch (error) {
    console.error('Error in proxy-browser function:', error);
    return new Response(`Error: ${error.message}`, { 
      status: 500, 
      headers: { ...corsHeaders, 'Content-Type': 'text/plain' }
    });
  }
});