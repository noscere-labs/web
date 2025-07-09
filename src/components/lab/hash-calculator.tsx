"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Copy, Hash } from "lucide-react"
import { useEffect, useState } from "react"

// Simple SHA-256 implementation for demonstration
// In production, use a proper crypto library
async function sha256(message: string): Promise<string> {
  const msgUint8 = new TextEncoder().encode(message)
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
  return hashHex
}

export function HashCalculator() {
  const [input, setInput] = useState("")
  const [hashes, setHashes] = useState<{
    sha256: string
    sha256Double: string
  }>({ sha256: "", sha256Double: "" })
  const [copiedField, setCopiedField] = useState<string | null>(null)

  useEffect(() => {
    const calculateHashes = async () => {
      if (!input) {
        setHashes({ sha256: "", sha256Double: "" })
        return
      }

      try {
        const sha256Hash = await sha256(input)
        const sha256DoubleHash = await sha256(sha256Hash)

        setHashes({
          sha256: sha256Hash,
          sha256Double: sha256DoubleHash
        })
      } catch (error) {
        console.error('Error calculating hashes:', error)
      }
    }

    calculateHashes()
  }, [input])

  const copyToClipboard = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedField(field)
      setTimeout(() => setCopiedField(null), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const examples = [
    { label: "Hello World", value: "Hello World" },
    { label: "Blockchain", value: "Blockchain" },
    { label: "Block Header", value: "000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f" },
    { label: "Satoshi", value: "Satoshi Nakamoto" }
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Hash className="h-5 w-5" />
          Hash Calculator
          <Badge variant="secondary">SHA-256</Badge>
        </CardTitle>
        <CardDescription>
          Calculate SHA-256 and double SHA-256 hashes used throughout the Blockchain protocol.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-light-text-primary dark:text-dark-text-primary mb-2">
              Input Text
            </label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter text to hash..."
              className="w-full px-3 py-2 border border-light-elevated dark:border-dark-elevated rounded-lg bg-light-bg dark:bg-dark-bg text-light-text-primary dark:text-dark-text-primary focus:ring-2 focus:ring-brand-blue focus:border-transparent resize-none"
              rows={3}
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <span className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
              Quick examples:
            </span>
            {examples.map((example) => (
              <Button
                key={example.label}
                variant="outline"
                size="sm"
                onClick={() => setInput(example.value)}
              >
                {example.label}
              </Button>
            ))}
          </div>

          {input && (
            <div className="space-y-4">
              <div className="p-4 bg-light-elevated dark:bg-dark-elevated rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-light-text-primary dark:text-dark-text-primary">
                    SHA-256 Hash
                  </label>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(hashes.sha256, 'sha256')}
                    disabled={!hashes.sha256}
                  >
                    <Copy className="h-4 w-4" />
                    {copiedField === 'sha256' ? 'Copied!' : 'Copy'}
                  </Button>
                </div>
                <div className="font-mono text-sm bg-light-bg dark:bg-dark-bg p-3 rounded border break-all">
                  {hashes.sha256 || "Enter text to see hash..."}
                </div>
              </div>

              <div className="p-4 bg-light-elevated dark:bg-dark-elevated rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-light-text-primary dark:text-dark-text-primary">
                    Double SHA-256 Hash
                  </label>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(hashes.sha256Double, 'sha256Double')}
                    disabled={!hashes.sha256Double}
                  >
                    <Copy className="h-4 w-4" />
                    {copiedField === 'sha256Double' ? 'Copied!' : 'Copy'}
                  </Button>
                </div>
                <div className="font-mono text-sm bg-light-bg dark:bg-dark-bg p-3 rounded border break-all">
                  {hashes.sha256Double || "Enter text to see double hash..."}
                </div>
                <p className="text-xs text-light-text-muted dark:text-dark-text-muted mt-2">
                  Double SHA-256 is used in Blockchain for transaction IDs and block headers
                </p>
              </div>

              {input.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div>
                    <div className="text-sm text-light-text-muted dark:text-dark-text-muted">Input Length</div>
                    <div className="font-semibold">{input.length} chars</div>
                  </div>
                  <div>
                    <div className="text-sm text-light-text-muted dark:text-dark-text-muted">Input Bytes</div>
                    <div className="font-semibold">{new TextEncoder().encode(input).length} bytes</div>
                  </div>
                  <div>
                    <div className="text-sm text-light-text-muted dark:text-dark-text-muted">Hash Length</div>
                    <div className="font-semibold">64 hex chars</div>
                  </div>
                  <div>
                    <div className="text-sm text-light-text-muted dark:text-dark-text-muted">Hash Bytes</div>
                    <div className="font-semibold">32 bytes</div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}