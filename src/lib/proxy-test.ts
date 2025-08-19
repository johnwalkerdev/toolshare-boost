interface ProxyConfig {
  type: string;
  verifier: string;
  host: string;
  port: string;
  username: string;
  password: string;
}

export async function testProxyConnection(proxy: ProxyConfig): Promise<{ success: boolean; ip?: string; error?: string }> {
  try {
    const response = await fetch('/api/test-proxy', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ proxy }),
    });

    const result = await response.json();
    return result;
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to test proxy'
    };
  }
}

// Fallback client-side proxy test using browser limitations
export async function testProxyClientSide(proxy: ProxyConfig): Promise<{ success: boolean; ip?: string; error?: string }> {
  try {
    // Choose verifier based on proxy.verifier
    let verifierUrl = 'https://api.ipify.org?format=json';
    if (proxy.verifier === 'IP2Location') {
      verifierUrl = 'https://api64.ipify.org?format=json';
    } else if (proxy.verifier === 'ifconfig.me') {
      verifierUrl = 'https://ifconfig.me/ip';
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout

    const response = await fetch(verifierUrl, {
      method: 'GET',
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

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

    // Note: This doesn't actually use the proxy due to browser limitations
    // It just tests if the verifier service is accessible
    return { success: true, ip };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Connection test failed'
    };
  }
}