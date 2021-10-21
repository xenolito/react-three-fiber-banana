
import React, { Suspense, useState, useContext } from 'react'
import { Canvas } from '@react-three/fiber'
import { Html, useProgress, Stats, useContextBridge, OrbitControls } from '@react-three/drei'
import { EffectComposer, DepthOfField, Noise, Vignette } from '@react-three/postprocessing'
import Overlay from './layout/Overlay'
import { FadeIn } from './layout/styles'
import Banana, {Instances} from './components/Banana'
import {ColorsContext} from './context/ColorsProvider'
import FruitsProvider, {FruitsContext} from './context/FruitsProvider'
import Background from './components/Background'



const SceneBackground = ({count, depth}) => {
    const [bgColor, setBgColor] = useState([255, 191, 64, 1])

    const {fruit, cambioFruit} = useContext(FruitsContext)

    const {theme, cambioTheme} = useContext(ColorsContext)

    return (
        <Canvas
            gl={{
                alpha: false,
                antialias: false,
                powerPreference: "high-performance"
            }}
            performance={{ min: 0.5 }}
            dpr={[1, 1]}
            // dpr={Math.max(window.devicePixelRatio, 1)}
            mode="concurrent"
            camera={{ near: 0.001, far: 100, fov: 45 }}
            className="webglbg"
            style={{ position: 'fixed', height: '100vh', zIndex: '1' }}
        >
            <ColorsContext.Provider value={{theme, cambioTheme}} >
                <FruitsContext.Provider value={{fruit, cambioFruit}} >
                    <Background />
                </FruitsContext.Provider>
            </ColorsContext.Provider>
            <color
                attach="background"
                args={[`rgb(${theme[fruit].bgColor[0]},${theme[fruit].bgColor[1]},${theme[fruit].bgColor[2]})`]}
            />


            <ambientLight intensity={0.2} />
            <spotLight position={[10, 10, 10]} intensity={0.3} />
            <Suspense fallback={null}>
                <FruitsContext.Provider value={{fruit, cambioFruit}} >
                {/* <Instances /> */}

                {
                Array.from({ length: count }, (_, i) => (
                    <Banana
                        key={i}
                        id={i}
                        z={-(i / count) * depth - 6}
                        depth={depth}
                        bgColor={bgColor}
                    />
                ))
                }

                {
                    <EffectComposer multisampling={0}>
                        <DepthOfField
                            target={[0, 0, depth / 2]}
                            focalLength={0.5}
                            bokehScale={6}
                            height={700}
                        />
                    </EffectComposer>
                }
            </FruitsContext.Provider>
            </Suspense>

        </Canvas>
    )
}

export default SceneBackground
