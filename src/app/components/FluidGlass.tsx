"use client";
// FluidGlass Tokyo Component
import * as THREE from 'three';
import React from 'react';
import { useRef, useState, useEffect, memo } from 'react';
import { Canvas, createPortal, useFrame, useThree } from '@react-three/fiber';
import {
  useFBO,
  useGLTF,
  useScroll,
  Image,
  Scroll,
  Preload,
  ScrollControls,
  MeshTransmissionMaterial,
  Text,
} from '@react-three/drei';
import { easing } from 'maath';
import { GLTF } from 'three-stdlib';

type ModeProps = {
  navItems?: { label: string; link: string }[];
  scale?: number;
  ior?: number;
  thickness?: number;
  anisotropy?: number;
  chromaticAberration?: number;
  transmission?: number;
  roughness?: number;
  color?: string;
  attenuationColor?: string;
  attenuationDistance?: number;
};

interface FluidGlassProps {
  mode?: 'lens' | 'bar' | 'cube';
  lensProps?: ModeProps;
  barProps?: ModeProps;
  cubeProps?: ModeProps;
}
export default function FluidGlass({
  mode = 'lens',
  lensProps = {},
  barProps = {},
  cubeProps = {},
}: FluidGlassProps) {
  const Wrapper = mode === 'bar' ? Bar : mode === 'cube' ? Cube : Lens;
  const rawOverrides =
    mode === 'bar' ? barProps : mode === 'cube' ? cubeProps : lensProps;
  const {
    navItems = [
      { label: 'Home', link: '' },
      { label: 'About', link: '' },
      { label: 'Contact', link: '' },
    ],
    ...modeProps
  } = rawOverrides;
  return (
    <Canvas camera={{ position: [0, 0, 20], fov: 15 }} gl={{ alpha: true }} className="!block w-full h-[60vh] md:h-[70vh] lg:h-[80vh]">
      <ScrollControls damping={0.2} pages={3} distance={0.4}>
        {mode === 'bar' && <NavItems items={navItems} />}
        <Wrapper modeProps={modeProps}>
          <Scroll>
            <Typography />
            <Images />
          </Scroll>
          <Preload />
        </Wrapper>
      </ScrollControls>
    </Canvas>
  );
}

interface ModeWrapperProps {
  children?: React.ReactNode;
  glb: string;
  geometryKey: string;
  lockToBottom?: boolean;
  followPointer?: boolean;
  modeProps?: ModeProps;
}
const ModeWrapper = memo(function ModeWrapper({
  children,
  glb,
  geometryKey,
  lockToBottom = false,
  followPointer = true,
  modeProps = {},
}: ModeWrapperProps) {
  const ref = useRef<THREE.Mesh>(null);
  const { nodes } = useGLTF(glb) as GLTF & { nodes: Record<string, THREE.Object3D> };
  const buffer = useFBO();
  const { viewport: vp } = useThree();
  const [scene] = useState(() => new THREE.Scene());
  const geoWidthRef = useRef(1);

  useEffect(() => {
    const mesh = nodes[geometryKey] as THREE.Mesh | undefined;
    if (mesh && mesh.geometry) {
      mesh.geometry.computeBoundingBox();
      const bbox = mesh.geometry.boundingBox;
      geoWidthRef.current = bbox && bbox.max.x !== undefined && bbox.min.x !== undefined
        ? bbox.max.x - bbox.min.x
        : 1;
    }
  }, [nodes, geometryKey]);

  useFrame((state, delta) => {
    const { gl, viewport, pointer, camera } = state;
    const v = viewport.getCurrentViewport(camera, [0, 0, 15]);

    const destX = followPointer ? (pointer.x * v.width) / 2 : 0;
    const destY = lockToBottom
      ? -v.height / 2 + 0.2
      : followPointer
        ? (pointer.y * v.height) / 2
        : 0;
    if (ref.current) {
      easing.damp3(ref.current.position, [destX, destY, 15], 0.15, delta);
      if (modeProps.scale == null) {
        const maxWorld = v.width * 0.9;
        const desired = maxWorld / geoWidthRef.current;
        ref.current.scale.setScalar(Math.min(0.15, desired));
      }
    }

    gl.setRenderTarget(buffer);
    gl.render(scene, camera);
    gl.setRenderTarget(null);
    gl.setClearColor(0x5227ff, 1);
  });

  const {
    scale,
    ior,
    thickness,
    anisotropy,
    chromaticAberration,
    ...extraMat
  } = modeProps;

  return (
    <>
      {createPortal(children, scene)}
      <mesh scale={[vp.width, vp.height, 1]}>
        <planeGeometry />
        <meshBasicMaterial map={buffer.texture} transparent />
      </mesh>
      <mesh
        ref={ref}
        scale={scale ?? 0.15}
        rotation-x={Math.PI / 2}
        geometry={(nodes[geometryKey] as THREE.Mesh)?.geometry}
      >
        <MeshTransmissionMaterial
          buffer={buffer.texture}
          ior={ior ?? 1.15}
          thickness={thickness ?? 5}
          anisotropy={anisotropy ?? 0.01}
          chromaticAberration={chromaticAberration ?? 0.1}
          {...extraMat}
        />
      </mesh>
    </>
  );
});

