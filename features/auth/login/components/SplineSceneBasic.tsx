'use client'

import { Card } from "@/components/ui/card";
import { Spotlight } from "./Spotlight";
import { SplineScene } from "./Splite";

export function SplineSceneBasic() {
  return (
    <Card className="w-full h-full border-none rounded-none !m-0 bg-gradient-to-br from-black via-gray-900 to-slate-900 relative overflow-hidden">
      <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" />

      {/* Background elements */}
      <div className="absolute inset-0">
        <div className=" bg-primary/35 absolute inset-0 bg-grid-white/10 bg-grid-16 [mask-image:radial-gradient(white,transparent_85%)]" />
      </div>

      {/* Floating text elements */}
      <div className="absolute top-8 left-8 z-10 text-white drop-shadow-md">
        <h2 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">Welcome to the Future</h2>
        <p className="text-xl text-white/40">Unlock the Power of Artificial Intelligence for Your Business</p>
      </div>

      <div className="absolute bottom-8 right-6 z-10">
        <div className="bg-white/10 backdrop-blur-md rounded-full px-6 py-3 text-white text-sm">
         <span className="mr-1">✨</span> Powered by cutting-edge AI
        </div>
      </div>

      <div className="flex h-full">
        <div className="flex-1 relative">
          <SplineScene 
            scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
            className="w-full h-full"
          />
        </div>
      </div>
    </Card>
  );
}
