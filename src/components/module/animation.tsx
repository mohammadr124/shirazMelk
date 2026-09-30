import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, ContactShadows, useProgress } from "@react-three/drei";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";
import { useEffect, useRef, useState, type ReactNode } from "react";

gsap.registerPlugin(ScrollTrigger);

/* =========================================================
   HOOK: تشخیص موبایل
========================================================= */

function useIsMobile(breakpoint = 768): boolean {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const check = (): void => {
      setIsMobile(window.innerWidth < breakpoint);
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [breakpoint]);

  return isMobile;
}

/* =========================================================
   CONSTANTS
========================================================= */

const SCROLL_END = "+=400%";
const SCROLL_END_MOBILE = "+=250%";
const MAX_WIDTH = 1440;

/* =========================================================
   TYPES
========================================================= */

type PartName =
  | "ground"
  | "foundation"
  | "body"
  | "wallL"
  | "wallR"
  | "wallFrontL"
  | "pillar"
  | "louvers"
  | "glassFront"
  | "door"
  | "floor2"
  | "body2"
  | "wallL2"
  | "wallR2"
  | "glassUpper"
  | "balcony"
  | "railing"
  | "stairs"
  | "roof"
  | "chimney"
  | "tree1"
  | "tree2";

type Part = THREE.Object3D & {
  userData: {
    partName?: PartName;
    tx?: number;
    ty?: number;
    tz?: number;
  };
};

type InfoIconType = "shield" | "compass" | "layers" | "star";

type InfoCard = {
  icon: InfoIconType;
  label: string;
  value: string;
  description: string;
};

type StatItem = {
  value: string;
  label: string;
};

type StoryStep = {
  eyebrow: string;
  title: ReactNode;
  description: string;
  cards: InfoCard[];
  stats?: StatItem[];
};

/* =========================================================
   HOUSE
========================================================= */

