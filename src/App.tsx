import { useState } from 'react'

type Step = 1 | 2 | 3

interface FormData {
  apiProvider: string
  apiKey: string
  brandName: string
  brandDescription: string
  targetAudience: string
  brandVoice: string
  twitter: string
  instagram: string
  linkedin: string
  website: string
}

function App() {
  const [currentStep, setCurrentStep] = useState<Step>(1)
  const [isComplete, setIsComplete] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    apiProvider: 'openai',
    apiKey: '',
    brandName: '',
    brandDescription: '',
    targetAudience: '',
    brandVoice: 'professional',
    twitter: '',
    instagram: '',
    linkedin: '',
    website: ''
  })

  const updateField = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep((currentStep + 1) as Step)
    } else {
      setIsComplete(true)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((currentStep - 1) as Step)
    }
  }

  const StepIndicator = () => (
    <div className="flex items-center justify-center gap-4 mb-8">
      {[1, 2, 3].map((step) => (
        <div key={step} className="flex items-center">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
              step === currentStep
                ? 'bg-accent text-white'
                : step < currentStep
                ? 'bg-accent/50 text-white'
                : 'bg-border text-muted'
            }`}
          >
            {step}
          </div>
          <span className={`ml-2 text-sm ${step === currentStep ? 'text-white' : 'text-muted'}`}>
            {step === 1 ? 'API Setup' : step === 2 ? 'Brand Info' : 'Socials'}
          </span>
          {step < 3 && <div className="w-12 h-0.5 bg-border mx-4" />}
        </div>
      ))}
    </div>
  )

  const Step1 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-accent/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <span className="text-3xl">🔑</span>
        </div>
        <p className="text-muted">Power your Moltbot with your preferred AI provider</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm text-muted mb-2">API Provider</label>
          <select
            value={formData.apiProvider}
            onChange={(e) => updateField('apiProvider', e.target.value)}
            className="w-full bg-dark border border-border rounded-lg px-4 py-3 text-white focus:border-accent focus:outline-none transition-colors"
          >
            <option value="openai">OpenAI</option>
            <option value="anthropic">Anthropic (Claude)</option>
            <option value="google">Google (Gemini)</option>
            <option value="mistral">Mistral AI</option>
            <option value="cohere">Cohere</option>
            <option value="custom">Custom Endpoint</option>
          </select>
        </div>

        <div>
          <label className="block text-sm text-muted mb-2">API Key</label>
          <input
            type="password"
            value={formData.apiKey}
            onChange={(e) => updateField('apiKey', e.target.value)}
            placeholder="sk-xxxxxxxxxxxxxxxxxxxxxxxx"
            className="w-full bg-dark border border-border rounded-lg px-4 py-3 text-white placeholder-muted/50 focus:border-accent focus:outline-none transition-colors"
          />
          <p className="text-xs text-muted mt-2">🔒 Your API key is stored locally and never sent to our servers</p>
        </div>
      </div>
    </div>
  )

  const Step2 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-purple-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <span className="text-3xl">🏢</span>
        </div>
        <p className="text-muted">Tell us about your brand for personalized negotiations</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm text-muted mb-2">Brand Name</label>
          <input
            type="text"
            value={formData.brandName}
            onChange={(e) => updateField('brandName', e.target.value)}
            placeholder="Your Company Name"
            className="w-full bg-dark border border-border rounded-lg px-4 py-3 text-white placeholder-muted/50 focus:border-accent focus:outline-none transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm text-muted mb-2">Brand Description</label>
          <textarea
            value={formData.brandDescription}
            onChange={(e) => updateField('brandDescription', e.target.value)}
            placeholder="Describe what your brand does and its unique value proposition..."
            rows={3}
            className="w-full bg-dark border border-border rounded-lg px-4 py-3 text-white placeholder-muted/50 focus:border-accent focus:outline-none transition-colors resize-none"
          />
        </div>

        <div>
          <label className="block text-sm text-muted mb-2">Target Audience</label>
          <input
            type="text"
            value={formData.targetAudience}
            onChange={(e) => updateField('targetAudience', e.target.value)}
            placeholder="e.g., Tech startups, Enterprise B2B, Gen-Z consumers"
            className="w-full bg-dark border border-border rounded-lg px-4 py-3 text-white placeholder-muted/50 focus:border-accent focus:outline-none transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm text-muted mb-2">Brand Voice</label>
          <select
            value={formData.brandVoice}
            onChange={(e) => updateField('brandVoice', e.target.value)}
            className="w-full bg-dark border border-border rounded-lg px-4 py-3 text-white focus:border-accent focus:outline-none transition-colors"
          >
            <option value="professional">Professional & Corporate</option>
            <option value="friendly">Friendly & Approachable</option>
            <option value="bold">Bold & Disruptive</option>
            <option value="luxury">Luxury & Premium</option>
            <option value="casual">Casual & Fun</option>
          </select>
        </div>
      </div>
    </div>
  )

  const Step3 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <span className="text-3xl">🌐</span>
        </div>
        <p className="text-muted">Connect your social presence for integrated campaigns</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm text-muted mb-2">Twitter / X Handle</label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted">@</span>
            <input
              type="text"
              value={formData.twitter}
              onChange={(e) => updateField('twitter', e.target.value)}
              placeholder="yourhandle"
              className="w-full bg-dark border border-border rounded-lg pl-8 pr-4 py-3 text-white placeholder-muted/50 focus:border-accent focus:outline-none transition-colors"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm text-muted mb-2">Instagram Handle</label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted">@</span>
            <input
              type="text"
              value={formData.instagram}
              onChange={(e) => updateField('instagram', e.target.value)}
              placeholder="yourhandle"
              className="w-full bg-dark border border-border rounded-lg pl-8 pr-4 py-3 text-white placeholder-muted/50 focus:border-accent focus:outline-none transition-colors"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm text-muted mb-2">LinkedIn</label>
          <input
            type="text"
            value={formData.linkedin}
            onChange={(e) => updateField('linkedin', e.target.value)}
            placeholder="linkedin.com/company/yourcompany"
            className="w-full bg-dark border border-border rounded-lg px-4 py-3 text-white placeholder-muted/50 focus:border-accent focus:outline-none transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm text-muted mb-2">Website</label>
          <input
            type="text"
            value={formData.website}
            onChange={(e) => updateField('website', e.target.value)}
            placeholder="https://yourwebsite.com"
            className="w-full bg-dark border border-border rounded-lg px-4 py-3 text-white placeholder-muted/50 focus:border-accent focus:outline-none transition-colors"
          />
        </div>
      </div>
    </div>
  )

  const CompletionScreen = () => (
    <div className="text-center py-12">
      <div className="w-24 h-24 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
        <span className="text-5xl">🚀</span>
      </div>
      <h2 className="text-2xl font-bold text-white mb-4">Moltbot Activated!</h2>
      <p className="text-muted mb-8 max-w-md mx-auto">
        Your Deals Wingman is now configured and ready to negotiate on behalf of {formData.brandName || 'your brand'}.
      </p>
      
      <div className="bg-card border border-border rounded-xl p-6 max-w-lg mx-auto mb-8">
        <h3 className="text-lg font-semibold text-white mb-4">Configuration Summary</h3>
        <div className="space-y-3 text-left">
          <div className="flex justify-between">
            <span className="text-muted">AI Provider:</span>
            <span className="text-white capitalize">{formData.apiProvider}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted">Brand:</span>
            <span className="text-white">{formData.brandName || 'Not set'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted">Voice:</span>
            <span className="text-white capitalize">{formData.brandVoice}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted">Socials Connected:</span>
            <span className="text-accent">
              {[formData.twitter, formData.instagram, formData.linkedin].filter(Boolean).length}/3
            </span>
          </div>
        </div>
      </div>

      <div className="flex gap-4 justify-center">
        <button
          onClick={() => {
            setIsComplete(false)
            setCurrentStep(1)
          }}
          className="px-6 py-3 bg-card border border-border text-white rounded-lg hover:bg-border transition-colors"
        >
          Edit Configuration
        </button>
        <button className="px-6 py-3 bg-accent text-white rounded-lg hover:bg-accent-hover transition-colors font-medium">
          Launch Dashboard →
        </button>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-darker text-white flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-dark">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center">
              <span className="text-xl">🤖</span>
            </div>
            <div>
              <h1 className="font-bold text-lg">Moltbot Negotiator</h1>
              <p className="text-xs text-muted">Deals Wingman Pro</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted hidden sm:block">Hostinger VPS Powered</span>
            <div className="px-3 py-1 bg-accent/20 text-accent text-xs font-medium rounded-full">
              Premium
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-xl">
          {!isComplete ? (
            <div className="bg-card border border-border rounded-2xl p-8">
              <StepIndicator />
              
              {currentStep === 1 && <Step1 />}
              {currentStep === 2 && <Step2 />}
              {currentStep === 3 && <Step3 />}

              {/* Navigation Buttons */}
              <div className="flex gap-4 mt-8">
                {currentStep > 1 && (
                  <button
                    onClick={prevStep}
                    className="flex-1 px-6 py-3 bg-dark border border-border text-white rounded-lg hover:bg-border transition-colors"
                  >
                    ← Back
                  </button>
                )}
                <button
                  onClick={nextStep}
                  className={`flex-1 px-6 py-3 bg-accent text-white rounded-lg hover:bg-accent-hover transition-colors font-medium ${
                    currentStep === 1 ? 'w-full' : ''
                  }`}
                >
                  {currentStep === 3 ? 'Complete Setup ✓' : 'Continue →'}
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-card border border-border rounded-2xl p-8">
              <CompletionScreen />
            </div>
          )}

          {/* Features Section */}
          {!isComplete && (
            <div className="mt-8 grid grid-cols-3 gap-4">
              <div className="bg-card/50 border border-border/50 rounded-xl p-4 text-center">
                <span className="text-2xl mb-2 block">💰</span>
                <p className="text-xs text-muted">Smart Deal Pricing</p>
              </div>
              <div className="bg-card/50 border border-border/50 rounded-xl p-4 text-center">
                <span className="text-2xl mb-2 block">🎯</span>
                <p className="text-xs text-muted">Auto Targeting</p>
              </div>
              <div className="bg-card/50 border border-border/50 rounded-xl p-4 text-center">
                <span className="text-2xl mb-2 block">📊</span>
                <p className="text-xs text-muted">Analytics</p>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-dark">
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-muted">
            Requested by <a href="https://twitter.com/AICEOGiuliano" className="text-accent hover:underline">@AICEOGiuliano</a> · Built by <a href="https://twitter.com/clonkbot" className="text-accent hover:underline">@clonkbot</a>
          </p>
          <p className="text-xs text-muted">Ship & Vibe in Public 🚀</p>
        </div>
      </footer>
    </div>
  )
}

export default App