interface LensProps {
  modeProps?: ModeProps;
}
function Lens({ modeProps, children }: LensProps & { children?: React.ReactNode }) {
  return (
    <ModeWrapper
      glb="/assets/3d/lens.glb"
      geometryKey="Cylinder"
      followPointer
      modeProps={modeProps}
    >
      {children}
    </ModeWrapper>
  );
}

interface CubeProps {
  modeProps?: ModeProps;
}
function Cube({ modeProps, children }: CubeProps & { children?: React.ReactNode }) {
  return (
    <ModeWrapper
      glb="/assets/3d/cube.glb"
      geometryKey="Cube"
      followPointer
      modeProps={modeProps}
    >
      {children}
    </ModeWrapper>
  );
}

interface BarProps {
  modeProps?: ModeProps;
}
function Bar({ modeProps = {}, children }: BarProps & { children?: React.ReactNode }) {
  const defaultMat: ModeProps = {
    transmission: 1,
    roughness: 0,
    thickness: 10,
    ior: 1.15,
    color: '#ffffff',
    attenuationColor: '#ffffff',
    attenuationDistance: 0.25,
  };
  return (
    <ModeWrapper
      glb="/assets/3d/bar.glb"
      geometryKey="Cube"
      lockToBottom
      followPointer={false}
      modeProps={{ ...defaultMat, ...modeProps }}
    >
      {children}
    </ModeWrapper>
  );
}