function House({
  parts,
}: {
  parts: React.MutableRefObject<Record<string, Part>>;
}) {
  const register =
    (name: PartName) =>
    (el: THREE.Object3D | null): void => {
      if (!el) return;

      const object = el as Part;
      object.userData.partName = name;
      parts.current[name] = object;

      const x = object.userData.tx ?? object.position.x;
      const y = object.userData.ty ?? object.position.y;
      const z = object.userData.tz ?? object.position.z;

      object.userData.tx = x;
      object.userData.ty = y;
      object.userData.tz = z;

      gsap.set(object.scale, { x: 0.001, y: 0.001, z: 0.001 });
      gsap.set(object.position, { x, y: y + 10, z });
    };

  return (
    <group position={[0, 0, 0]}>
      <mesh
        ref={register("ground")}
        position={[0, -0.08, 0]}
        userData={{ tx: 0, ty: -0.08, tz: 0 }}
        receiveShadow
      >
        <boxGeometry args={[12, 0.15, 10]} />
        <meshStandardMaterial color="#d6d3d1" roughness={0.9} />
      </mesh>

      <mesh
        ref={register("foundation")}
        position={[0, 0.1, 0]}
        userData={{ tx: 0, ty: 0.1, tz: 0 }}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[8.5, 0.35, 6.5]} />
        <meshStandardMaterial color="#a8a29e" roughness={0.8} />
      </mesh>

      <mesh
        ref={register("body")}
        position={[0, 1.3, 0]}
        userData={{ tx: 0, ty: 1.3, tz: 0 }}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[7.8, 2.4, 5.8]} />
        <meshStandardMaterial color="#f5f5f4" roughness={0.75} />
      </mesh>

      <mesh
        ref={register("wallL")}
        position={[-3.85, 1.5, 0]}
        userData={{ tx: -3.85, ty: 1.5, tz: 0 }}
        castShadow
      >
        <boxGeometry args={[0.3, 2.8, 6]} />
        <meshStandardMaterial color="#57534e" roughness={0.6} />
      </mesh>

      <mesh
        ref={register("wallR")}
        position={[3.85, 1.5, 0]}
        userData={{ tx: 3.85, ty: 1.5, tz: 0 }}
        castShadow
      >
        <boxGeometry args={[0.3, 2.8, 6]} />
        <meshStandardMaterial color="#57534e" roughness={0.6} />
      </mesh>

      <mesh
        ref={register("wallFrontL")}
        position={[-2.7, 1.45, -2.9]}
        userData={{ tx: -2.7, ty: 1.45, tz: -2.9 }}
        castShadow
      >
        <boxGeometry args={[2.2, 2.7, 0.25]} />
        <meshStandardMaterial color="#e7e5e4" roughness={0.7} />
      </mesh>

      <mesh
        ref={register("pillar")}
        position={[-1.25, 1.5, -2.95]}
        userData={{ tx: -1.25, ty: 1.5, tz: -2.95 }}
        castShadow
      >
        <boxGeometry args={[0.35, 2.9, 0.35]} />
        <meshStandardMaterial color="#44403c" roughness={0.5} />
      </mesh>

      <group
        ref={register("louvers")}
        position={[2.1, 1.6, -3]}
        userData={{ tx: 2.1, ty: 1.6, tz: -3 }}
      >
        {Array.from({ length: 6 }).map((_, index) => (
          <mesh key={index} position={[index * 0.3, 0, 0]} castShadow>
            <boxGeometry args={[0.12, 2.7, 0.18]} />
            <meshStandardMaterial color="#a8a29e" />
          </mesh>
        ))}
      </group>

      <mesh
        ref={register("glassFront")}
        position={[0.5, 1.45, -2.93]}
        userData={{ tx: 0.5, ty: 1.45, tz: -2.93 }}
      >
        <boxGeometry args={[2.6, 2.6, 0.08]} />
        <meshPhysicalMaterial
          color="#bae6fd"
          transmission={0.85}
          transparent
          opacity={0.55}
          roughness={0.05}
          metalness={0.1}
          thickness={0.5}
        />
      </mesh>

      <mesh
        ref={register("door")}
        position={[0, 1.25, -3]}
        userData={{ tx: 0, ty: 1.25, tz: -3 }}
        castShadow
      >
        <boxGeometry args={[1.15, 2.4, 0.12]} />
        <meshStandardMaterial
          color="#1c1917"
          roughness={0.35}
          metalness={0.25}
        />
      </mesh>

      <mesh
        ref={register("floor2")}
        position={[0, 2.65, 0]}
        userData={{ tx: 0, ty: 2.65, tz: 0 }}
        castShadow
      >
        <boxGeometry args={[8.1, 0.25, 6]} />
        <meshStandardMaterial color="#78716c" roughness={0.7} />
      </mesh>

      <mesh
        ref={register("body2")}
        position={[0.3, 4, 0.2]}
        userData={{ tx: 0.3, ty: 4, tz: 0.2 }}
        castShadow
      >
        <boxGeometry args={[7.2, 2.3, 5.4]} />
        <meshStandardMaterial color="#f5f5f4" roughness={0.75} />
      </mesh>

      <mesh
        ref={register("wallL2")}
        position={[-3.35, 4, 0.2]}
        userData={{ tx: -3.35, ty: 4, tz: 0.2 }}
        castShadow
      >
        <boxGeometry args={[0.3, 2.5, 5.5]} />
        <meshStandardMaterial color="#57534e" />
      </mesh>

      <mesh
        ref={register("wallR2")}
        position={[3.9, 4, 0.2]}
        userData={{ tx: 3.9, ty: 4, tz: 0.2 }}
        castShadow
      >
        <boxGeometry args={[0.3, 2.5, 5.5]} />
        <meshStandardMaterial color="#57534e" />
      </mesh>

      <mesh
        ref={register("glassUpper")}
        position={[0.7, 4, -2.55]}
        userData={{ tx: 0.7, ty: 4, tz: -2.55 }}
      >
        <boxGeometry args={[4.8, 2.2, 0.08]} />
        <meshPhysicalMaterial
          color="#7dd3fc"
          transmission={0.9}
          transparent
          opacity={0.5}
          roughness={0.05}
          thickness={0.5}
        />
      </mesh>

      <mesh
        ref={register("balcony")}
        position={[1.4, 3.1, -3.45]}
        userData={{ tx: 1.4, ty: 3.1, tz: -3.45 }}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[4.2, 0.25, 1.25]} />
        <meshStandardMaterial color="#a8a29e" roughness={0.65} />
      </mesh>

      <group
        ref={register("railing")}
        position={[-0.5, 3.8, -4]}
        userData={{ tx: -0.5, ty: 3.8, tz: -4 }}
      >
        <mesh position={[2, 0, 0]}>
          <boxGeometry args={[4.2, 0.12, 0.12]} />
          <meshStandardMaterial color="#44403c" />
        </mesh>
        {Array.from({ length: 8 }).map((_, index) => (
          <mesh key={index} position={[index * 0.55, -0.5, 0]}>
            <boxGeometry args={[0.08, 1, 0.08]} />
            <meshStandardMaterial color="#44403c" />
          </mesh>
        ))}
      </group>

      <group
        ref={register("stairs")}
        position={[0, 0, -4.7]}
        userData={{ tx: 0, ty: 0, tz: -4.7 }}
      >
        {Array.from({ length: 6 }).map((_, index) => (
          <mesh
            key={index}
            position={[0, index * 0.07 + 0.05, index * 0.28]}
            castShadow
            receiveShadow
          >
            <boxGeometry args={[2.5, 0.1, 0.55]} />
            <meshStandardMaterial color="#a8a29e" roughness={0.8} />
          </mesh>
        ))}
      </group>

      <group
        ref={register("roof")}
        position={[0.2, 5.35, 0]}
        userData={{ tx: 0.2, ty: 5.35, tz: 0 }}
      >
        <mesh castShadow receiveShadow>
          <boxGeometry args={[8.4, 0.35, 6.4]} />
          <meshStandardMaterial
            color="#292524"
            roughness={0.45}
            metalness={0.25}
          />
        </mesh>
        <mesh position={[0, 0.25, 0]} castShadow>
          <boxGeometry args={[7.8, 0.15, 5.8]} />
          <meshStandardMaterial color="#44403c" roughness={0.4} />
        </mesh>
      </group>

      <mesh
        ref={register("chimney")}
        position={[2.4, 6, 1.2]}
        userData={{ tx: 2.4, ty: 6, tz: 1.2 }}
        castShadow
      >
        <boxGeometry args={[0.8, 1.2, 0.8]} />
        <meshStandardMaterial color="#57534e" roughness={0.65} />
      </mesh>

      <group
        ref={register("tree1")}
        position={[-5, 0, 2.5]}
        userData={{ tx: -5, ty: 0, tz: 2.5 }}
      >
        <mesh position={[0, 1.5, 0]} castShadow>
          <cylinderGeometry args={[0.18, 0.25, 3, 8]} />
          <meshStandardMaterial color="#78716c" />
        </mesh>
        <mesh position={[0, 3.2, 0]} castShadow>
          <sphereGeometry args={[1.25, 16, 16]} />
          <meshStandardMaterial color="#4d7c0f" roughness={0.9} />
        </mesh>
      </group>

      <group
        ref={register("tree2")}
        position={[5, 0, 2.8]}
        userData={{ tx: 5, ty: 0, tz: 2.8 }}
      >
        <mesh position={[0, 1.5, 0]} castShadow>
          <cylinderGeometry args={[0.18, 0.25, 3, 8]} />
          <meshStandardMaterial color="#78716c" />
        </mesh>
        <mesh position={[0, 3.2, 0]} castShadow>
          <sphereGeometry args={[1.3, 16, 16]} />
          <meshStandardMaterial color="#65a30d" roughness={0.9} />
        </mesh>
      </group>
    </group>
  );
}

