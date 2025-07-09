"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeftRight, Copy } from "lucide-react"
import { useState } from "react"

// Base58 alphabet used by Blockchain
const BASE58_ALPHABET = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"

function base58Encode(buffer: Uint8Array): string {
  if (buffer.length === 0) return ""

  let digits = [0]
  for (let i = 0; i < buffer.length; i++) {
    let carry = buffer[i] || 0
    for (let j = 0; j < digits.length; j++) {
      const digit = digits[j] || 0
      carry += digit << 8
      digits[j] = carry % 58
      carry = Math.floor(carry / 58)
    }
    while (carry > 0) {
      digits.push(carry % 58)
      carry = Math.floor(carry / 58)
    }
  }

  // Count leading zeros
  let leadingZeros = 0
  for (let i = 0; i < buffer.length && buffer[i] === 0; i++) {
    leadingZeros++
  }

  // Convert to string
  return "1".repeat(leadingZeros) + digits.reverse().map(d => BASE58_ALPHABET[d] || '').join("")
}

function base58Decode(str: string): Uint8Array | null {
  if (str.length === 0) return new Uint8Array(0)

  try {
    let bytes = [0]
    for (let i = 0; i < str.length; i++) {
      const char = str[i]
      if (!char) return null
      const charIndex = BASE58_ALPHABET.indexOf(char)
      if (charIndex === -1) return null

      let carry = charIndex
      for (let j = 0; j < bytes.length; j++) {
        const byte = bytes[j] || 0
        carry += byte * 58
        bytes[j] = carry & 0xFF
        carry = carry >> 8
      }
      while (carry > 0) {
        bytes.push(carry & 0xFF)
        carry = carry >> 8
      }
    }

    // Count leading ones
    let leadingOnes = 0
    for (let i = 0; i < str.length && str[i] === "1"; i++) {
      leadingOnes++
    }

    const result = new Uint8Array(leadingOnes + bytes.length)
    bytes.reverse().forEach((byte, i) => {
      result[leadingOnes + i] = byte
    })

    return result
  } catch {
    return null
  }
}

function hexToBytes(hex: string): Uint8Array {
  const cleanHex = hex.replace(/[^0-9a-fA-F]/g, '')
  const bytes = new Uint8Array(cleanHex.length / 2)
  for (let i = 0; i < cleanHex.length; i += 2) {
    bytes[i / 2] = parseInt(cleanHex.substr(i, 2), 16)
  }
  return bytes
}

function bytesToHex(bytes: Uint8Array): string {
  return Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('')
}