interface NavItemsProps {
  items: { label: string; link: string }[];
}
function NavItems({ items }: NavItemsProps) {
  const group = useRef<THREE.Group>(null);
  const { viewport, camera } = useThree();
  const DEVICE = {
    mobile: { max: 639, spacing: 0.2, fontSize: 0.035 },
    tablet: { max: 1023, spacing: 0.24, fontSize: 0.045 },
    desktop: { max: Infinity, spacing: 0.3, fontSize: 0.045 },
  };
  const getDevice = React.useCallback(() => {
    const w = window.innerWidth;
    return w <= DEVICE.mobile.max
      ? 'mobile'
      : w <= DEVICE.tablet.max
        ? 'tablet'
        : 'desktop';
  }, [DEVICE.mobile.max, DEVICE.tablet.max]);
  const [device, setDevice] = useState<'mobile' | 'tablet' | 'desktop'>(getDevice());
  useEffect(() => {
    const onResize = () => setDevice(getDevice());
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [getDevice]);
  const { spacing, fontSize } = DEVICE[device];
  useFrame(() => {
    if (!group.current) return;
    const v = viewport.getCurrentViewport(camera, [0, 0, 15]);
    group.current.position.set(0, -v.height / 2 + 0.2, 15.1);
    group.current.children.forEach((child: THREE.Object3D, i: number) => {
      child.position.x = (i - (items.length - 1) / 2) * spacing;
    });
  });
  const handleNavigate = (link: string) => {
    if (!link) return;
    if (link.startsWith('#')) {
      window.location.hash = link;
    } else {
      window.location.href = link;
    }
  };
  return (
    <group ref={group} renderOrder={10}>
      {items.map(({ label, link }) => (
        <Text
          key={label}
          fontSize={fontSize}
          color="white"
          anchorX="center"
          anchorY="middle"
          font="/assets/fonts/figtreeblack.ttf"
          outlineWidth={0}
          outlineBlur="20%"
          outlineColor="#000"
          outlineOpacity={0.5}
          // depthTest is not a valid prop for drei Text, remove it
          renderOrder={10}
          onClick={(e) => {
            e.stopPropagation();
            handleNavigate(link);
          }}
          onPointerOver={() => (document.body.style.cursor = 'pointer')}
          onPointerOut={() => (document.body.style.cursor = 'auto')}
        >
          {label}
        </Text>
      ))}
    </group>
  );
}

function Images() {
  const group = useRef<THREE.Group>(null);
  const data = useScroll();
  const { height } = useThree((s) => s.viewport);
  useFrame(() => {
    if (!group.current) return;
    group.current.children.forEach((child) => {
      const mesh = child as THREE.Mesh;
      if (mesh.material && typeof mesh.material === 'object' && 'zoom' in mesh.material) {
        (mesh.material as any).zoom = 1 + data.range(0, 1 / 3) / 3;
      }
    });
  });
  return (
    <group ref={group}>
      {/* eslint-disable-next-line jsx-a11y/alt-text */}
      <Image position={[-2, 0, 0]} scale={[3, typeof height === 'number' ? height / 1.1 : 3]} url={'/images/tokyo-1.avif'} />
      {/* eslint-disable-next-line jsx-a11y/alt-text */}
      <Image position={[2, 0, 3]} scale={[3, 3]} url={'/images/tokyo-2.jpeg'} />
      {/* eslint-disable-next-line jsx-a11y/alt-text */}
      <Image position={[-2.05, typeof height === 'number' ? -height : -3, 6]} scale={[1, 3]} url={'/images/tokyo-3.jpg'} />
      {/* eslint-disable-next-line jsx-a11y/alt-text */}
      <Image position={[-0.6, typeof height === 'number' ? -height : -3, 9]} scale={[1, 2]} url={'/images/tokyo-4.jpg'} />
      {/* eslint-disable-next-line jsx-a11y/alt-text */}
      <Image position={[0.75, typeof height === 'number' ? -height : -3, 10.5]} scale={[1.5, 1.5]} url={'/images/tokyo-5.jpeg'} />
    </group>
  );
}

function Typography() {
  const DEVICE = {
    mobile: { fontSize: 0.2 },
    tablet: { fontSize: 0.4 },
    desktop: { fontSize: 0.7 },
  };
  const getDevice = () => {
    const w = window.innerWidth;
    return w <= 639
      ? 'mobile'
      : w <= 1023
        ? 'tablet'
        : 'desktop';
  };
  const [device, setDevice] = useState<'mobile' | 'tablet' | 'desktop'>(getDevice());
  useEffect(() => {
    const onResize = () => setDevice(getDevice());
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  const { fontSize } = DEVICE[device];
  return (
    <Text
      position={[0, 0, 12]}
      font="/assets/fonts/figtreeblack.ttf"
      fontSize={fontSize}
      letterSpacing={-0.05}
      outlineWidth={0}
      outlineBlur="20%"
      outlineColor="#000"
      outlineOpacity={0.5}
      color="white"
      anchorX="center"
      anchorY="middle"
    >
      React Bits
    </Text>
  );
}