/* =========================================================
   CAMERA CONTROLLER
========================================================= */

function CameraController({ isMobile }: { isMobile: boolean }) {
  const { camera } = useThree();

  useEffect(() => {
    if (isMobile) {
      camera.position.set(0, 6, -18);
      camera.lookAt(0, 3, 0);
    } else {
      camera.position.set(0, 5.1, -14);
      camera.lookAt(0, 2.7, 0);
    }
  }, [camera, isMobile]);

  return null;
}

/* =========================================================
   SCROLL CONTROLLER
========================================================= */

function ScrollController({
  parts,
  isMobile,
}: {
  parts: React.MutableRefObject<Record<string, Part>>;
  isMobile: boolean;
}) {
  const { camera } = useThree();

  const lookTarget = useRef<THREE.Vector3>(new THREE.Vector3(0, 2.7, 0));

  useFrame(() => {
    camera.lookAt(lookTarget.current);
  });

  useGSAP(
    () => {
      const end = isMobile ? SCROLL_END_MOBILE : SCROLL_END;

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: "#house-pin",
          start: "top top",
          end,
          scrub: 1.4,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      if (isMobile) {
        timeline
          .to(
            camera.position,
            { x: 0, y: 6.5, z: -17, duration: 2.5, ease: "sine.inOut" },
            0,
          )
          .to(
            camera.position,
            { x: 3, y: 6, z: -14, duration: 3, ease: "sine.inOut" },
            2.5,
          )
          .to(
            camera.position,
            { x: 8, y: 6.5, z: -10, duration: 3, ease: "sine.inOut" },
            5.5,
          )
          .to(
            camera.position,
            { x: 9, y: 7, z: -5, duration: 3, ease: "sine.inOut" },
            8.5,
          )
          .to(
            camera.position,
            { x: 4, y: 7, z: -15, duration: 3.5, ease: "power2.inOut" },
            11.5,
          )
          .to(
            camera.position,
            { x: 0, y: 6, z: -16, duration: 1.5, ease: "power2.out" },
            15,
          );
      } else {
        timeline
          .to(
            camera.position,
            { x: 0, y: 5.5, z: -13, duration: 2.5, ease: "sine.inOut" },
            0,
          )
          .to(
            camera.position,
            { x: 4.5, y: 5.2, z: -11.5, duration: 3, ease: "sine.inOut" },
            2.5,
          )
          .to(
            camera.position,
            { x: 11, y: 6, z: -7, duration: 3, ease: "sine.inOut" },
            5.5,
          )
          .to(
            camera.position,
            { x: 12.5, y: 6.5, z: -2, duration: 3, ease: "sine.inOut" },
            8.5,
          )
          .to(
            camera.position,
            { x: 6, y: 6.5, z: -14, duration: 3.5, ease: "power2.inOut" },
            11.5,
          )
          .to(
            camera.position,
            { x: 0, y: 5.5, z: -15, duration: 1.5, ease: "power2.out" },
            15,
          );
      }

      timeline.to(
        lookTarget.current,
        {
          x: 0,
          y: isMobile ? 3 : 2.7,
          z: 0,
          duration: 4,
          ease: "sine.inOut",
        },
        0,
      );

      timeline.to(
        lookTarget.current,
        {
          x: 0.5,
          y: isMobile ? 3.2 : 2.8,
          z: -0.3,
          duration: 5,
          ease: "sine.inOut",
        },
        4,
      );

      timeline.to(
        lookTarget.current,
        {
          x: 0,
          y: isMobile ? 3 : 2.9,
          z: 0,
          duration: 5,
          ease: "sine.inOut",
        },
        9,
      );

      const assembly: Array<{ name: PartName; at: number }> = [
        { name: "ground", at: 0 },
        { name: "foundation", at: 0.8 },
        { name: "body", at: 2.5 },
        { name: "wallL", at: 3.2 },
        { name: "wallR", at: 3.6 },
        { name: "wallFrontL", at: 4 },
        { name: "pillar", at: 4.4 },
        { name: "door", at: 4.8 },
        { name: "floor2", at: 5.5 },
        { name: "body2", at: 6.2 },
        { name: "wallL2", at: 6.6 },
        { name: "wallR2", at: 6.9 },
        { name: "glassFront", at: 7.3 },
        { name: "louvers", at: 7.7 },
        { name: "glassUpper", at: 8.2 },
        { name: "balcony", at: 9 },
        { name: "railing", at: 9.5 },
        { name: "stairs", at: 10.2 },
        { name: "roof", at: 11 },
        { name: "chimney", at: 11.6 },
        { name: "tree1", at: 12.5 },
        { name: "tree2", at: 13 },
      ];

      assembly.forEach(({ name, at }) => {
        const part = parts.current[name];
        if (!part) return;

        const x = part.userData.tx ?? 0;
        const y = part.userData.ty ?? 0;
        const z = part.userData.tz ?? 0;

        timeline
          .to(
            part.position,
            { x, y, z, duration: 0.55, ease: "power3.out" },
            at,
          )
          .to(
            part.scale,
            { x: 1, y: 1, z: 1, duration: 0.5, ease: "back.out(1.6)" },
            at,
          );
      });

      timeline.to({}, { duration: 1.5 }, 15.5);

      return () => {
        timeline.scrollTrigger?.kill();
        timeline.kill();
      };
    },
    {
      dependencies: [camera, isMobile],
      revertOnUpdate: true,
    },
  );

  return null;
}

