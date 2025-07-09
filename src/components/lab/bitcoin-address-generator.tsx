"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Copy, Eye, EyeOff, RefreshCw } from "lucide-react"
import { useState } from "react"

// Note: This is a simplified demonstration for educational purposes
// In a real application, you would use proper cryptographic libraries

function generateRandomHex(length: number): string {
  const chars = '0123456789abcdef'
  let result = ''
  for (let i = 0; i < length; i++) {
    result += chars[Math.floor(Math.random() * chars.length)]
  }
  return result
}

function generateBlockchainAddress(): { address: string; privateKey: string; publicKey: string } {
  // This is a simplified simulation for demo purposes
  const privateKey = generateRandomHex(64)
  const publicKey = generateRandomHex(66)
  const address = `1${generateRandomHex(33)}`

  return { address, privateKey, publicKey }
}

export function BlockchainAddressGenerator() {
  const [keys, setKeys] = useState<{ address: string; privateKey: string; publicKey: string } | null>(null)
  const [showPrivateKey, setShowPrivateKey] = useState(false)
  const [copiedField, setCopiedField] = useState<string | null>(null)

  const generateNew = () => {
    setKeys(generateBlockchainAddress())
    setShowPrivateKey(false)
  }

  const copyToClipboard = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedField(field)
      setTimeout(() => setCopiedField(null), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Blockchain Address Generator
          <Badge variant="secondary">Educational</Badge>
        </CardTitle>
        <CardDescription>
          Generate Blockchain addresses and key pairs for educational purposes.
          Never use these for real transactions!
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Button onClick={generateNew} className="w-full">
            <RefreshCw className="mr-2 h-4 w-4" />
            Generate New Address
          </Button>

          {keys && (
            <div className="space-y-4">
              <div className="p-4 bg-light-elevated dark:bg-dark-elevated rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-light-text-primary dark:text-dark-text-primary">
                    Blockchain Address
                  </label>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(keys.address, 'address')}
                  >
                    <Copy className="h-4 w-4" />
                    {copiedField === 'address' ? 'Copied!' : 'Copy'}
                  </Button>
                </div>
                <div className="font-mono text-sm bg-light-bg dark:bg-dark-bg p-3 rounded border break-all">
                  {keys.address}
                </div>
              </div>

              <div className="p-4 bg-light-elevated dark:bg-dark-elevated rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-light-text-primary dark:text-dark-text-primary">
                    Public Key
                  </label>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(keys.publicKey, 'publicKey')}
                  >
                    <Copy className="h-4 w-4" />
                    {copiedField === 'publicKey' ? 'Copied!' : 'Copy'}
                  </Button>
                </div>
                <div className="font-mono text-sm bg-light-bg dark:bg-dark-bg p-3 rounded border break-all">
                  {keys.publicKey}
                </div>
              </div>

              <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-red-700 dark:text-red-300 flex items-center gap-2">
                    Private Key
                    <Badge variant="danger" className="text-xs">NEVER SHARE</Badge>
                  </label>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowPrivateKey(!showPrivateKey)}
                    >
                      {showPrivateKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      {showPrivateKey ? 'Hide' : 'Show'}
                    </Button>
                    {showPrivateKey && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(keys.privateKey, 'privateKey')}
                      >
                        <Copy className="h-4 w-4" />
                        {copiedField === 'privateKey' ? 'Copied!' : 'Copy'}
                      </Button>
                    )}
                  </div>
                </div>
                <div className="font-mono text-sm bg-light-bg dark:bg-dark-bg p-3 rounded border break-all">
                  {showPrivateKey ? keys.privateKey : '•'.repeat(64)}
                </div>
                <p className="text-xs text-red-600 dark:text-red-400 mt-2">
                  ⚠️ Private keys control access to Blockchain. Never share them in real applications!
                </p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}