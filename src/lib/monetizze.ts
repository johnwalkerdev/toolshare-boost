// Monetizze API integration types and functions
export interface MonetizzeConfig {
  apiKey: string;
  ctk: string; // Checkout Token Key
  environment: 'sandbox' | 'production';
}

export interface MonetizzeProduct {
  codigo: string;
  nome: string;
  preco: number;
  quantidade: number;
  descricao?: string;
  categoria?: string;
  sku?: string;
  gratis?: boolean;
}

export interface MonetizzeCustomer {
  nome: string;
  email: string;
  celular?: string;
  cep?: string;
  endereco?: string;
  numero?: string;
  complemento?: string;
  bairro?: string;
  cidade?: string;
  estado?: string;
  cnpj_cpf?: string;
}

export interface MonetizzeCheckoutData {
  checkout: string; // Referência do checkout
  tempo_expiracao?: number;
  valor_soma_produtos: number;
  valor_desconto?: number;
  valor_total: number;
  bloquear_dados_comprador?: boolean;
  dados_comprador?: MonetizzeCustomer;
  produtos: MonetizzeProduct[];
}

export interface MonetizzeOrder {
  chave_checkout: string;
  referencia: string;
  meio_pagamento: 'cartao' | 'boleto' | 'pix' | 'cartao_2';
  identificador?: string;
  nome: string;
  email: string;
  celular?: string;
  cep?: string;
  endereco?: string;
  numero?: string;
  complemento?: string;
  bairro?: string;
  cidade?: string;
  estado?: string;
  cnpj_cpf?: string;
  valor_frete: number;
  valor_soma_produtos: number;
  valor_desconto: number;
  valor_acrescimo: number;
  valor_total: number;
  produtos: MonetizzeProduct[];
  parcelamento?: string; // Formato: "1_210.50"
  
  // Dados do cartão (quando meio_pagamento = 'cartao')
  NameOnCard?: string;
  CreditCardNumber?: string;
  ExpiryDate_month?: string;
  ExpiryDate_year?: number;
  SecurityCode?: number;
  bandCartao?: string;
}

export interface MonetizzeWebhookData {
  id: string;
  data: string;
  chave_unica: string;
  postback_evento: string;
  codigo_venda: string;
  codigo_status: string;
  venda: {
    codigo: string;
    status: string;
    valor: string;
    meioPagamento: string;
    formaPagamento: string;
    dataInicio: string;
    dataFinalizada?: string;
  };
  produto: {
    codigo: string;
    nome: string;
    chave: string;
  };
  comprador: MonetizzeCustomer;
}

// Base URLs for Monetizze API
const MONETIZZE_URLS = {
  sandbox: 'https://app.monetizze.com.br',
  production: 'https://app.monetizze.com.br'
};

export class MonetizzeAPI {
  private config: MonetizzeConfig;
  
  constructor(config: MonetizzeConfig) {
    this.config = config;
  }

  // Generate checkout key (frontend)
  async generateCheckoutKey(referencia: string, ip?: string): Promise<string> {
    const url = `${MONETIZZE_URLS[this.config.environment]}/checkout/transparente/js`;
    const params = new URLSearchParams({
      ctk: this.config.ctk,
      referencia,
      ...(ip && { ip })
    });

    const response = await fetch(`${url}?${params}`);
    const text = await response.text();
    
    if (!response.ok) {
      throw new Error('Failed to generate checkout key');
    }
    
    // Extract checkout key from response
    const match = text.match(/chave_checkout = '([^']+)'/);
    return match ? match[1] : '';
  }

  // Get installment options
  async getInstallments(valor: number, referencia: string, maxParcelas: number = 12) {
    const url = `${MONETIZZE_URLS[this.config.environment]}/checkout/transparente/parcelamento`;
    
    const formData = new FormData();
    formData.append('ctk', this.config.ctk);
    formData.append('referencia', referencia);
    formData.append('valor', valor.toString());
    formData.append('maxParcelas', maxParcelas.toString());

    const response = await fetch(url, {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      throw new Error('Failed to get installments');
    }

    return response.json();
  }

  // Process order (backend only - requires API key)
  async processOrder(orderData: MonetizzeOrder) {
    const url = `${MONETIZZE_URLS[this.config.environment]}/checkout/transparente/processar`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Api-Key': this.config.apiKey,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(orderData)
    });

    if (!response.ok) {
      throw new Error('Failed to process order');
    }

    return response.json();
  }

  // Create ecommerce checkout
  async createCheckout(checkoutData: MonetizzeCheckoutData) {
    const url = `${MONETIZZE_URLS[this.config.environment]}/2.1/ecommerce/checkout`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'TOKEN': this.config.apiKey,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(checkoutData)
    });

    if (!response.ok) {
      throw new Error('Failed to create checkout');
    }

    return response.json();
  }
}

// Helper functions
export const formatMoney = (amount: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(amount);
};

export const parseInstallment = (installmentString: string): { parcelas: number; valor: number } => {
  const [parcelas, valor] = installmentString.split('_');
  return {
    parcelas: parseInt(parcelas),
    valor: parseFloat(valor)
  };
};

export const formatInstallment = (parcelas: number, valor: number): string => {
  return `${parcelas}_${valor.toFixed(2)}`;
};