/* =========================================================
   DYNAMIC LIGHTING
========================================================= */

function DynamicLighting() {
  const directionalLight = useRef<THREE.DirectionalLight>(null);
  const ambientLight = useRef<THREE.AmbientLight>(null);

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();

    if (directionalLight.current) {
      directionalLight.current.position.x = Math.sin(time * 0.08) * 8;
      directionalLight.current.position.z = Math.cos(time * 0.08) * 8;
    }

    if (ambientLight.current) {
      ambientLight.current.intensity = 1.2 + Math.sin(time * 0.1) * 0.1;
    }
  });

  return (
    <>
      <ambientLight ref={ambientLight} intensity={1.2} color="#ffffff" />

      <directionalLight
        ref={directionalLight}
        position={[8, 12, 10]}
        intensity={3}
        color="#fff7ed"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-left={-20}
        shadow-camera-right={20}
        shadow-camera-top={20}
        shadow-camera-bottom={-20}
        shadow-camera-near={0.1}
        shadow-camera-far={50}
      />

      <pointLight
        position={[0, 5, 4]}
        intensity={1.2}
        distance={25}
        color="#fef3c7"
      />

      <pointLight
        position={[-6, 4, -6]}
        intensity={0.6}
        distance={20}
        color="#d4af5a"
      />
    </>
  );
}

/* =========================================================
   MOUSE PARALLAX
========================================================= */

