'use client';

import { Card } from '@/components/ui/card';
import { Spotlight } from './Spotlight';
import { SplineScene } from './Splite';

export default function SplineSceneBasic() {
  return (
    <Card className="relative h-full w-full overflow-hidden rounded-none border-none bg-[#000000]">
      <Spotlight className="-top-40 left-0 md:-top-20 md:left-60" />

      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="bg-grid-white/10 bg-grid-16 absolute inset-0 bg-primary/35 [mask-image:radial-gradient(white,transparent_85%)]" />
      </div>

      {/* Floating text elements */}
      <div className="absolute left-8 top-8 z-10 text-white drop-shadow-md">
        <h2 className="bg-gradient-to-b from-neutral-50 to-neutral-400 bg-clip-text text-2xl font-bold text-transparent md:text-3xl">
          Welcome to the Future
        </h2>
        <p className="text-xl text-white/40">
          Unlock the Power of Artificial Intelligence for Your Business
        </p>
      </div>

      <div className="absolute bottom-8 right-6 z-10">
        <div className="rounded-full bg-white/10 px-6 py-3 text-sm text-white backdrop-blur-md">
          <span className="mr-1">✨</span> Powered by cutting-edge AI
        </div>
      </div>

      <div className="flex h-full">
        <div className="relative flex-1">
          <SplineScene
            scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
            className="h-full w-full"
          />
        </div>
      </div>
    </Card>
  );
}