export function Base58Converter() {
  const [hexInput, setHexInput] = useState("")
  const [base58Input, setBase58Input] = useState("")
  const [hexOutput, setHexOutput] = useState("")
  const [base58Output, setBase58Output] = useState("")
  const [error, setError] = useState("")
  const [copiedField, setCopiedField] = useState<string | null>(null)

  const convertHexToBase58 = () => {
    try {
      setError("")
      const bytes = hexToBytes(hexInput)
      const base58 = base58Encode(bytes)
      setBase58Output(base58)
    } catch (err) {
      setError("Invalid hex input")
      setBase58Output("")
    }
  }

  const convertBase58ToHex = () => {
    try {
      setError("")
      const bytes = base58Decode(base58Input)
      if (bytes === null) {
        setError("Invalid Base58 input")
        setHexOutput("")
        return
      }
      const hex = bytesToHex(bytes)
      setHexOutput(hex)
    } catch (err) {
      setError("Invalid Base58 input")
      setHexOutput("")
    }
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

  const examples = [
    {
      label: "Blockchain Address",
      hex: "00f54a5851e9372b87810a8e60cdd2e7cfd80b6e31c7f18fe8",
      base58: "1PMycacnJaSqwwJqjawXBEHAN95N4LdYkG"
    },
    {
      label: "Simple Text",
      hex: "48656c6c6f20576f726c64",
      base58: "JxF12TrwUP45BMd"
    }
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ArrowLeftRight className="h-5 w-5" />
          Base58 Converter
          <Badge variant="secondary">Blockchain Encoding</Badge>
        </CardTitle>
        <CardDescription>
          Convert between hexadecimal and Base58 encoding used in Blockchain addresses and keys.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Hex to Base58 */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-light-text-primary dark:text-dark-text-primary">
              Hexadecimal to Base58
            </h3>
            <div>
              <label className="block text-sm font-medium text-light-text-primary dark:text-dark-text-primary mb-2">
                Hex Input
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={hexInput}
                  onChange={(e) => setHexInput(e.target.value)}
                  placeholder="Enter hexadecimal string..."
                  className="flex-1 px-3 py-2 border border-light-elevated dark:border-dark-elevated rounded-lg bg-light-bg dark:bg-dark-bg text-light-text-primary dark:text-dark-text-primary focus:ring-2 focus:ring-brand-blue focus:border-transparent font-mono"
                />
                <Button onClick={convertHexToBase58}>Convert</Button>
              </div>
            </div>
            {base58Output && (
              <div className="p-4 bg-light-elevated dark:bg-dark-elevated rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-light-text-primary dark:text-dark-text-primary">
                    Base58 Output
                  </label>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(base58Output, 'base58Output')}
                  >
                    <Copy className="h-4 w-4" />
                    {copiedField === 'base58Output' ? 'Copied!' : 'Copy'}
                  </Button>
                </div>
                <div className="font-mono text-sm bg-light-bg dark:bg-dark-bg p-3 rounded border break-all">
                  {base58Output}
                </div>
              </div>
            )}
          </div>

          {/* Base58 to Hex */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-light-text-primary dark:text-dark-text-primary">
              Base58 to Hexadecimal
            </h3>
            <div>
              <label className="block text-sm font-medium text-light-text-primary dark:text-dark-text-primary mb-2">
                Base58 Input
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={base58Input}
                  onChange={(e) => setBase58Input(e.target.value)}
                  placeholder="Enter Base58 string..."
                  className="flex-1 px-3 py-2 border border-light-elevated dark:border-dark-elevated rounded-lg bg-light-bg dark:bg-dark-bg text-light-text-primary dark:text-dark-text-primary focus:ring-2 focus:ring-brand-blue focus:border-transparent font-mono"
                />
                <Button onClick={convertBase58ToHex}>Convert</Button>
              </div>
            </div>
            {hexOutput && (
              <div className="p-4 bg-light-elevated dark:bg-dark-elevated rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-light-text-primary dark:text-dark-text-primary">
                    Hex Output
                  </label>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(hexOutput, 'hexOutput')}
                  >
                    <Copy className="h-4 w-4" />
                    {copiedField === 'hexOutput' ? 'Copied!' : 'Copy'}
                  </Button>
                </div>
                <div className="font-mono text-sm bg-light-bg dark:bg-dark-bg p-3 rounded border break-all">
                  {hexOutput}
                </div>
              </div>
            )}
          </div>

          {error && (
            <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
            </div>
          )}

          {/* Examples */}
          <div className="space-y-3">
            <h4 className="font-medium text-light-text-primary dark:text-dark-text-primary">
              Quick Examples:
            </h4>
            <div className="space-y-2">
              {examples.map((example, index) => (
                <div key={index} className="p-3 bg-light-elevated dark:bg-dark-elevated rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">{example.label}</span>
                    <div className="space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setHexInput(example.hex)
                          setBase58Output(example.base58)
                        }}
                      >
                        Load Hex
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setBase58Input(example.base58)
                          setHexOutput(example.hex)
                        }}
                      >
                        Load Base58
                      </Button>
                    </div>
                  </div>
                  <div className="text-xs space-y-1">
                    <div><span className="text-light-text-muted dark:text-dark-text-muted">Hex:</span> <code className="font-mono">{example.hex}</code></div>
                    <div><span className="text-light-text-muted dark:text-dark-text-muted">Base58:</span> <code className="font-mono">{example.base58}</code></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}