function MouseParallax({ isMobile }: { isMobile: boolean }) {
  const { camera } = useThree();
  const target = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const baseFov = useRef<number>(42);

  useEffect(() => {
    if (isMobile) return;

    const handleMouseMove = (event: MouseEvent): void => {
      target.current.x = (event.clientX / window.innerWidth - 0.5) * 2;
      target.current.y = (event.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isMobile]);

  useFrame(() => {
    if (isMobile) return;
    if (camera instanceof THREE.PerspectiveCamera) {
      const targetFov = baseFov.current + target.current.y * 1.2;
      camera.fov += (targetFov - camera.fov) * 0.05;
      camera.updateProjectionMatrix();
    }
  });

  return null;
}

/* =========================================================
   FLOATING PARTICLES
========================================================= */

function FloatingParticles({ isMobile }: { isMobile: boolean }) {
  const particles = useRef<THREE.Points>(null);
  const count = isMobile ? 150 : 350;
  const positions = useRef<Float32Array>(new Float32Array(count * 3));

  if (positions.current.every((value) => value === 0)) {
    for (let i = 0; i < count; i++) {
      positions.current[i * 3] = (Math.random() - 0.5) * 25;
      positions.current[i * 3 + 1] = Math.random() * 12;
      positions.current[i * 3 + 2] = (Math.random() - 0.5) * 22;
    }
  }

  useFrame(() => {
    if (!particles.current) return;
    particles.current.rotation.y += 0.00035;
  });

  return (
    <points ref={particles}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions.current, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={isMobile ? 0.05 : 0.04}
        color="#b08b38"
        transparent
        opacity={0.45}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

/* =========================================================
   LOADING SCREEN
========================================================= */

function LoadingScreen({ isMobile }: { isMobile: boolean }) {
  const { progress } = useProgress();
  const [visible, setVisible] = useState<boolean>(true);
  const [fading, setFading] = useState<boolean>(false);
  const [displayProgress, setDisplayProgress] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    const paths = container.querySelectorAll(".load-path");
    const roof = container.querySelector(".load-roof");
    const door = container.querySelector(".load-door");
    const windows = container.querySelectorAll(".load-window");
    const base = container.querySelector(".load-base");
    const fill = container.querySelector(".load-fill");

    const timeline = gsap.timeline({ defaults: { ease: "power2.out" } });

    if (base) {
      timeline.fromTo(
        base,
        { scaleX: 0, transformOrigin: "center" },
        { scaleX: 1, duration: 0.4 },
      );
    }

    if (paths.length) {
      timeline.fromTo(
        paths,
        { strokeDashoffset: 400 },
        { strokeDashoffset: 0, duration: 0.8, stagger: 0.12 },
        0.3,
      );
    }

    if (roof) {
      timeline.fromTo(
        roof,
        { strokeDashoffset: 400 },
        { strokeDashoffset: 0, duration: 0.6 },
        1,
      );
    }

    if (door) {
      timeline.fromTo(
        door,
        { strokeDashoffset: 200, opacity: 0 },
        { strokeDashoffset: 0, opacity: 1, duration: 0.4 },
        1.4,
      );
    }

    if (windows.length) {
      timeline.fromTo(
        windows,
        { scale: 0, opacity: 0, transformOrigin: "center" },
        { scale: 1, opacity: 1, duration: 0.3, stagger: 0.1 },
        1.5,
      );
    }

    if (fill) {
      timeline.fromTo(
        fill,
        { opacity: 0, scale: 0.8, transformOrigin: "center" },
        { opacity: 1, scale: 1, duration: 0.5 },
        1.7,
      );
    }

    return () => {
      timeline.kill();
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayProgress((previous) => {
        const target = Math.min(progress, 100);
        if (previous < target) {
          return Math.min(
            previous + Math.ceil((target - previous) * 0.15) + 1,
            target,
          );
        }
        return previous;
      });
    }, 50);
    return () => clearInterval(interval);
  }, [progress]);

  useEffect(() => {
    if (progress >= 100 && displayProgress >= 99 && !fading) {
      const timer = setTimeout(() => setFading(true), 400);
      return () => clearTimeout(timer);
    }
  }, [progress, displayProgress, fading]);

  useEffect(() => {
    if (!fading || !containerRef.current) return;

    const timeline = gsap.timeline({
      onComplete: () => setVisible(false),
    });

    timeline.to(containerRef.current, {
      opacity: 0,
      duration: 0.9,
      ease: "power2.inOut",
    });

    return () => {
      timeline.kill();
    };
  }, [fading]);

  if (!visible) return null;

  return (
    <div
      ref={containerRef}
      dir="rtl"
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-linear-to-b from-white via-[#fafaf9] to-[#f5f5f4]"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(#1c1917 1px, transparent 1px), linear-gradient(90deg, #1c1917 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="pointer-events-none absolute left-1/2 top-1/2 h-100 w-100 -translate-x-1/2 -translate-y-1/2 rounded-full bg-linear-to-br from-[#d4af5a]/8 via-transparent to-transparent blur-3xl md:h-150 md:w-150" />

      <div className="relative z-10 flex flex-col items-center px-6">
        <svg
          viewBox="0 0 240 200"
          className={`fill-none ${
            isMobile ? "h-32 w-40" : "h-44 w-56 md:h-52 md:w-64"
          }`}
        >
          <line
            className="load-base"
            x1="20"
            y1="180"
            x2="220"
            y2="180"
            stroke="#1c1917"
            strokeWidth="2"
            strokeLinecap="round"
          />

          <path
            className="load-path"
            d="M50 180 L50 100 L190 100 L190 180"
            stroke="#1c1917"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="400"
            strokeDashoffset="400"
          />

          <path
            className="load-roof"
            d="M35 100 L120 30 L205 100"
            stroke="#b08b38"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="400"
            strokeDashoffset="400"
          />

          <path
            className="load-door"
            d="M105 180 L105 140 L135 140 L135 180"
            stroke="#1c1917"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="200"
            strokeDashoffset="200"
          />

          <rect
            className="load-window"
            x="65"
            y="120"
            width="22"
            height="22"
            stroke="#b08b38"
            strokeWidth="2"
            fill="none"
          />

          <rect
            className="load-window"
            x="153"
            y="120"
            width="22"
            height="22"
            stroke="#b08b38"
            strokeWidth="2"
            fill="none"
          />

          <rect
            className="load-fill"
            x="55"
            y="105"
            width="130"
            height="70"
            fill="#b08b38"
            opacity="0.08"
          />
        </svg>

        <div className="mt-6 text-center md:mt-8">
          <h1 className="text-xl font-black tracking-tight text-neutral-900 md:text-2xl lg:text-3xl">
            شیراز ملک
          </h1>

          <p className="mt-2 text-[9px] tracking-[0.4em] text-[#b08b38] md:text-[10px]">
            GOD IS IN THE DETAIL'S
          </p>
        </div>

        <div className="mt-8 w-60 max-w-full md:mt-10 md:w-72">
          <div className="mb-3 flex items-center justify-between text-[10px] md:text-[11px]">
            <span className="tracking-[0.2em] text-neutral-400">
              در حال آماده‌سازی
            </span>

            <span className="font-bold text-[#b08b38]">{displayProgress}٪</span>
          </div>

          <div className="relative h-0.75 w-full overflow-hidden rounded-full bg-neutral-200">
            <div
              className="h-full rounded-full bg-linear-to-l from-[#d4af5a] via-[#b08b38] to-[#8a6d2c] transition-all duration-200"
              style={{ width: `${displayProgress}%` }}
            />

            <span className="absolute top-0 h-full w-12 animate-[sweep_1.5s_ease-in-out_infinite] bg-linear-to-l from-transparent via-white/70 to-transparent" />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes sweep {
          0% { right: -50px; opacity: 0; }
          50% { opacity: 1; }
          100% { right: 110%; opacity: 0; }
        }
      `}</style>
    </div>
  );
}

/* =========================================================
   STORY DATA
========================================================= */

const storyData: StoryStep[] = [
  {
    eyebrow: "01 · ABOUT US",
    title: "شیراز ملک، از سال ۱۳۸۲",
    description:
      "بیش از دو دهه است که در زمینه طراحی و اجرای پروژه‌های معماری مدرن فعالیت می‌کنیم.",
    cards: [
      {
        icon: "star",
        label: "افتخارات",
        value: "۲۴ جایزه",
        description: "معماری ملی و بین‌المللی",
      },
      {
        icon: "shield",
        label: "گارانتی",
        value: "۱۰ ساله",
        description: "ضمانت کامل سازه",
      },
      {
        icon: "compass",
        label: "پروژه",
        value: "۸۵۰+",
        description: "موفق در سراسر کشور",
      },
    ],
    stats: [
      { value: "۲۲", label: "سال تجربه" },
      { value: "۳۸", label: "متخصص" },
    ],
  },
  {
    eyebrow: "02 · CAPABILITIES",
    title: "توانایی‌های اجرایی ما",
    description:
      "از مرحله ایده تا تحویل کلید، تمام مراحل طراحی، مهندسی و اجرا را مدیریت می‌کنیم.",
    cards: [
      {
        icon: "layers",
        label: "طراحی",
        value: "معماری، داخلی، منظر",
        description: "طراحی سه‌بعدی و BIM",
      },
      {
        icon: "compass",
        label: "مهندسی",
        value: "سازه، تأسیسات، برق",
        description: "محاسبات دقیق و استاندارد",
      },
      {
        icon: "shield",
        label: "اجرا",
        value: "پیمانکاری کامل",
        description: "از پی‌ریزی تا دکوراسیون",
      },
    ],
    stats: [
      { value: "۴۰", label: "پروژه/سال" },
      { value: "۲۲", label: "شهر" },
    ],
  },
  {
    eyebrow: "03 · EXPERTISE",
    title: "حوزه‌های تخصص",
    description:
      "با تیم‌های تخصصی در هر حوزه، پروژه‌ها را با بالاترین کیفیت طراحی و اجرا می‌کنیم.",
    cards: [
      {
        icon: "layers",
        label: "ویلایی",
        value: "معماری مسکونی",
        description: "ویلا، خانه باغ، مجتمع",
      },
      {
        icon: "star",
        label: "تجاری",
        value: "فضاهای اداری",
        description: "دفتر، تجاری، هتل",
      },
      {
        icon: "compass",
        label: "منظر",
        value: "طراحی فضای سبز",
        description: "باغ، محوطه، حیاط",
      },
    ],
    stats: [
      { value: "۱۵", label: "حوزه تخصص" },
      { value: "۱۰۰٪", label: "رضایت" },
    ],
  },
  {
    eyebrow: "04 · PHILOSOPHY",
    title: "ارزش‌های ما",
    description:
      "ما به شفافیت، تعهد و کیفیت باور داریم. هر پروژه، یک رابطه بلندمدت با مشتریان ما است.",
    cards: [
      {
        icon: "shield",
        label: "تعهد",
        value: "تحویل به‌موقع",
        description: "قرارداد شفاف و روشن",
      },
      {
        icon: "star",
        label: "کیفیت",
        value: "متریال ممتاز",
        description: "استاندارد بین‌المللی",
      },
      {
        icon: "compass",
        label: "پشتیبانی",
        value: "۲۴/۷ خدمات",
        description: "بعد از تحویل هم هستیم",
      },
    ],
    stats: [
      { value: "۹۸٪", label: "توصیه" },
      { value: "۵.۰", label: "امتیاز" },
    ],
  },
];

/* =========================================================
   ICON COMPONENT
========================================================= */

function CardIcon({ type }: { type: InfoIconType }) {
  const strokeProps = {
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    fill: "none",
  };

  if (type === "shield") {
    return (
      <svg viewBox="0 0 24 24" className="h-2.5 w-2.5">
        <path
          d="M12 2 L20 6 V12 C20 17, 16 21, 12 22 C8 21, 4 17, 4 12 V6 Z"
          {...strokeProps}
        />
      </svg>
    );
  }
  if (type === "compass") {
    return (
      <svg viewBox="0 0 24 24" className="h-2.5 w-2.5">
        <circle cx="12" cy="12" r="9" {...strokeProps} />
        <path d="M15 9 L13 13 L9 15 L11 11 Z" {...strokeProps} />
      </svg>
    );
  }
  if (type === "layers") {
    return (
      <svg viewBox="0 0 24 24" className="h-2.5 w-2.5">
        <path d="M12 3 L21 8 L12 13 L3 8 Z" {...strokeProps} />
        <path d="M3 13 L12 18 L21 13" {...strokeProps} />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className="h-2.5 w-2.5">
      <path
        d="M12 3 L14.6 9 L21 9.6 L16 14.2 L17.5 20.4 L12 17 L6.5 20.4 L8 14.2 L3 9.6 L9.4 9 Z"
        {...strokeProps}
      />
    </svg>
  );
}

/* =========================================================
   STATS INLINE
========================================================= */

function StatsInline({ stats }: { stats: StatItem[] }) {
  return (
    <div className="anim-card mt-3 flex items-center gap-4 text-[10px]">
      {stats.map((stat, i) => (
        <div key={i} className="flex items-baseline gap-1">
          <span className="font-black text-[#b08b38]">{stat.value}</span>
          <span className="text-neutral-400">{stat.label}</span>
          {i < stats.length - 1 && (
            <span className="mr-2 text-neutral-300">·</span>
          )}
        </div>
      ))}
    </div>
  );
}

/* =========================================================
   STORY OVERLAY — مینیمال
========================================================= */

function StoryOverlay({ isMobile }: { isMobile: boolean }) {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const lastIndex = useRef<number>(0);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const end = isMobile ? SCROLL_END_MOBILE : SCROLL_END;

    const trigger = ScrollTrigger.create({
      trigger: "#house-pin",
      start: "top top",
      end,
      onUpdate: (self) => {
        const p = self.progress;
        let next = 0;
        if (p < 0.2) next = 0;
        else if (p < 0.5) next = 1;
        else if (p < 0.8) next = 2;
        else next = 3;

        if (next !== lastIndex.current) {
          lastIndex.current = next;
          setActiveIndex(next);
        }
      },
    });

    return () => {
      trigger.kill();
    };
  }, [isMobile]);

  useEffect(() => {
    if (!contentRef.current) return;

    const tl = gsap.timeline();

    tl.fromTo(
      contentRef.current.querySelectorAll(".anim-text"),
      { opacity: 0, y: 12, filter: "blur(6px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.55,
        stagger: 0.06,
        ease: "power3.out",
      },
    );

    tl.fromTo(
      contentRef.current.querySelectorAll(".anim-card"),
      { opacity: 0, y: 8 },
      {
        opacity: 1,
        y: 0,
        duration: 0.4,
        stagger: 0.05,
        ease: "power2.out",
      },
      "-=0.3",
    );

    return () => {
      tl.kill();
    };
  }, [activeIndex, isMobile]);

  const current = storyData[activeIndex];

  /* MOBILE LAYOUT */
  if (isMobile) {
    return (
      <div className="pointer-events-none absolute inset-0 z-10 flex flex-col justify-end">
        <div className="pointer-events-auto w-full bg-linear-to-t from-white via-white/95 to-transparent px-5 pb-5 pt-8">
          <div ref={contentRef} key={activeIndex}>
            <div className="anim-text mb-2 flex items-center justify-between">
              <span className="text-[8px] font-bold tracking-[0.35em] text-[#b08b38]">
                {current.eyebrow}
              </span>

              <div className="flex items-center gap-1">
                {storyData.map((_, index) => (
                  <span
                    key={index}
                    className={`h-0.5 rounded-full transition-all duration-500 ${
                      index === activeIndex
                        ? "w-5 bg-[#b08b38]"
                        : "w-1 bg-neutral-300"
                    }`}
                  />
                ))}
              </div>
            </div>

            <h1 className="anim-text text-base font-black leading-tight tracking-tight text-neutral-900">
              {current.title}
            </h1>

            <p className="anim-text mt-1 line-clamp-2 text-[10px] leading-5 text-neutral-500">
              {current.description}
            </p>

            <div className="anim-card mt-3 flex gap-1.5 overflow-x-auto pb-1 [-ms-overflow-style:none] scrollbar-width:none [&::-webkit-scrollbar]:hidden">
              {current.cards.map((card, i) => (
                <div
                  key={i}
                  className="flex shrink-0 items-center gap-2 rounded-full border border-neutral-200/80 bg-white/80 px-3 py-1.5 backdrop-blur-sm"
                >
                  <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#b08b38] text-white">
                    <CardIcon type={card.icon} />
                  </span>
                  <span className="text-[10px] font-bold text-neutral-900">
                    {card.value}
                  </span>
                </div>
              ))}
            </div>

            {current.stats && <StatsInline stats={current.stats} />}
          </div>
        </div>
      </div>
    );
  }

  /* DESKTOP LAYOUT */
  return (
    <div className="pointer-events-none absolute inset-0 z-10">
      <div className="absolute right-10 top-1/2 w-85 -translate-y-1/2 lg:right-16">
        <div ref={contentRef} key={activeIndex}>
          <div className="anim-text mb-3 flex items-center gap-3">
            <span className="text-[9px] font-bold tracking-[0.4em] text-[#b08b38]">
              {current.eyebrow}
            </span>
            <span className="h-px flex-1 bg-linear-to-l from-transparent to-[#b08b38]/30" />
          </div>

          <h1 className="anim-text text-2xl font-black leading-[1.15] tracking-tight text-neutral-900 lg:text-3xl">
            {current.title}
          </h1>

          <p className="anim-text mt-3 text-[12px] leading-6 text-neutral-500">
            {current.description}
          </p>

          <div className="anim-card mt-4 flex flex-wrap gap-1.5">
            {current.cards.map((card, i) => (
              <div
                key={i}
                className="group/pill flex items-center gap-2 rounded-full border border-neutral-200/80 bg-white/70 px-3 py-1.5 backdrop-blur-sm transition-all duration-300 hover:border-[#b08b38]/40 hover:bg-white"
              >
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-linear-to-br from-[#b08b38] to-[#8a6d2c] text-white">
                  <CardIcon type={card.icon} />
                </span>
                <span className="text-[11px] font-bold text-neutral-900">
                  {card.value}
                </span>
              </div>
            ))}
          </div>

          {current.stats && (
            <div className="anim-card mt-4 flex items-center gap-5 border-t border-neutral-200/70 pt-3">
              {current.stats.map((stat, i) => (
                <div key={i} className="flex items-baseline gap-1.5">
                  <span className="text-lg font-black text-[#b08b38]">
                    {stat.value}
                  </span>
                  <span className="text-[10px] text-neutral-500">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-5 flex items-center gap-1.5">
          {storyData.map((_, index) => (
            <span
              key={index}
              className={`h-0.5 rounded-full transition-all duration-500 ${
                index === activeIndex
                  ? "w-8 bg-linear-to-l from-[#d4af5a] to-[#b08b38]"
                  : "w-1.5 bg-neutral-300"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function ProgressBar({ isMobile }: { isMobile: boolean }) {
  const progress = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const end = isMobile ? SCROLL_END_MOBILE : SCROLL_END;

    const trigger = ScrollTrigger.create({
      trigger: "#house-pin",
      start: "top top",
      end,
      onUpdate: (self) => {
        if (!progress.current) return;
        progress.current.style.transform = `scaleX(${self.progress})`;
      },
    });

    return () => {
      trigger.kill();
    };
  }, [isMobile]);

  return (
    <div className="pointer-events-none absolute left-0 right-0 top-0 z-30 h-0.75 bg-neutral-200/60">
      <div
        ref={progress}
        className="h-full origin-left bg-linear-to-l from-[#d4af5a] via-[#b08b38] to-[#8a6d2c]"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}

/* =========================================================
   SCROLL HINT
========================================================= */

function ScrollHint({ isMobile }: { isMobile: boolean }) {
  const [visible, setVisible] = useState<boolean>(true);

  useEffect(() => {
    const end = isMobile ? SCROLL_END_MOBILE : SCROLL_END;

    const trigger = ScrollTrigger.create({
      trigger: "#house-pin",
      start: "top top",
      end,
      onUpdate: (self) => {
        setVisible(self.progress < 0.1);
      },
    });

    return () => {
      trigger.kill();
    };
  }, [isMobile]);

  if (!visible) return null;

  return (
    <div
      className={`pointer-events-none absolute left-1/2 z-20 -translate-x-1/2 text-center ${
        isMobile ? "bottom-44" : "bottom-8"
      }`}
    >
      <div className="mb-2 text-[9px] tracking-[0.3em] text-neutral-500 md:mb-3 md:text-[10px] md:tracking-[0.4em]">
        اسکرول کنید
      </div>

      <div className="mx-auto h-8 w-5 rounded-full border-2 border-neutral-300 p-1 md:h-10 md:w-6">
        <div className="mx-auto h-1.5 w-1 animate-bounce rounded-full bg-[#b08b38] md:h-2" />
      </div>
    </div>
  );
}

/* =========================================================
   SCROLL LOCK
========================================================= */

function ScrollLock({ isMobile }: { isMobile: boolean }) {
  useEffect(() => {
    const end = isMobile ? SCROLL_END_MOBILE : SCROLL_END;

    const trigger = ScrollTrigger.create({
      trigger: "#house-pin",
      start: "top top",
      end,
      onLeave: () => {
        document.body.style.overflow = "hidden";
      },
      onEnterBack: () => {
        document.body.style.overflow = "";
      },
      onLeaveBack: () => {
        document.body.style.overflow = "";
      },
    });

    return () => {
      trigger.kill();
      document.body.style.overflow = "";
    };
  }, [isMobile]);

  return null;
}

/* =========================================================
   MAIN
========================================================= */

export default function AnimationContainer() {
  const parts = useRef<Record<string, Part>>({});
  const isMobile = useIsMobile(768);

  return (
    <>
      {/* ═══ WRAPPER با محدودیت عرض ۱۴۴۰ پیکسل ═══ */}
      <div className="mx-auto w-full" style={{ maxWidth: `${MAX_WIDTH}px` }}>
        <div
          id="house-pin"
          className="relative h-[calc(100vh-5rem)] min-h-155 w-full overflow-hidden bg-linear-to-b from-white via-[#fafaf9] to-[#e7e5e4]"
        >
          <Canvas
            shadows
            dpr={isMobile ? [1, 1.5] : [1, 2]}
            camera={{
              position: [0, 5.1, -14],
              fov: isMobile ? 50 : 42,
              near: 0.1,
              far: 100,
            }}
            gl={{
              antialias: !isMobile,
              alpha: true,
              powerPreference: "high-performance",
            }}
            style={{ background: "transparent" }}
          >
            <fog attach="fog" args={["#fafaf9", 20, 55]} />

            <CameraController isMobile={isMobile} />
            <DynamicLighting />

            <Environment preset="city" background={false} />

            <MouseParallax isMobile={isMobile} />

            <House parts={parts} />
            <ScrollController parts={parts} isMobile={isMobile} />

            <FloatingParticles isMobile={isMobile} />

            <ContactShadows
              position={[0, -0.01, 0]}
              opacity={0.35}
              scale={25}
              blur={2.5}
              far={10}
              color="#1c1917"
            />

            <mesh
              rotation={[-Math.PI / 2, 0, 0]}
              position={[0, -0.17, 0]}
              receiveShadow
            >
              <planeGeometry args={[40, 40]} />
              <meshStandardMaterial color="#f5f5f4" roughness={0.95} />
            </mesh>
          </Canvas>

          <StoryOverlay isMobile={isMobile} />
          <ProgressBar isMobile={isMobile} />
          <ScrollHint isMobile={isMobile} />
        </div>
      </div>

      <ScrollLock isMobile={isMobile} />

      <LoadingScreen isMobile={isMobile} />
    </>
  );
}
