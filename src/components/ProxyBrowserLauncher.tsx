import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Globe, ExternalLink, Shield } from "lucide-react";

interface ProxyBrowserLauncherProps {
  toolId: string;
  toolName: string;
  proxyConfig?: any;
}

export const ProxyBrowserLauncher = ({ toolId, toolName, proxyConfig }: ProxyBrowserLauncherProps) => {
  const [startUrl, setStartUrl] = useState("https://www.google.com");
  const { toast } = useToast();

  const openProxyBrowser = (initialUrl?: string) => {
    const url = initialUrl || startUrl;
    const proxyUrl = `${window.location.origin}/supabase/functions/v1/proxy-browser?tool=${toolId}&url=${encodeURIComponent(url)}`;
    
    // Open in new window with browser-like dimensions
    const newWindow = window.open(
      proxyUrl,
      `proxy_${toolId}_${Date.now()}`,
      'width=1400,height=900,scrollbars=yes,resizable=yes,toolbar=no,menubar=no,location=no,status=no'
    );
    
    if (newWindow) {
      newWindow.focus();
      
      // Add some styling to make it look more browser-like
      setTimeout(() => {
        try {
          newWindow.document.title = `${toolName} - Proxy Browser`;
        } catch (e) {
          // Cross-origin restrictions might prevent this
        }
      }, 1000);
      
      toast({
        title: "🛡️ Proxy Browser Launched",
        description: `${toolName} opened with proxy protection`,
      });
    } else {
      toast({
        title: "❌ Popup Blocked",
        description: "Please allow popups for this site to use the proxy browser",
        variant: "destructive"
      });
    }
  };

  const quickSites = [
    { name: "Google", url: "https://www.google.com", icon: "🔍" },
    { name: "YouTube", url: "https://www.youtube.com", icon: "📺" },
    { name: "Facebook", url: "https://www.facebook.com", icon: "📘" },
    { name: "Twitter", url: "https://www.twitter.com", icon: "🐦" },
    { name: "Instagram", url: "https://www.instagram.com", icon: "📷" },
    { name: "LinkedIn", url: "https://www.linkedin.com", icon: "💼" },
    { name: "Reddit", url: "https://www.reddit.com", icon: "🤖" },
    { name: "GitHub", url: "https://www.github.com", icon: "💻" },
  ];

  return (
    <Card className="p-6 space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-primary/10">
          <Shield className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h3 className="text-lg font-semibold">{toolName} Proxy Browser</h3>
          <p className="text-sm text-muted-foreground">
            Browse the web securely through your configured proxy
          </p>
        </div>
      </div>

      {proxyConfig && (
        <div className="bg-muted/50 rounded-lg p-4 space-y-2">
          <div className="flex items-center gap-2 text-sm font-medium">
            <Globe className="h-4 w-4" />
            Proxy Configuration
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Type:</span> {proxyConfig.type}
            </div>
            <div>
              <span className="text-muted-foreground">Host:</span> {proxyConfig.host}:{proxyConfig.port}
            </div>
            <div>
              <span className="text-muted-foreground">Verifier:</span> {proxyConfig.verifier}
            </div>
            <div>
              <span className="text-muted-foreground">Auth:</span> {proxyConfig.username ? '✓ Configured' : '✗ None'}
            </div>
          </div>
        </div>
      )}

      <div className="space-y-4">
        <div>
          <Label htmlFor="start-url">Starting URL</Label>
          <div className="flex gap-2 mt-1">
            <Input
              id="start-url"
              type="url"
              value={startUrl}
              onChange={(e) => setStartUrl(e.target.value)}
              placeholder="https://example.com"
            />
            <Button onClick={() => openProxyBrowser()} className="flex items-center gap-2">
              <ExternalLink className="h-4 w-4" />
              Open
            </Button>
          </div>
        </div>

        <div>
          <Label>Quick Access</Label>
          <div className="grid grid-cols-4 gap-2 mt-2">
            {quickSites.map((site) => (
              <Button
                key={site.name}
                variant="outline"
                size="sm"
                onClick={() => openProxyBrowser(site.url)}
                className="flex items-center gap-2 justify-start"
              >
                <span>{site.icon}</span>
                <span className="text-xs">{site.name}</span>
              </Button>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <span className="text-yellow-600 dark:text-yellow-400 text-lg">⚠️</span>
          <div className="text-sm">
            <p className="font-medium text-yellow-800 dark:text-yellow-200 mb-1">
              Important Notes:
            </p>
            <ul className="text-yellow-700 dark:text-yellow-300 space-y-1">
              <li>• The proxy browser opens in a new window</li>
              <li>• Some sites may detect and block proxy traffic</li>
              <li>• Always verify your IP location when using proxies</li>
              <li>• Use responsibly and follow all applicable laws</li>
            </ul>
          </div>
        </div>
      </div>
    </Card>
  );
};