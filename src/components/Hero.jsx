import Spline from '@splinetool/react-spline'

export default function Hero() {
  return (
    <div className="relative w-full h-[360px] md:h-[520px] rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/4cHQr84zOGAHOehh/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/20 to-slate-900/60 pointer-events-none" />
      <div className="relative z-10 h-full flex items-center justify-center text-center px-6">
        <div>
          <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-3">Multi-AI Prompt Output Viewer</h1>
          <p className="text-white/80 max-w-2xl mx-auto">Enter one idea and instantly see how different AI models interpret it. Compare styles, extract insights, and copy the best parts.</p>
        </div>
      </div>
    </div>
  )
}
