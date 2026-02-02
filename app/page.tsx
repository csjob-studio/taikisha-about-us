import Scene1_Founder from "@/components/Scene1_Founder";
import Scene2_Timeline from "@/components/Scene2_Timeline";
import Scene4_ParallaxText from "@/components/Scene4_ParallaxText";
import Scene5_Directory from "@/components/Scene5_Directory";
import FloatingClouds from "@/components/FloatingClouds";
import Footer from "@/components/Footer";
import ScrollSnapper from "@/components/ScrollSnapper";
import Scene3_IndiaMap from "@/components/Scene3_IndiaMap";

export default function Home() {
  return (
    <main className="w-full min-h-screen bg-slate-900 relative">
      <ScrollSnapper />
      <FloatingClouds />
      <div className="relative z-10 w-full">
        <div className="section-snap">
          <Scene1_Founder />
        </div>
        <div className="section-snap">
          <Scene2_Timeline />
        </div>
        {/* <div className="section-snap">
          <Scene3_Map_Sequence />
        </div> */}
        {/* <div className="section-snap">
          <Scene3_Map />
        </div> */}
        <div className="section-snap">
          <Scene3_IndiaMap />
        </div>
        <div className="section-snap">
          <Scene4_ParallaxText />
        </div>
        <div className="section-snap">
          <Scene5_Directory />
        </div>
        <div className="section-snap">
          <Footer />
        </div>
      </div>
    </main>
  );
}
