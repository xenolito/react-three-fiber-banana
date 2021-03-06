import * as THREE from 'three'
import { Suspense, useState, useContext } from 'react'
import { Html, useProgress, Stats, useContextBridge} from '@react-three/drei'
import Overlay from './layout/Overlay'
import { FadeIn } from './layout/styles'
import ColorsProvider from './context/ColorsProvider'
import FruitsProvider, {FruitsContext} from './context/FruitsProvider'
import PageBackground from './components/PageBackground'


const Loader = () => {
    const { progress } = useProgress()
    // console.log(`progress= ${progress}`)
    return <Html center>{progress} % loaded</Html>
}

export default function App({ count = 60, depth = 80 }) {
    const [bgColor, setBgColor] = useState([255, 191, 64, 1])

    // const ContextBridge = useContextBridge(FruitsContext)

    return (
        <>
            <ColorsProvider>
            <FruitsProvider>
                <Suspense fallback={null}>
                    <PageBackground count={count} depth={depth}/>
                    <FadeIn />
                </Suspense>
                <Overlay />
                <Stats />
            </FruitsProvider>
            </ColorsProvider>

        </>
    )
}
